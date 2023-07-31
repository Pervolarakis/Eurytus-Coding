<p align="center">
  <img src = "logo.svg" alt="LOGO SVG"/>
</p>
<h1 align="center">Eurytus</h1>
<p>Eurytus coding automates code grading for algorithmic challenges. Users, including educators, can create challenges shared publicly or through private links. The platform supports test-based evaluation, code structure checking, and design pattern detection.
</p>

## Features

![alt text](./features.svg)

So far the platform supports `Java` and `JavaScript` with the main focus being on Java since it allows more complex tests such as structure and design pattern detection.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Backend Services](#backend-services)
- [Frontend](#frontend)
- [Messaging Service](#messaging-service)
- [NPM Package](#npm-package)
- [Testing](#testing)
- [Continuous Integration/Continuous Deployment (CI/CD)](#continuous-integrationcontinuous-deployment-cicd)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Installation

To run the application locally, follow these steps:

Install `Node`, `Docker` and `Kubernetes`.

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

However, for development purposes the use of [Skaffold](https://skaffold.dev/docs/install/) is recommended by using

```bash
skaffold dev
```

In the parent directory.

## Usage

Once the application is up and running, you can perform the following actions:

- Create algorithmic challenges and set their visibility (public/private).
- Solve challenges
- Submit code for grading and receive feedback on test results, code structure, and design pattern usage.

## Backend Services

The application is built using a microservices architecture with five different backend services, each serving specific purposes:

1. **Challenges Service**: This service is responsible for storing and managing all the challenges. It allows users to create and manage challenges, set their visibility (public/private), and specify the test cases for grading.
2. **Execute Challenges Service**: This service handles the execution of user-submitted code and performs grading based on the test cases defined by the challenge creators. It ensures secure and isolated execution of code submissions.
3. **History Service**: The History Service stores and manages the grades and submissions history for each challenge. It provides data in formats suitable for visualization and analytics.
4. **Moderation Service**: The Moderation Service is responsible for the moderation of public challenges. Administrators can approve or decline requests related to public challenges for quality assurance. These requests include challenge creation, modifications to existing challenges, and more.
5. **Authentication Service**: The Authentication Service handles user authentication and authorization. It ensures that only authorized users can access certain features, such as creating challenges, submitting solutions, and moderating public challenges.

Each backend service operates independently and communicates with each other through the messaging service, facilitating a scalable and maintainable microservices architecture. This design allows for efficient development, testing, and deployment of each service, enhancing the overall performance and flexibility of the application.

## Frontend

The frontend of the application is built using React.js and styled with Tailwind CSS. It communicates with the backend services to manage challenges, user submissions and grading.

## Messaging Service

The messaging service facilitates communication between the backend services in the microservices architecture.

## NPM Package

We have developed an NPM package, `eurytus/common`, to abstract common functionality across the microservices. The package can be found [here](https://www.npmjs.com/package/@eurytus/common).

## Testing

A Test-Driven Development (TDD) approach was used during development. Each endpoint has associated tests to ensure functionality and stability. To run the tests, use the following command on each backend service folder:

```bash
npm test
```

## Continuous Integration/Continuous Deployment (CI/CD)

The project uses GitHub Actions for CI/CD. On every push to the main branch, the application is automatically tested, built, and deployed to the production environment.

## Contribution Guidelines

Contributions are always welcome!

If you have any suggestions or something you want to work on please open an issue and wait to get assigned!

You can help by:
- Adding new features.
- Fixing bugs.
- Cleaning up the code.
- Optimizing project performance.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code according to the terms of this license.