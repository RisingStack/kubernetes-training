#!/bin/bash

DIR=$(pwd)

kubectl delete destinationpolicy github-circuit-breaker
kubectl apply -f <(istioctl kube-inject -f $DIR/circuitBreaker.yml)

echo "Testing... (sending 3 request simultaneously)"
POD=$(kubectl get pod -l app=api -o jsonpath='{.items[0].metadata.name}')
kubectl exec -it $POD -c api  -- sh -c "curl -s -I http://github.default.svc.cluster.local:5000/api/hello/ | grep HTTP/1.1 & curl -s -I http://github.default.svc.cluster.local:5000/api/hello | grep HTTP/1.1 & curl -s -I http://github.default.svc.cluster.local:5000/api/hello | grep HTTP/1.1 & sleep 2s"
