variable "tf_backend_policy_arn" {
  type        = string
  description = "ARN of IAM policy for managing Terraform backend resources on AWS"
}

variable "github_oidc_provider_arn" {
  type        = string
  description = "ARN of Identity provider for Github"
}

variable "github_repo_id" {
  description = "GitHub repository identifier"
  type        = string
  default     = "github-username/repository-name"
}

# IAM role for CD server to deploy the app (in this case, Github Action)
resource "aws_iam_role" "web_cd_role" {
  name = "${local.name_prefix}-cd-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Federated = var.github_oidc_provider_arn
        },
        Action = "sts:AssumeRoleWithWebIdentity",
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com",
          },
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo_id}:*"
          }
        }
      },
    ]
  })
}

# permissions to manage project's resources
resource "aws_iam_policy" "code_deploy_policy" {
  name        = "${local.name_prefix}-code-deploy-policy"
  description = "Permissions to deploy code for the web app"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      # update code in s3
      {
        Effect = "Allow"
        Action = ["s3:*"]
        Resource = [
          "${aws_s3_bucket.web_bucket.arn}",
          "${aws_s3_bucket.web_bucket.arn}/*",
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "code_deploy_pol_attm" {
  role       = aws_iam_role.web_cd_role.name
  policy_arn = aws_iam_policy.code_deploy_policy.arn
}

resource "aws_iam_role_policy_attachment" "tf_backend_pol_attm" {
  role       = aws_iam_role.web_cd_role.name
  policy_arn = var.tf_backend_policy_arn
}

output "web_cd_role_arn" {
  value = aws_iam_role.web_cd_role.arn
}
