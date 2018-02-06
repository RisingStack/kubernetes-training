#!/bin/bash

kubectl delete deployment,svc,ingress,routerule,destinationpolicy --all

kubectl delete -f <(istioctl kube-inject -f RateLimiting/adapter.yml)
kubectl delete -f <(istioctl kube-inject -f RateLimiting/instance.yml)
kubectl delete -f <(istioctl kube-inject -f RateLimiting/rule.yml)

kubectl delete -f ~/istio-0.4.0/install/kubernetes/addons/prometheus.yaml
kubectl delete -f ~/istio-0.4.0/install/kubernetes/addons/zipkin.yaml
kubectl delete -f https://raw.githubusercontent.com/jaegertracing/jaeger-kubernetes/master/all-in-one/jaeger-all-in-one-template.yml -n istio-system
