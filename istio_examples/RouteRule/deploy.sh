DIR=$(pwd)

kubectl delete routerule -l app=api
kubectl apply -f <(istioctl kube-inject -f $DIR/api/routerule.yml)
kubectl apply -f <(istioctl kube-inject -f $DIR/api/routerule2.yml)
