variable "aws_region" {
  description = "AWS region to create resources in"
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  default     = "my-app"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  default     = "dev"
}

variable "vpc_cidr_block" {
  description = "CIDR block for VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "frontend_cpu" {
  description = "CPU units for frontend task"
  default     = 256
}

variable "frontend_memory" {
  description = "Memory for frontend task"
  default     = 512
}

variable "frontend_desired_count" {
  description = "Desired count for frontend service"
  default     = 2
}

variable "frontend_max_capacity" {
  description = "Maximum capacity for frontend service"
  default     = 4
}

variable "frontend_min_capacity" {
  description = "Minimum capacity for frontend service"
  default     = 2
}

variable "frontend_cpu_target_value" {
  description = "Target CPU utilization for frontend service"
  default     = 50
}