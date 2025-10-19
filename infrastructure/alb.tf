# Application Load Balancer
resource "aws_lb" "main" {
  name               = "${var.project_name}-alb"
  load_balancer_type = "application"
  subnets            = aws_subnet.public_subnets[*].id
  security_groups    = [aws_security_group.alb_sg.id]

  tags = {
    Name        = "${var.project_name}-alb"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# ALB Security Group
resource "aws_security_group" "alb_sg" {
  name        = "${var.project_name}-alb-sg"
  description = "Allow inbound traffic to ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name        = "${var.project_name}-alb-sg"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Frontend Target Group
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

# ALB Listener
resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}