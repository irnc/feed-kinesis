provider "aws" {
  region = "eu-west-1"
}

variable "feed-kinesis-base-name" {
  default = "feed-kinesis-test"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.feed-kinesis-base-name}"
  acl = "private"
}

resource "aws_iam_role" "firehose_role" {
   name = "${var.feed-kinesis-base-name}-role"
   assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "firehose.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_kinesis_firehose_delivery_stream" "test_stream" {
  name = "${var.feed-kinesis-base-name}-stream"
  destination = "s3"
  s3_configuration {
    role_arn = "${aws_iam_role.firehose_role.arn}"
    bucket_arn = "${aws_s3_bucket.bucket.arn}"
  }
}
