
# Starting from Helm (K8s)

## Before you begin

Before installing Mu you'll need:
1. A computer running Linux or MacOS.
2. A k8s cluster preferably with persistent volume provisioning support.
3. Helm 3 package manager, installed locally.

## If you need a local cluster

This section applies if you don't have a k8s cluster and need to set up a local development environment.

We recommend installing minikube as follows:

please alter configuration to your likings

```shell
$ minikube start --vm-driver=hyperkit --memory=6144 --cpus=4 --disk-size=50g
$ minikube addons enable ingress
```

building functions locally requires docker. Let's leverage minikube's internal dockerd

```shell
$ eval $(minikube docker-env)
```

## Deploy Mu

It's time to deploy Mu

```shell
$ helm repo add leanmu 'https://raw.githubusercontent.com/lean-mu/mu-helm/master/'
$ helm repo update
$ helm install --create-namespace -n mu mu leanmu/mu
```

Deployment is performed as a ackground task, We strongly recommend to us k9s to check on status. It is much simplier than the cli and allows to quickly browser though deployments, events and logs.

## Accessing Mu

You should now have a live instance of Mu deployed on the cluster.
Accessing the instance requires to define its ingress in the DNS.

Get the ingres ip using the command below, and make it match the default ingres name fn.mu.local. (this typically done in /etc/hosts or the DNS server)

kubectl get ingress mu-ingress-controller -o jsonpath="{.status.loadBalancer.ingress[0].ip}"

You are done! When properly configured, the following URLs are available

UI endpoint - http://fn.mu.local/ui
API endpoint - http://fn.mu.local/api
FN invocation endpoint - http://fn.mu.local/
FLOW endpoint - http://fn.mu.local/flow
Monitoring endpoint - http://fn.mu.local/grafana

Further configuration attributes are available as part of the helm chart

## Download and Install the CLI

The Fn CLI is a handy too to manage functions from the command line, follow the instructions below to install it.

For a MacOS Installation you can use Homebrew:

```shell
$ brew update && brew install fn
```

Or, alternatively for Linux/Unix/MacOS from a terminal type the following:

```shell
$ curl -LSs https://raw.githubusercontent.com/fnproject/cli/master/install | sh
```

