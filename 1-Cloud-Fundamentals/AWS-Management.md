# AWS Management
## Cloud Trail
Cloud Trail allows you to audit (or review) everything that occurs in your AWS account. Cloud Trail does this by recording all the AWS API calls occurring in your account and delivering a log file to you.

> [AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html) is a service that captures _every_ event occurred in your account, in the form of logs, for review and analysis. These logs can be stored in Amazon S3 buckets or delivered to Amazon CloudWatch logs, which helps you to set alarms and take appropriate actions.

### Features
CloudTrail provides event history of your AWS account activity, including:

-   who has logged in
-   services that were accessed
-   actions performed
-   parameters for the actions
-   responses returned

This includes actions taken through the AWS Management Console, AWS SDKs, command line tools, and other AWS services.

### Tips
-   Cloud Trail is found under the Management & Governance section on the AWS Management Console.
-   CloudTrail shows results for the last 90 days.
-   You can create up to five trails in an AWS region.

## CloudWatch
Cloud Watch is a service that monitors resources and applications that run on AWS by collecting data in the form of logs, metrics, and events.

CloudWatch to detect anomalous behavior in your environments, set alarms, visualize logs and metrics side by side, take automated actions, troubleshoot issues, and discover insights to keep your applications  
running smoothly.

### Rules
Rules route events from your AWS resources for processing by selected targets.

### Features
There are several useful features:
-   Collect and track metrics
-   Collect and monitor log files
-   Set alarms and create triggers to run your AWS resources
-   React to changes in your AWS resources

### Tips
-   CloudWatch is found under the Management & Governance section on the AWS Management Console.
-   Metrics are provided automatically for a number of AWS products and services.

## Infrastructure as Code
Infrastructure as Code allows you to describe and provision all the infrastructure resources in your cloud environment. You can stand up servers, databases, runtime parameters, resources, etc. based on scripts that you write. Infrastructure as Code is a time-saving feature because it allows you to provision (or stand up) resources in a reproducible way.

###  Cloud Formation
AWS Cloud Formation is AWS's infrastructure as code service. It allows you to model your entire infrastructure in a text file template allowing you to provision AWS resources based on the scripts you write.

### Tips
-   Cloud Formation is found under the Management & Governance section on the AWS Management Console.
-   Cloud Formation templates are written using JSON or YAML.
-   You can still individually manage AWS resources that are part of a CloudFormation stack.


## Resources
### CloudWatch
-   [AWS CloudWatch Overview](https://aws.amazon.com/cloudwatch/)
-   [What is Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)

### Cloud Formation
-   [AWS CloudFormation Overview](https://aws.amazon.com/cloudformation/)
-   [What is AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)