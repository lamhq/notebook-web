# create a random name for the bucket
resource "random_pet" "web_bucket_name" {
  prefix    = local.name_prefix
  length    = 1
  separator = "-"
}

# create an s3 bucket for the project
resource "aws_s3_bucket" "web_bucket" {
  bucket = random_pet.web_bucket_name.id
}

resource "aws_s3_bucket_policy" "web_bucket_policy" {
  bucket = aws_s3_bucket.web_bucket.id

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
        Resource = "${aws_s3_bucket.web_bucket.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "${aws_cloudfront_distribution.web_distribution.arn}"
          }
        }
      }
    ]
  })
}

output "bucket_name" {
  description = "The S3 bucket for storing files of the web app"
  value       = aws_s3_bucket.web_bucket.bucket
}
