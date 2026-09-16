# Tax Calculator — Cloud Native / DevOps / Agile / NoSQL Final Project

## Part A: Agile Planning

### Epic
**Modernize and Automate Deployment of Tax Calculator App**
As a development team, we want to containerize the Tax Calculator application and
automate its build, test, and deployment process using CI/CD pipelines, so that the
app can be reliably and repeatedly deployed to IBM Cloud with minimal manual effort.

### Stories
1. As a developer, I want to write a Dockerfile for the Tax Calculator app, so that it runs consistently in any environment.
2. As a developer, I want to build and run the Docker image locally, so that I can verify it works before deploying.
3. As a developer, I want to push the Docker image to IBM Cloud Container Registry, so that it's available for deployment.
4. As a developer, I want to deploy the containerized app on IBM Cloud, so that it's accessible to users.
5. As a developer, I want unit tests to run automatically using Jasmine, so that regressions are caught early.
6. As a developer, I want a Tekton pipeline with tasks for build, test, and deploy, so that the release process is automated.
7. As a developer, I want the pipeline to run and deploy automatically, so that I don't have to deploy manually.

---

## Part B: Modernize the Application

### Run tests locally
```bash
npm install
npm test
```

### Build the Docker image
```bash
docker build -t taxcalculator:v1 .
```

### Run the container locally
```bash
docker run -p 8080:8080 -d --name taxcalculator taxcalculator:v1
curl http://localhost:8080/health
```
Then open `http://localhost:8080` in a browser to test the UI.

### Push to IBM Cloud Container Registry
```bash
ibmcloud login --sso
ibmcloud cr login
ibmcloud cr region-set us-south
ibmcloud cr namespace-add <your_namespace>

docker tag taxcalculator:v1 us.icr.io/<your_namespace>/taxcalculator:v1
docker push us.icr.io/<your_namespace>/taxcalculator:v1
ibmcloud cr image-list
```

### Deploy on IBM Cloud Code Engine
```bash
ibmcloud ce project create --name taxcalculator-project
ibmcloud ce project select --name taxcalculator-project
ibmcloud ce application create --name taxcalculator-app \
  --image us.icr.io/<your_namespace>/taxcalculator:v1 \
  --registry-secret icr-secret \
  --port 8080
```

---

## Part C: DevOps — Tekton Pipeline

Files are in the `tekton/` folder:
- `task-test.yaml` — installs deps and runs Jasmine tests
- `task-build-push.yaml` — builds the Docker image and pushes it to ICR
- `task-deploy.yaml` — deploys the image to IBM Cloud Code Engine
- `pipeline.yaml` — wires the tasks together (clone → test → build/push → deploy)
- `pipelinerun.yaml` — triggers the pipeline with actual parameter values

### Apply and run
```bash
kubectl apply -f tekton/task-test.yaml
kubectl apply -f tekton/task-build-push.yaml
kubectl apply -f tekton/task-deploy.yaml
kubectl apply -f tekton/pipeline.yaml

tkn pipeline start taxcalculator-pipeline \
  --param repo-url=https://github.com/<your-username>/tax-calculator.git \
  --param image-url=us.icr.io/<your_namespace>/taxcalculator:v1 \
  --workspace name=pipeline-ws,claimName=pipeline-pvc

tkn pipelinerun logs --last -f
```
