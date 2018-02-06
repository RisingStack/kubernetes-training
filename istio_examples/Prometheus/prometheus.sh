#!/bin/bash

kubectl apply -f ~/istio-0.4.0/install/kubernetes/addons/prometheus.yaml

POD_STATUS=""
while [ "$POD_STATUS" != "Running" ]; do
  sleep 10
  POD_STATUS=$(kubectl get pods -l app=prometheus -n istio-system -o jsonpath='{.items[0].status.phase}')
done

kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=prometheus -o jsonpath='{.items[0].metadata.name}') 9090:9090 &

echo "Prometheus running on: http://localhost:9090/"

### DELETE ###
# lsof -c kubectl -ti:9090 -a | xargs kill
# kubectl delete -f ~/istio-0.4.0/install/kubernetes/addons/prometheus.yaml
