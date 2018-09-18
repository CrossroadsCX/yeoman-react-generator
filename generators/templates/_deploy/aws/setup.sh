#!/bin/bash
aws s3 mb s3://<%= bucketName %>
aws s3 website s3://<%= bucketName %> --index-document index.html
aws s3api put-bucket-policy --bucket <%= bucketName %> --policy file://./policies/website.json
