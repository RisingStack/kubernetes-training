http://blog.christianposta.com/istio-workshop/slides/#/agenda

# Intro
- microservices architecture shifts complexity from the space of code design and implementation into system operations
- pushing the complexity from one place (software design and development) to another (operations) is just like hiding some tricky parts in somewhere else
- k8s lets you to automate things and solve the problems easily
- istio gives the rest of the needed tools
- use helm to automate things

!["MS meme by Martin Fowler"](https://martinfowler.com/bliki/images/microservicePrerequisites/sketch.png)

# Problems

## Communication

### Direct communication
- client never calls the service
- use API gateway
- handle auth, etc

### Slow communication
- use cache for GET
- fail fast when POST, PUT, DEL
- envoy will be sidecar which can be configured somehow

### Security (NEED TO TEST)
- kubernetes has NetworkPolicy
- whats does istio give for us?
- ingress/egress

## Improve reliability

### Healthz
- proper timeouts

### Graceful start / shutdown
  - tear down connections in the good order (to avoid data loss)
  - idempotency
  - avoid draining connection pool -> graceful stop is important

### Circuit breaker & rate limitation (NEED TO TEST)
  - limit the impact of failures, latency spikes, and other undesirable network effects

## Change management
- services can come and go
- rapid provisioning of new resources
- should be able to deploy a new service quickly
- automate everything (repo, ci, deployment)
- use helm to pack/deploy apps

### Deployment strategies
- k8s deployment `.spec.strategy.type==Recreate` will kill all pods before new ones are created
- 0 downtime deployment - `.spec.strategy.type==RollingUpdate` controls the process with `maxUnavailable` and `maxSurge`
- blue/green
- canary (monitoring needed, allows to test in production, dark launch -> flippers)
- use versioned deployments with istio request routing

### Monitoring (NEED TO TEST)
- loosely-coupled services collaborating
- detect serious problems
- fail and detect problems fast -> write test where it is necessary
- prometheus
- HPA + heapster

### Fault injection
- test resilience of your application
- network latency -> delay
- crash failure -> abort
