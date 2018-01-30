#!/bin/bash

DIR=$(pwd)

SERVICE_NAMES=("ui" "api" "github")

for SERVICE_NAME in "${SERVICE_NAMES[@]}"; do
  cd $DIR/$SERVICE_NAME/src && npm i && npm run dockerize
  kubectl delete service,deployment -l app=$SERVICE_NAME
  kubectl create -f ../deployment.yml
  kubectl create -f ../service.yml
done

API_URL=$(minikube service api --url)
kubectl patch deployment ui --patch '{"spec": {"template": {"spec": {"containers": [{"name": "ui", "env":[{"name": "REACT_APP_API_URL", "value": "'$API_URL'"}]}]}}}}'

minikube service ui
