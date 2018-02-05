#!/bin/bash

DIR=$(pwd)

minikube start
eval $(minikube docker-env)

minikube addons enable heapster
minikube addons enable ingress
