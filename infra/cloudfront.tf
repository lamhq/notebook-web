locals {
  s3_origin_id = "s3Origin"
}

resource "aws_cloudfront_origin_access_control" "s3_oac" {
  name                              = "access-web-bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"

  origin {
    origin_id                = local.s3_origin_id
    origin_path              = "/build"
    domain_name              = aws_s3_bucket.project_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.s3_origin_id
    compress               = true
    viewer_protocol_policy = "allow-all"
    # CachingOptimized https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html#managed-cache-caching-optimized
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  # Cache behavior with precedence 0
  # ordered_cache_behavior {
  #   path_pattern     = "/content/immutable/*"
  #   allowed_methods  = ["GET", "HEAD", "OPTIONS"]
  #   cached_methods   = ["GET", "HEAD", "OPTIONS"]
  #   target_origin_id = local.s3_origin_id


  #   min_ttl                = 0
  #   default_ttl            = 86400
  #   max_ttl                = 31536000
  #   compress               = true
  #   viewer_protocol_policy = "redirect-to-https"
  # }

}
