# create a random name for the bucket
resource "random_pet" "project_bucket_name" {
  prefix    = local.name_prefix
  length    = 1
  separator = "-"
}

# create an s3 bucket for the project
resource "aws_s3_bucket" "project_bucket" {
  bucket = random_pet.project_bucket_name.id
}

resource "aws_s3_bucket_policy" "my_bucket_policy" {
  bucket = aws_s3_bucket.project_bucket.id

  policy = jsonencode({
    Version = "2008-10-17",
    Id      = "PolicyForCloudFrontPrivateContent",
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal",
        Effect = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action   = "s3:GetObject",
        Resource = "${aws_s3_bucket.project_bucket.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "${aws_cloudfront_distribution.web_distribution.arn}"
          }
        }
      }
    ]
  })
}

# output the bucket name
output "bucket_name" {
  description = "The S3 bucket for storing build output"
  value       = aws_s3_bucket.project_bucket.bucket
}
