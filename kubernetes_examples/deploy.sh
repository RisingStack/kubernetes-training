#!/bin/bash

DIR=$(pwd)

cd $DIR/Service/src
npm i && npm run dockerize

kubectl delete service,deployment,secret,ds -l app=training
kubectl delete configmap,hpa,ingress --all

kubectl create -f $DIR/Configmap/configmap-production.yml
kubectl create -f $DIR/Configmap/configmap-staging.yml
kubectl create -f $DIR/Configmap/configmap-volumes.yml
kubectl create -f $DIR/Secret/secret.yml

kubectl create -f $DIR/Service/deployment.yml
kubectl create -f $DIR/Service/service.yml

kubectl create -f $DIR/Hpa/hpa.yml

kubectl label node minikube app=logging-node --overwrite
kubectl create -f $DIR/Daemonset/daemon.yml

kubectl create -f $DIR/Ingress/service-ingress.yml
kubectl create -f $DIR/Ingress/ingress.yml
echo "$(minikube ip) risingstack.training.example.com" | sudo tee -a /etc/hosts
