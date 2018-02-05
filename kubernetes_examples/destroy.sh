#!/bin/bash

kubectl delete configmap,hpa,service,deployment,secret,ds,ingress --all
