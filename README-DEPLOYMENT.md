# Deployment Instructions

## Prerequisites

- AWS CLI installed and configured with appropriate credentials
- Docker installed
- Terraform installed

## Architecture Overview

This application is deployed using AWS ECS Fargate, with the following components:

- **VPC**: A Virtual Private Cloud (VPC) with public and private subnets across two Availability Zones (AZs).
- **ECR**: An Elastic Container Registry (ECR) repository to store the Docker images.
- **ECS Cluster**: An ECS Cluster to manage and orchestrate the containers.
- **ECS Service**: An ECS Service to run the frontend application containers.
- **Application Load Balancer (ALB)**: An ALB to distribute traffic to the frontend containers.
- **Target Groups**: Target groups for the frontend service to register the container instances.
- **Security Groups**: Security groups to control inbound and outbound traffic.
- **CloudWatch**: CloudWatch log groups to collect container logs.
- **Auto Scaling**: Auto Scaling policies to scale the frontend service based on CPU utilization.

## Deployment Steps

1. Clone the repository and navigate to the project directory.

2. Create a `.env` file based on the `.env.example` file and set the required environment variables, including your AWS Account ID.

3. Run the `deploy.sh` script:

```bash
./deploy.sh
```

This script will perform the following steps:

- Authenticate with AWS ECR
- Create the ECR repository if it doesn't exist
- Build the frontend Docker image
- Tag the Docker images with the Git commit SHA and 'latest'
- Push the Docker images to ECR
- Initialize Terraform
- Apply Terraform changes to create or update the infrastructure
- Update the ECS service to use the new Docker images
- Wait for the deployment to complete

4. After the deployment is complete, the script will output the Application Load Balancer DNS name. You can access the application using this URL.

## Accessing the Application

Once the deployment is complete, you can access the application using the Application Load Balancer DNS name, which will be printed at the end of the deployment script.

## Troubleshooting

- If the deployment fails, check the CloudWatch logs for the ECS service and containers for any error messages.
- Ensure that you have the necessary permissions to create and manage the required AWS resources.
- If you encounter any issues, you can roll back the changes by running `terraform destroy` in the `infrastructure` directory.

## Cost Estimates

The cost of running this application will depend on various factors, such as the AWS region, the number of containers, and the amount of traffic. Here's a rough estimate of the monthly costs:

- **ECS Fargate**: $0.04048 per vCPU-hour and $0.004445 per GB of memory per hour
- **ECR**: $0.10 per GB-month for storage
- **ALB**: $0.0225 per hour, plus data transfer charges
- **CloudWatch Logs**: $0.03 per GB of log data ingested

Note that these estimates are based on the default configuration and may vary depending on your usage patterns and resource requirements.

## Tearing Down Infrastructure

To tear down the infrastructure and delete all resources, navigate to the `infrastructure` directory and run:

```bash
terraform destroy
```

This will prompt you to confirm the destruction of resources. Review the plan and enter `yes` to proceed.
