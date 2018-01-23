http://blog.christianposta.com/istio-workshop/slides/#/agenda

# Intro
- microservices architecture shifts complexity from the space of code design and implementation into system operations
- pushing the complexity from one place (software design and development) to another (operations) is just like hiding some tricky parts in somewhere else
- k8s lets you to automate things and solve the problems easily

!["MS meme by Martin Fowler"](https://martinfowler.com/bliki/images/microservicePrerequisites/sketch.png)

# Problems

## Change management
- rapid provisioning of new resources
- services can come and go
- should be able to deploy a new service quickly

### Deployment strategies
- k8s deployment `.spec.strategy.type==Recreate` will kill all pods before new ones are created
- 0 downtime deployment - `.spec.strategy.type==RollingUpdate` controls the process with `maxUnavailable` and `maxSurge`
- blue/green
- canary

### Bootstrapping
- graceful start / shutdown (app skeleton)
- automate setup (repo, ci, deployment)

## Communication

### Slow communication
- use cache for GET
- fail fast when POST, PUT, DEL

### Direct communication
- client never calls the service
- use API gateway

### + Scaling
- persistent problem for MS and monoliths
- HPA
- heapster
- rate limitation

### Monitoring
- loosely-coupled services collaborating
- detect serious problems

### Fault injection
- test resilience of your application
- network latency -> delay
- crash failure -> abort
