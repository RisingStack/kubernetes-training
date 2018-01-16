/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# virtualBox
brew cask install virtualbox

# docker
brew cask install docker
open /Applications/Docker.app
sudo docker run hello-world

# kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/darwin/amd64/kubectl && chmod +x ./kubectl && sudo mv ./kubectl /usr/local/bin/kubectl
kubectl version

# minikube
brew cask install minikube
minikube version
minikube start

# jq
brew install jq
