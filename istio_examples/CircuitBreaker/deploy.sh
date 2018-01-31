FOLDER=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

istioctl create -f $FOLDER/circuitBreaker.yml
