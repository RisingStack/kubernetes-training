#!/bin/bash

DIR=$(pwd)

kubectl delete routerule -l app=api
kubectl apply -f <(istioctl kube-inject -f $DIR/routerule.yml)
kubectl apply -f <(istioctl kube-inject -f $DIR/routerule2.yml)
