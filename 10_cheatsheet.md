https://kubernetes.io/docs/reference/kubectl/cheatsheet/

K8S

Context & Config

KUBE_EDITOR="nano"
KUBECONFIG=~/.kube/config:~/.kube/kubconfig2

kubectl config view
kubectl config view -o jsonpath='.Clusters'
kubectl config current-context
kubectl config use-context $CONTEXT

Describe resource type
kubectl explain $RESOURCE

Create resource
kubectl create -f $FILE_PATH

Update resource
kubectl rolling-update $NAME -f $FILE_PATH
kubectl rolling-update $NAME_V1 $NAME_V2 --rollback
kubectl replace --force -f $FILE_PATH

Modify resource
kubectl patch $TYPE $NAME --path $JSON_PATH

Get resource info
kubectl get pods|services|deployments
kubectl describe pods|services|deployments

Get logs
kubectl logs


Minikube

Open exposed application
minikube service $APP_NAME

Get adress of exposed application
minikube service $APP_NAME --url
