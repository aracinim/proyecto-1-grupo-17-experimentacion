
# README de Ejecución — Infra GCP + Despliegue + Pruebas

Este documento describe **paso a paso** cómo levantar la infraestructura en **Google Cloud Platform**, construir y publicar las imágenes Docker de las APIs (**inventario** y **pedido**), preparar la base de datos, y ejecutar pruebas de humo/carga para validar los **Experimentos de Arquitectura**.

> **Suposiciones**  
> - Proyecto GCP: `misw4301-g26` (ajústalo si usas otro)  
> - Región: `us-central1`  
> - Repositorio de Artifact Registry: `experiments`  
> - Nombres de servicios Cloud Run: `inventario-api` y `pedido-api`  
> - Base de datos: instancia `inventory-sql`, DB `inventorydb`, usuario `app_user`  


---

## 0) Prerrequisitos

- Cuenta en **GCP** con permisos de **Editor** (o equivalentes para los recursos usados).
- **gcloud** instalado y autenticado.
- **Terraform v1.6+** (`terraform -version`).
- **Docker** para construir y publicar imágenes.
- (Opcional) **k6** para pruebas de carga.

Configuración inicial:
```bash
export PROJECT_ID=misw4301-g26        # <-- cámbialo si aplica
export REGION=us-central1

gcloud auth login
gcloud config set project $PROJECT_ID
```

---

## 1) Artifact Registry (repositorio Docker)


### 1.1 Autenticación Docker contra Artifact Registry
```bash
gcloud auth configure-docker $REGION-docker.pkg.dev
```

### 1.2 Creación del repositorio
- **Si usas Terraform**: el repositorio `experiments` se crea automáticamente.
- **Si el repo ya existe** y Terraform da error 409, impórtalo al estado:
```bash
terraform -chdir=terraform import \
  google_artifact_registry_repository.docker_repo \
  projects/$PROJECT_ID/locations/$REGION/repositories/experiments
```

### 1.4 Comandos útiles de verificación
```bash
# Ver repos existentes en GCP
gcloud artifacts repositories list --location=$REGION
gcloud artifacts repositories describe experiments --location=$REGION

# Ver el recurso en el state de Terraform
terraform -chdir=terraform state show google_artifact_registry_repository.docker_repo
```

---

## 2) Construir y publicar imágenes Docker

> Asegúrate de tener los `Dockerfile` y el código de las APIs en `inventario-api/` y `pedido-api/`.

### 2.1 Inventario API
```bash
export INVENTORY_IMG="$REGION-docker.pkg.dev/$PROJECT_ID/experiments/inventario-api:1.4"

cd inventario-api
docker build -t "$INVENTORY_IMG" .
docker push "$INVENTORY_IMG"
```

### 2.2 Pedido API
```bash
export ORDER_IMG="$REGION-docker.pkg.dev/$PROJECT_ID/experiments/pedido-api:1.3"

cd ../pedido-api
docker build -t "$ORDER_IMG" .
docker push "$ORDER_IMG"
```

> **Tip**: usa un **nuevo tag** al cambiar código (`:1.5`, `:1.6`, …) para forzar despliegue.

---

## 3) Variables de Terraform (`terraform.tfvars`)

Crea/edita `terraform/terraform.tfvars` con tus valores:

```hcl
project_id      = "misw4301-g26"
region          = "us-central1"

inventory_image = "us-central1-docker.pkg.dev/misw4301-g26/experiments/inventario-api:1.4"
order_image     = "us-central1-docker.pkg.dev/misw4301-g26/experiments/pedido-api:1.3"

db_instance_name = "inventory-sql"
db_name          = "inventorydb"
db_user          = "app_user"
db_password      = "supersecreto"   # Usa Secret Manager en producción

redis_name               = "inventory-redis"
vpc_network              = "default"
serverless_connector_name = "serverless-conn"
vpc_connector_range      = "10.8.0.0/28"
vpc_min_capacity         = 200
vpc_max_capacity         = 300

pubsub_topic = "orders-topic"
artifact_repo = "experiments"

cache_ttl_seconds = 300
```

> **Nota**: El Terraform ya incluye los **volúmenes de Cloud SQL** montados en `/cloudsql` para ambas APIs, el **conector VPC** para Memorystore (solo en inventario), roles IAM mínimos y la suscripción **push** de Pub/Sub con OIDC.

---

## 4) Desplegar infraestructura con Terraform

Desde la carpeta `terraform/`:

```bash
terraform init -upgrade
terraform plan
terraform apply -lock-timeout=120s
```

