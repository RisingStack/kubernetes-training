#!/bin/bash

DIR=$(pwd)

SERVICE_NAMES=("ui" "api")

for SERVICE_NAME in "${SERVICE_NAMES[@]}"; do
  cd $DIR/$SERVICE_NAME/src && npm i && npm run dockerize
  kubectl delete service,deployment -l app=$SERVICE_NAME
  docker tag k8s/$SERVICE_NAMES:v1 gcr.io/training-193616/$SERVICE_NAMES:v1
  gcloud docker -- push gcr.io/training-193616/$SERVICE_NAMES:v1
  kubectl apply -f <(istioctl kube-inject -f ../deployment.yml)
  kubectl apply -f <(istioctl kube-inject -f ../service.yml)
done

API_URL=$(kubectl get svc api -o jsonpath='{.status.loadBalancer.ingress[0].ip}':5000)
kubectl patch deployment ui --patch '{"spec": {"template": {"spec": {"containers": [{"name": "ui", "env":[{"name": "REACT_APP_API_URL", "value": "'$API_URL'"}]}]}}}}'

kubectl delete routerule -l app=api
kubectl apply -f <(istioctl kube-inject -f $DIR/api/routerule.yml)
