#!/bin/bash

kubectl delete -f $ISTIODIR/install/kubernetes/addons/zipkin.yaml
kubectl apply -n istio-system -f https://raw.githubusercontent.com/jaegertracing/jaeger-kubernetes/master/all-in-one/jaeger-all-in-one-template.yml

POD_STATUS=""
while [ "$POD_STATUS" != "Running" ]; do
  sleep 10
  POD_STATUS=$(kubectl get pods -l app=jaeger -n istio-system -o jsonpath='{.items[0].status.phase}')
done

kubectl port-forward -n istio-system $(kubectl get pod -n istio-system -l app=jaeger -o jsonpath='{.items[0].metadata.name}') 16686:16686 &

echo "Jaeger running on: http://localhost:16686/"

### DELETE ###
# lsof -c kubectl -ti:16686 -a | xargs kill
# kubectl delete -f https://raw.githubusercontent.com/jaegertracing/jaeger-kubernetes/master/all-in-one/jaeger-all-in-one-template.yml -n istio-system
