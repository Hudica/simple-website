# Deployment Instructions

## Prerequisites

- AWS CLI installed and configured with appropriate credentials
- Docker installed
- Terraform installed

## Architecture Overview

This application is deployed using AWS ECS Fargate, with the frontend React application running in a Docker container. The containers are orchestrated by an ECS cluster and exposed to the internet via an Application Load Balancer (ALB).

The infrastructure is defined using Terraform and includes the following resources:

- VPC with public and private subnets across two Availability Zones
- ECS cluster and task definitions
- ECR repository for storing container images
- ALB and target groups
- Security groups with least-privilege access
- Auto-scaling policies for ECS services
- CloudWatch log groups for container logs

## Deployment Steps

1. Clone the repository and navigate to the project root directory.
2. Copy the `.env.example` file to `.env` and update the values as needed.
3. Run `./deploy.sh` to create the ECR repository (if it doesn't exist), build and push the Docker images to ECR, apply Terraform changes, and update the ECS service with the new images.
4. The script will output the URL of the deployed application.

## Accessing the Application

After a successful deployment, you can access the frontend application by navigating to the URL displayed in the deployment script output.

## Troubleshooting

- If the deployment fails, check the CloudWatch logs for the ECS service and task for any error messages.
- Ensure that you have the necessary AWS permissions to create and manage the required resources.
- Verify that the Docker images are built and pushed correctly to ECR.

## Cost Estimates

The main cost drivers for this architecture are:

- ECS Fargate tasks (based on vCPU and memory usage)
- Application Load Balancer (based on data transfer and load balancer capacity units)
- ECR (based on storage and data transfer)
- CloudWatch logs (based on log volume)

Refer to the AWS Pricing Calculator for accurate cost estimates based on your specific usage patterns.

## Tearing Down Infrastructure

To tear down the infrastructure and delete all resources, run the following commands:

```
cd infrastructure
terraform destroy
```

Confirm the destruction by typing `yes` when prompted.