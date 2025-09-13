# README — Experimentos de Arquitectura

> **Objetivo general:** validar dos hipótesis de diseño en Google Cloud Platform mediante la construcción de dos microservicios en **FastAPI**. El propósito es medir métricas clave relacionadas con la latencia y la disponibilidad bajo diferentes condiciones de carga.

> **Región por defecto:** `us-central1` (requisito del proyecto).

---

## Índice

1. [Contexto y alcance](#contexto-y-alcance)
2. [Descripción de los experimentos](#descripción-de-los-experimentos)
3. [Propósito y criterios de aceptación](#propósito-y-criterios-de-aceptación)
4. [Tecnologías involucradas](#tecnologías-involucradas)
5. [Diagrama de arquitectura a alto nivel](#diagrama-de-arquitectura-a-alto-nivel)
6. [Interpretación de resultados](#interpretación-de-resultados)
7. [Esfuerzo estimado](#esfuerzo-estimado)

---

## Contexto y alcance

El proyecto plantea dos **experimentos de arquitectura** orientados a validar **atributos de calidad (ASRs)** de la plataforma. Estos experimentos están alineados con historias de arquitectura definidas en el backlog:

* **SCRUM-68:** Consulta de disponibilidad de producto en < 2s.
* **SCRUM-65:** Disponibilidad de pedidos ante picos de 400 órdenes/min.

Se evaluarán los puntos de sensibilidad de la arquitectura bajo escenarios controlados de carga.

---

## Descripción de los experimentos

### Experimento 1 — Latencia con caché (SCRUM-68)

* **Hipótesis de diseño:** Si se implementa una capa de caché (Redis) para almacenar los datos de inventario pre-agregados, la consulta `GET /inventario/{sku}/disponibilidad` responderá en menos de 2 segundos desde la aplicación móvil.
* **Punto de sensibilidad:** Latencia de extremo a extremo bajo una carga concurrente de 100 usuarios, considerando variabilidad de red móvil y rendimiento en *cache miss*.

### Experimento 2 — Disponibilidad con Pub/Sub (SCRUM-65)

* **Hipótesis de diseño:** Bajo un pico sostenido de 400 pedidos/min, si el ingreso de pedidos se desacopla con Pub/Sub (retorno inmediato 202) y los *workers* en Cloud Run autoescalan horizontalmente, la plataforma seguirá disponible y sin degradación.
* **Punto de sensibilidad:** Tiempo de respuesta y disponibilidad del servicio de pedido ante cargas sostenidas y capacidad de autoescalado de los workers.

---

## Propósito y criterios de aceptación

### Experimento 1 — Validación de latencia (15 min de prueba)

* **Propósito:** Asegurar latencia p95 < 2000 ms bajo 100 usuarios concurrentes.
* **Criterios de aprobación:**

  * Latencia p95 < 2000 ms.
  * Cache hit ratio > 90% tras fase de warm-up.
  * 0% de errores 5xx.

### Experimento 2 — Validación de disponibilidad (60 min de prueba)

* **Propósito:** Garantizar que el flujo de pedidos permanece disponible y sin pérdida de datos bajo 400 pedidos/min por 60 minutos.
* **Criterios de aprobación:**

  * 0% de errores 5xx en API de pedido.
  * DLQ = 0 y sin pérdida de mensajes.
  * Autoescalado en menos de 2 minutos.

---

## Tecnologías involucradas

* **Cliente:** Simulador de aplicación móvil con latencia 3G/4G.
* **API de Inventario:** FastAPI desplegado en Cloud Run.
* **API de Pedido:** FastAPI desplegado en Cloud Run.
* **Capa de caché (Exp.1):** Redis (Google Cloud Memorystore).
* **Mensajería (Exp.2):** Pub/Sub (tópico + suscripción).
* **Persistencia:** PostgreSQL (Cloud SQL).
* **Herramientas de carga:** JMeter.
* **Observabilidad:** Cloud Monitoring y Logging.

---

## Diagrama de arquitectura a alto nivel

```
[ Cliente simulado Jmeter ]
          | (HTTP, latencia 3G/4G simulada)
          v
  ┌──────────────────────┐         ┌──────────────────────┐
  │ Cloud Run:           │         │ Cloud Run:           │
  │ API de Inventario    │         │ API de Pedido        │
  │ (FastAPI)            │         │ (FastAPI)            │
  └─────────┬────────────┘         └─────────┬────────────┘
            │ Redis hit/miss                 │ Publish 202
            v                                v
     ┌──────────────┐                   ┌─────────────┐
     │ Memorystore  │                   │  Pub/Sub    │
     │ (Redis)      │                   │  (topic)    │
     └──────┬───────┘                   └──────┬──────┘
            │ Warm-up/backup                   │
            v                                  v
      ┌───────────────┐                 ┌──────────────────────┐
      │ Cloud SQL     │                 │ Cloud Run:           │
      │ PostgreSQL    │                 │ Worker de Pedido     │
      └──────┬────────┘                 │ (suscriptor)         │
             │                          └─────────┬────────────┘
             │                                    │
             │                                    v
             │                               ┌───────────────┐
             │                               │ Cloud SQL     │                 
             │                               │ PostgreSQL    │                 
             │                               └──────┬────────┘                 
             │                                      │                         
             │                                      │
             v                                      v
        Observabilidad (Cloud Logging/Monitoring, métricas, trazas)
```
---

## Interpretación de resultados

* **Si cumple criterios:**

  * Exp.1: Diseño con caché validado como arquitectura base para consultas de inventario.
  * Exp.2: Diseño con Pub/Sub y autoescalado validado como arquitectura base para pedidos.

* **Si no cumple criterios:**

  * Exp.1: Revisar estrategia de caché (TTL, invalidación) o consultas a BD.
  * Exp.2: Ajustar parámetros de autoescalado, incrementar instancias o refinar *workers*.

---

## Esfuerzo estimado

* **Experimento 1:** 22 h/hombre

  * Desarrollo de endpoint con lógica de caché.
  * Configuración de infraestructura.
  * Ejecución de pruebas de carga.

* **Experimento 2:** 20 h/hombre

  * Desarrollo de API de pedido (202 + publicación).
  * Worker suscriptor con escritura en BD.
  * Ejecución de pruebas de carga.

---

## Referencias

* SCRUM-68 — [https://uniandes-team-ybc1ocgr.atlassian.net/browse/SCRUM-68](https://uniandes-team-ybc1ocgr.atlassian.net/browse/SCRUM-68)
* SCRUM-65 — [https://uniandes-team-ybc1ocgr.atlassian.net/browse/SCRUM-65](https://uniandes-team-ybc1ocgr.atlassian.net/browse/SCRUM-65)
