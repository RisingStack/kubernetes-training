#!/bin/bash

# RUN these command once before deploy
# minikube start
# eval $(minikube docker-env)
# echo "$(minikube ip) risingstack.training.example.com" | sudo tee -a /etc/hosts

DIR=$(pwd)

SERVICE_NAMES=("ui" "api")

for SERVICE_NAME in "${SERVICE_NAMES[@]}"; do
  cd $DIR/$SERVICE_NAME/src && npm i && npm run dockerize
  kubectl delete service,deployment -l app=$SERVICE_NAME
  kubectl apply -f <(istioctl kube-inject -f ../deployment-local.yml)
  kubectl apply -f <(istioctl kube-inject -f ../service.yml)
done

kubectl delete ingress gateway
kubectl apply -f <(istioctl kube-inject -f $DIR/ingress-local.yml)

kubectl delete routerule -l app=api
kubectl apply -f <(istioctl kube-inject -f $DIR/api/routerule.yml)
kubectl apply -f <(istioctl kube-inject -f $DIR/api/routerule2.yml)
