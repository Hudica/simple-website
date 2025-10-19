# Application Load Balancer
resource "aws_lb" "main" {
  name               = "${var.project_name}-alb"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.frontend.id]
  subnets            = aws_subnet.public_subnets[*].id

  tags = {
    Name        = "${var.project_name}-alb"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Target Groups
resource "aws_lb_target_group" "frontend" {
  name        = "${var.project_name}-frontend-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path                = "/"
    healthy_threshold   = 2
    unhealthy_threshold = 10
    timeout             = 5
    interval            = 30
    matcher             = "200"
  }

  tags = {
    Name        = "${var.project_name}-frontend-tg"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Listeners
resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}