Outputs útiles (al final del apply):
- `cloud_run_inventory_url`
- `cloud_run_order_url`
- `cloud_sql_connection_name`
- `redis_host`
- `pubsub_topic`
- `pubsub_push_subscription`

Si necesitas refrescar la URL (quedó vacía):
```bash
terraform apply -refresh-only -auto-approve
terraform output
```

---

## 5) Exportar outputs como variables de entorno

Desde `terraform/`:
```bash
eval "$(terraform output -json | jq -r '
  "export INVENTORY_URL=\(.cloud_run_inventory_url.value)\n" +
  "export ORDER_URL=\(.cloud_run_order_url.value)\n" +
  "export SQL_CONN=\(.cloud_sql_connection_name.value)\n" +
  "export PUBSUB_TOPIC=\(.pubsub_topic.value)\n" +
  "export PUBSUB_SUB=\(.pubsub_push_subscription.value)\n" +
  "export REDIS_HOST=\(.redis_host.value)\n"
')"

echo $INVENTORY_URL
echo $ORDER_URL
```

---

## 6) Preparar la base de datos (esquema + datos semilla)

### 6.1 Conexión con Cloud SQL Auth Proxy (recomendado)
Descarga/ejecuta el proxy (Linux amd64):
```bash
cd ~
curl -o cloud-sql-proxy \
  https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.18.2/cloud-sql-proxy.linux.amd64
chmod +x cloud-sql-proxy
./cloud-sql-proxy --port 5432 "$SQL_CONN"
```
En otra terminal, conéctate con `psql`:
```bash
PGPASSWORD=supersecreto psql -h 127.0.0.1 -p 5432 -U app_user -d inventorydb
```

> Alternativa sin proxy: `gcloud sql connect inventory-sql --user=app_user --database=inventorydb`

### 6.2 Esquema
```sql
CREATE TABLE IF NOT EXISTS inventory (
  sku TEXT PRIMARY KEY,
  available_qty INTEGER NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  sku TEXT NOT NULL,
  qty INTEGER NOT NULL CHECK (qty > 0),
  customer_id TEXT NOT NULL,
  received_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### 6.3 Datos semilla (medicamentos)
```sql
INSERT INTO inventory (sku, available_qty) VALUES
('MED-ANALG-ACETAM-500MG-24TAB',120),
('MED-ANALG-ACETAM-650MG-10TAB',30),
('MED-ANALG-IBUPRO-400MG-20CAP',75),
('MED-GI-OMEPRA-20MG-14CAP',60),
('MED-ALERG-LORATA-10MG-10TAB',80),
('MED-ANTIB-AMOXI-500MG-12CAP',5),
('MED-ANTIB-AZITH-500MG-3TAB',0),
('MED-RESP-SALBUT-100MCG-200D',22),
('MED-DIAB-METFOR-850MG-60TAB',100),
('MED-CARD-LOSART-50MG-30TAB',90)
ON CONFLICT (sku) DO UPDATE
SET available_qty = EXCLUDED.available_qty,
    updated_at    = NOW();
```

---

## 7) Pruebas de humo (smoke tests)

> Si los servicios **no** son públicos, usa OIDC:
```bash
export ID_TOKEN=$(gcloud auth print-identity-token)
AUTH=(-H "Authorization: Bearer $ID_TOKEN")
```

### 7.1 Salud
```bash
curl "${AUTH[@]}" "$INVENTORY_URL/health"
curl "${AUTH[@]}" "$ORDER_URL/health"
```

### 7.2 Inventario — disponibilidad (cache warmup)
```bash
# 1ª llamada: "source":"db"
curl "${AUTH[@]}" "$INVENTORY_URL/inventario/MED-ANALG-ACETAM-500MG-24TAB/disponibilidad"

# 2ª llamada: "source":"cache"
curl "${AUTH[@]}" "$INVENTORY_URL/inventario/MED-ANALG-ACETAM-500MG-24TAB/disponibilidad"
```

### 7.3 Pedido — publicación y persistencia
```bash
curl -X POST -H "Content-Type: application/json" "${AUTH[@]}" \
  -d '{"order_id":"ORD-1001","sku":"MED-ANALG-ACETAM-500MG-24TAB","qty":2,"customer_id":"CUST-9"}' \
  "$ORDER_URL/pedido"
```
Valida en DB:
```sql
SELECT order_id, sku, qty, customer_id, received_at
FROM orders ORDER BY id DESC LIMIT 5;
```