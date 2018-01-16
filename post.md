# Intro
- microservices architecture shifts complexity from the space of code design and implementation into system operations
- pushing the complexity from one place (software design and development) to another (operations) is just like hiding some tricky parts in somewhere else
- k8s lets you to automate things and solve the problems easily

![alt text](https://martinfowler.com/bliki/images/microservicePrerequisites/sketch.png "MS meme by Martin Fowler")

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
- graceful start / shutdown

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

envoy
- caching server + client? invalidate manually?
