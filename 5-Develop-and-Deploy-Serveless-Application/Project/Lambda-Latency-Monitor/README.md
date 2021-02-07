## How to build the project
install dependencies by running the following command:

```
npm install
```

Once the dependencies are installed, you can build a .zip package that can be deployed to AWS Lambda:
```
npm run package
```

This should create a file called **http-metrics.zip**.

You would also need to set correct IAM permissions for a Lambda function to send metrics to AWS CloudWatch. You can copy an IAM policy from the **iam-policy.json** file in this project.

## Deployment
You need to deploy a .zip package.

To set **environment variables** for a function, you need to scroll to the "Environment variables" section in the AWS Lambda interface and set your variables.

## Monitor Caller
In order to get the monitor executing, you need to setup in cloudwatch an event rule to call the Latency-Monitor. You can choose the schedule that fits for your needs

## Expected result
To check if your function is correctly generating metrics go to the CloudWatch service in AWS, then go to the metrics section. If your function is generating metrics, you should be able to see a new metrics namespace:
