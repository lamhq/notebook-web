# upload the build directory to s3, under `build/`
resource "aws_s3_object" "files" {
  for_each = fileset(local.build_dir, "**")
  bucket   = aws_s3_bucket.project_bucket.id
  key      = "build/${each.value}"
  source   = "${local.build_dir}/${each.value}"
  etag     = filemd5("${local.build_dir}/${each.value}")
}
