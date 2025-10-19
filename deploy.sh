#!/bin/bash

# Set AWS region
export AWS_REGION=us-east-1

# Create ECR repository if it doesn't exist
ECR_REPO=$(aws ecr describe-repositories --repository-names my-app-frontend --query 'repositories[0].repositoryUri' --output text 2>/dev/null || true)
if [ -z "$ECR_REPO" ]; then
  aws ecr create-repository --repository-name my-app-frontend
fi

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com

# Build frontend Docker image
docker build -t frontend -f Dockerfile .

# Tag images with commit SHA and 'latest'
COMMIT_SHA=$(git rev-parse --short HEAD)
docker tag frontend:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:$COMMIT_SHA
docker tag frontend:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:latest

# Push images to ECR
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:$COMMIT_SHA
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:latest

# Apply Terraform changes
cd infrastructure
terraform init
terraform apply -auto-approve

# Update ECS service with new image
aws ecs update-service --cluster my-app-cluster --service my-app-frontend --force-new-deployment

# Check deployment status
DEPLOYMENT_STATUS=$(aws ecs describe-services --cluster my-app-cluster --services my-app-frontend --query 'services[0].deployments[0].status' --output text)
while [ "$DEPLOYMENT_STATUS" != "PRIMARY" ]; do
  echo "Waiting for deployment to complete..."
  sleep 10
  DEPLOYMENT_STATUS=$(aws ecs describe-services --cluster my-app-cluster --services my-app-frontend --query 'services[0].deployments[0].status' --output text)
done

# Output application URL
echo "Application URL: http://$(terraform output alb_dns_name)"