# returns a map of file extensions to content/MIME types
# https://registry.terraform.io/modules/reifnir/mime-map/null/latest
module "file_extensions" {
  source = "reifnir/mime-map/null"
}

# upload the build directory to s3, under `build/`
resource "aws_s3_object" "code_files" {
  for_each     = fileset(local.build_dir, "**")
  bucket       = aws_s3_bucket.project_bucket.id
  key          = "build/${each.value}"
  source       = "${local.build_dir}/${each.value}"
  etag         = filemd5("${local.build_dir}/${each.value}")
  content_type = lookup(module.file_extensions.mappings, split(".", each.value)[length(split(".", each.value)) - 1], "text/plain")
}
