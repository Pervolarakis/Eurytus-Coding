<p align="center">
  ![logo](logo.svg)
</p>

# Eurytus

Eurytus is an open-source tool that aims to automate the process of code grading. 


## Features

![alt text](./features.svg)

So far we only provide support for `Java` and `JavaScript` with the main focus being on Java since we can do more tests such as structure and design pattern detection.
 
## Run Locally
In order to run this project you need to install `Node`, `Docker` and `Kubernetes`.

Clone the project

```bash
  git clone https://github.com/Pervolarakis/Eurytus-Coding.git
```

Go to the project directory

```bash
  cd Eurytus-Coding
```

Install dependencies for every service.

```bash
  cd auth
  npm install
  cd ..
  cd challenges
  npm install
  cd ..
  cd executeChallenges
  npm install
  cd ..
  cd moderateChallenges
  npm install
  cd ..
  cd history
  npm install
```

Install [Ingress nginx](https://kubernetes.github.io/ingress-nginx/deploy/) on your kubernetes cluster.

```bash
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/cloud/deploy.yaml

```

Create a kubernetes secret for your JWT Key secret

```bash
  kubectl create secret generic jwt-key --from-literal=JWT_KEY=abc

```

Finally, in order to start the services you can either use:

```bash
kubectl apply -f file-name.yaml
```

For every yaml file in the infra/k8s directory.

However, for development purposes we recommend using [Skaffold](https://skaffold.dev/docs/install/) by using

```bash
skaffold dev
```

In the parrent direcotry.

## Contributing

Contributions are always welcome!

If you have any suggestions or something you want to work on please open an issue and wait to get assigned!

You can help by:
- Adding new features.
- Fixing bugs.
- Cleaning up the code.
- Optimizing project performance.
  