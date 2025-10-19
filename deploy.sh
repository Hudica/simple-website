#!/bin/bash

# Set default values
AWS_REGION="us-east-1"
PROJECT_NAME="my-app"
ENVIRONMENT="dev"

# Load environment variables
set -o allexport
source .env
set +o allexport

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it and configure your credentials."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker."
    exit 1
fi

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "Terraform is not installed. Please install Terraform."
    exit 1
fi

# Authenticate with AWS ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create ECR repository if it doesn't exist
aws ecr describe-repositories --repository-names "${PROJECT_NAME}-frontend" --region $AWS_REGION || aws ecr create-repository --repository-name "${PROJECT_NAME}-frontend" --region $AWS_REGION

# Build frontend Docker image
docker build -t $PROJECT_NAME-frontend .

# Tag images with commit SHA and 'latest'
COMMIT_SHA=$(git rev-parse --short HEAD)
docker tag $PROJECT_NAME-frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME-frontend:$COMMIT_SHA
docker tag $PROJECT_NAME-frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME-frontend:latest

# Push images to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME-frontend:$COMMIT_SHA
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME-frontend:latest

# Change to infrastructure directory
cd infrastructure

# Initialize Terraform
terraform init

# Apply Terraform changes (with approval prompt)
terraform apply -auto-approve

# Update ECS services to use new images
aws ecs update-service --cluster $PROJECT_NAME-cluster --service $PROJECT_NAME-frontend --force-new-deployment

# Wait for deployment to complete
echo "Waiting for deployment to complete..."
aws ecs wait services-stable --cluster $PROJECT_NAME-cluster --services $PROJECT_NAME-frontend

# Get ALB DNS name
ALB_DNS_NAME=$(terraform output -raw alb_dns_name)

echo "Deployment completed successfully!"
echo "Application URL: http://$ALB_DNS_NAME"