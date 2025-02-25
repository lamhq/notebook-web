variable "api_domain" {
  type        = string
  description = "Domain name of the API service"
}

variable "cloudfront_domain" {
  type        = string
  description = "Domain name corresponding to the CloudFront distribution"
}

variable "acm_certificate_arn" {
  type        = string
  description = "ARN of the AWS Certificate Manager certificate that is used with CloudFront custom domain"
}

locals {
  web_origin_id = "webOrigin"
  api_origin_id = "apiOrigin"
}

resource "aws_cloudfront_distribution" "web_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"
  aliases             = [var.cloudfront_domain]

  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  # S3 origin (web)
  origin {
    origin_id                = local.web_origin_id
    origin_path              = "/build"
    domain_name              = aws_s3_bucket.web_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id
  }

  # Amazon API Gateway origin (api)
  origin {
    origin_id   = local.api_origin_id
    origin_path = "/v1"
    domain_name = var.api_domain
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.web_origin_id
    compress               = true
    viewer_protocol_policy = "allow-all"
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
    # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html#managed-cache-caching-optimized

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.spa_route_rewrite.arn
    }
  }

  # disable cache for default root object
  ordered_cache_behavior {
    path_pattern           = "/"
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["HEAD", "GET"]
    target_origin_id       = local.web_origin_id
    compress               = true
    viewer_protocol_policy = "allow-all"
    cache_policy_id        = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # CachingDisabled
  }

  # route request to backend API
  ordered_cache_behavior {
    path_pattern             = "/api/*"
    allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["HEAD", "GET"]
    target_origin_id         = local.api_origin_id
    compress                 = true
    viewer_protocol_policy   = "https-only"
    cache_policy_id          = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # CachingDisabled
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac" # AllViewerExceptHostHeader

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.remove_api_prefix.arn
    }
  }
}

resource "aws_cloudfront_origin_access_control" "s3_oac" {
  name                              = "access-web-bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "spa_route_rewrite" {
  name    = "spa-uri-rewrite"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrite any requests that do not include a file extension to `/index.html`"
  publish = true
  code    = <<EOF
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (!uri.includes('.')) {
    request.uri = '/index.html';
  }

  return request;
}
EOF
}

resource "aws_cloudfront_function" "remove_api_prefix" {
  name    = "remove-api-prefix"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrite any requests that do not include a file extension to `/index.html`"
  publish = true
  code    = <<EOF
function handler(event) {
  var request = event.request;
  var uri = request.uri;
 
  // Check if the URI starts with 'api/'
  if (uri.startsWith('/api')) {
    // Remove /api
    request.uri = uri.replace(/^\/api/, '');
  }
 
  return request;
}
EOF
}

output "cloudfront_domain" {
  value       = aws_cloudfront_distribution.web_distribution.domain_name
  description = "The domain name of the CloudFront distribution"
}
