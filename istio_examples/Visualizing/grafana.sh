#!/bin/bash

kubectl apply -f ~/istio-0.4.0/install/kubernetes/addons/grafana.yaml

POD_STATUS=""
while [ "$POD_STATUS" != "Running" ]; do
  sleep 10
  POD_STATUS=$(kubectl get pods -l app=grafana -n istio-system -o jsonpath='{.items[0].status.phase}')
done

kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=grafana -o jsonpath='{.items[0].metadata.name}') 3000:3000 &

echo "Grafana running on: http://localhost:3000/"

### DELETE ###
# lsof -c kubectl -ti:3000 -a | xargs kill
# kubectl delete -f ~/istio-0.4.0/install/kubernetes/addons/grafana.yaml
