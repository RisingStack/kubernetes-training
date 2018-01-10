Kubernetes

Prerequests:
- unix based os
- minikube

Intro
- kubernetes
- docker

- pod
- controller
- deployment
- service

Basics
- secret
- hpa
- healthcheck
- graceful shutdown
- DBS -> secret ???
- volumes
- helm
- istio
- sidecar -> cache -> 1. client 2. server side
- jobs
- distributed tracing
- prometheus
- ACL
- deployment strategies
  - recreate
  - rolling
  - blue/green -> istio, spinnaker
  - canary -> spinnaker


Arch best practices
- API GW
- idempotency
- circuit breaker
- retry logic
- deployment strategies
- testing
  - contract
  - integration
- CQRS
- Event source
- distributed data handling
- correlation id
- cache
  - invalidation
  - multi level
  - sidecar dies with pod -> no failover
  - client side cache
- design an app
- healthcheck
- graceful shutdown


DAY I.
Docker + K8S Basics

DAY II.
Using sidecars: Rate limiter, Cache

DAY III. Infrastructure tools 1.
Istio
ACL, CB, Deployment

DAY IV. - Infrastructure tools 2.
Canary release with spinnaker
Else?!

DAY V. - Monitoring
Prometheus


https://github.com/ramitsurana/awesome-kubernetes
