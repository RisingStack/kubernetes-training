#!/bin/bash

DIR=$(pwd)

kubectl delete -f <(istioctl kube-inject -f $DIR/adapter.yml)
kubectl delete -f <(istioctl kube-inject -f $DIR/instance.yml)
kubectl delete -f <(istioctl kube-inject -f $DIR/rule.yml)

kubectl apply -f <(istioctl kube-inject -f $DIR/adapter.yml)
kubectl apply -f <(istioctl kube-inject -f $DIR/instance.yml)
kubectl apply -f <(istioctl kube-inject -f $DIR/rule.yml)
