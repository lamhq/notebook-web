# Notebook Web

## Description

Web interface for Notebook app.

## Project setup

```bash
pnpm install
```

Copy the file `.env.example` to `.env` and fill in the values (you can get them after deploying the API part).

## Run the project

Start the dev server:

```bash
npm run dev
```

Run Storybook to view the app without the backend API:

```bash
npm run storybook
```

Build the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
pnpm preview
```

## Create infrastructure

Create the infrastructure and set up a domain name with HTTPS access:

1. Set up AWS credentials for the command line
2. Register a domain name for the web app
3. Request an SSL certificate from AWS Certificate Manager
4. Validate domain ownership for the certificate
5. Prepare Terraform configuration files
6. Init Terraform working directory
7. Create deployment package
8. Create the infrastructure
9. Add a DNS record (CNAME) to point the domain name to the created CloudFront distribution

### Prepare Terraform configuration files

Create a `infra/backend.tfvars` file that contains configuration for Terraform S3 backend:

```hcl filename="infra/backend.tfvars"
region               = "<AWS region>"
workspace_key_prefix = "<project name>"
bucket               = "<s3 bucket for storing Terraform state>"
key                  = "api.tfstate"
dynamodb_table       = "<DynamoDB table name to perform state locking>"
```

Create a `infra/params.tfvars` file that contain required variables to deploy the infrastructure:

```hcl filename="params.tfvars"
aws_region               = ""
project                  = "nb-web"
api_domain               = ""
web_domain               = "abc.xyz.com"
acm_certificate_arn      = ""
tf_backend_policy_arn    = ""
github_oidc_provider_arn = ""
github_repo_id           = ""
```

### Init Terraform working directory

```shell
cd infra
terraform init -backend-config=backend.tfvars -reconfigure
```

If you're deploying to non-production environment (e.g. dev), run these commands:

```shell
terraform workspace new dev
terraform workspace select dev
```

### Create deployment package

```shell
pnpm install
npm run build
```

### Create the infrastructure

This will create the infrastructure and deploy the code to AWS:

```shell
terraform apply -var-file="params.tfvars" --auto-approve
```

## Continuous Delivery

Configure your GitHub repository to enable automatic deployment upon code changes:

1. Create an environment for deployment in your GitHub repository settings
2. Create Secrets and Variables for the environment
3. When changes are pushed to the `main` branch, a Github Action workflow in `.github/workflows/main.yml` will run and deploy the application automatically.

Go to repository setting on GitHub:

- Environment name: `prod`
- Secret `TF_BACKEND_CONFIG`, with content from `infra/backend.tfvars`
- Secret `TF_VARS`, with content from `infra/params.tfvars`
- Secret `ENV_VARS`, with content from `.env`
- Variable `AWS_REGION`, with value from `aws_region`
- Variable `CD_ROLE_ARN`, with value from `CD_ROLE_ARN`

## Clean up

Destroy the application's infrastructure:

```sh
terraform destroy -var-file="params.tfvars" --auto-approve
terraform workspace select default
terraform workspace delete dev
```
