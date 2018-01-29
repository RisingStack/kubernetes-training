#!/bin/bash

DIR=$(pwd)

SERVICE_NAMES=("ui" "api")

for SERVICE_NAME in "${SERVICE_NAMES[@]}"; do
  cd $DIR/$SERVICE_NAME/src && npm i && npm run dockerize
  kubectl delete service,deployment -l app=$SERVICE_NAME
  kubectl apply -f <(istioctl kube-inject -f ../deployment.yml)
  kubectl apply -f <(istioctl kube-inject -f ../service.yml)
done

API_URL=$(minikube service api --url)
kubectl patch deployment ui --patch '{"spec": {"template": {"spec": {"containers": [{"name": "ui", "env":[{"name": "REACT_APP_API_URL", "value": "'$API_URL'"}]}]}}}}'

kubectl delete routerule -l app=api
kubectl apply -f <(istioctl kube-inject -f $DIR/api/routerule.yml)
