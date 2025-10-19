# ECR Repository for Frontend
resource "aws_ecr_repository" "frontend" {
  name = "${var.project_name}-frontend"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "${var.project_name}-frontend"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}