#!/bin/bash

DIR=$(pwd)

SERVICE_NAMES=("ui" "api")

for SERVICE_NAME in "${SERVICE_NAMES[@]}"; do
  cd $DIR/$SERVICE_NAME/src
  docker rmi gcr.io/training-193616/$SERVICE_NAME:v1
  npm i && npm run dockerize
  kubectl delete service,deployment -l app=$SERVICE_NAME
  docker tag k8s/$SERVICE_NAME:v1 gcr.io/training-193616/$SERVICE_NAME:v1
  gcloud docker -- push gcr.io/training-193616/$SERVICE_NAME:v1
  kubectl apply -f <(istioctl kube-inject -f ../deployment.yml)
  kubectl apply -f <(istioctl kube-inject -f ../service.yml)
done

kubectl delete ingress gateway
kubectl apply -f <(istioctl kube-inject -f $DIR/ingress.yml)

kubectl delete routerule -l app=api
kubectl apply -f <(istioctl kube-inject -f $DIR/api/routerule.yml)
kubectl apply -f <(istioctl kube-inject -f $DIR/api/routerule2.yml)
