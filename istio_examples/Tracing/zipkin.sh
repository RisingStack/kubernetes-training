#!/bin/bash

kubectl apply -f $ISTIODIR/install/kubernetes/addons/zipkin.yaml

POD_STATUS=""
while [ "$POD_STATUS" != "Running" ]; do
  sleep 10
  POD_STATUS=$(kubectl get pods -l app=zipkin -n istio-system -o jsonpath='{.items[0].status.phase}')
done

kubectl port-forward -n istio-system $(kubectl get pod -n istio-system -l app=zipkin -o jsonpath='{.items[0].metadata.name}') 9411:9411 &

echo "Zipkin running on: http://localhost:9411/"

### DELETE ###
# lsof -c kubectl -ti:9411 -a | xargs kill
# kubectl delete -f $ISTIODIR/install/kubernetes/addons/zipkin.yaml
