# Token si tus servicios requieren auth
export ID_TOKEN="$(gcloud auth print-identity-token)"

# Exp1: Inventario (p95<2000ms, 100 VUs, 15m)
jmeter -n -t exp1_inventory_cli.jmx \
  -JHOST_INVENTORY="inventario-api-435513124363.us-central1.run.app" \
  -JID_TOKEN="$ID_TOKEN" \
  -JSKU_CSV_PATH="skus.csv" \
  -l results/exp1.jtl \
  -e -o results/exp1-report \
  -q report.properties

# Exp2: Pedidos (400/min por 15m)
jmeter -n -t exp2_orders_cli.jmx \
  -JHOST_ORDER="pedido-api-435513124363.us-central1.run.app" \
  -JID_TOKEN="$ID_TOKEN" \
  -JSKU_CSV_PATH="skus.csv" \
  -l results/exp2.jtl \
  -e -o results/exp2-report \
  -q report.properties
