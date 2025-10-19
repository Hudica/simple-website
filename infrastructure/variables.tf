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
  description = "Target CPU utilization for frontend service scaling"
  default     = 50
}

variable "frontend_scale_in_cooldown" {
  description = "Cooldown period for frontend service scale-in (seconds)"
  default     = 300
}

variable "frontend_scale_out_cooldown" {
  description = "Cooldown period for frontend service scale-out (seconds)"
  default     = 300
}

variable "log_retention_days" {
  description = "Number of days to retain CloudWatch logs"
  default     = 30
}