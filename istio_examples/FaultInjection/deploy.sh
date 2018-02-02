#!/bin/bash

DIR=$(pwd)

kubectl delete routerule -l app=github
kubectl apply -f <(istioctl kube-inject -f $DIR/faultinjection.yml)
