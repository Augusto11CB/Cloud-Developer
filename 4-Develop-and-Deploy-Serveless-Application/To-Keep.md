## Creating DynamoDB Table
1. Table name: "Groups"
2. Primary key: "Particion key"
	- name: "id" 
	- type: "string"
3. Unmark **Use default Settings**
4. Read/write capacity mode: "On-demand"
5. Encryption At Rest: "Default"

## Enable CORS in API Gateway
- Go to the combo box "Actions"
- Next, go to Enable CORS options

## Lambda Function Get-Groups
- Define environment variable
	- NAME: "GROUPS_TABLE"
	- VALUE: "Groups"
- Add permissions to get data from DynamoDB
	- Go to "Execution role" and click in the link "view the lambda-id-blabla role" to go to the IAM console
	- Click on the policy of the function (tab permissions, maybe it is the unique policy available)
	- Click button Edit policy 
	```
	{
		"Version": "2012-10-17"
		"Statement": [
			{
				"Effect": "Allow",
				"Action": "logs:CreateLogGroup",
				"Resource": "arn:aws:logs:us-east-1:9132342342:*"
			},
			{
				"Effect": "Allow",
				"Action": [
					"logs:CreateLogStream",
					"logs:PutLogEvents"
				],
				"Resources": [
					"arn:aws:logs:us-east-1:9132342342:log-group:/aws/lambda/get-groups:*"		
				]
			},
			{
				"Effect": "Allow",
				"Action": [
					"dynamodb:Scan"
				],
				"Resources": [
					"arn:aws:dynamodb:us-east-1:*:table/Groups"
				]
			}
		]
	}
	```

```js
const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = process.env.GROUPS_TABLE // Environment variable

exports.handler = async (event) => {

	const result = await doClient.scan({ // Call Parameters
			TableName: groupsTable,
	}).promise()

	const items = result.Items

	return {
		statusCode:200,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		body: JSON.stringify({
			items: items 
			// items // or just put intems that it will do fine 
		})
	}

};

```

## Install Serverless Framework and Setup User on AWS
### Install Serverless 
1. `npm install -g serverless`

### Setup Serverless Framework User on AWS 
1. Go to IAM
2. Create a new user
	- Check the option programmatic access 
	- Attach AdministratorAccess policty
3. In the console `sls config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY --profile serverless`


### Validation Request Plugins
```
npm install serverless-aws-documentation serverless-reqvalidator-plugin --save-dev
```

## Presigned URL
```
const s3 = new AWS.S3({
   signatureVersion: 'v4' // Use Sigv4 algorithm
 })
 const presignedUrl = s3.getSignedUrl('putObject', { // The URL will allow to perform the PUT operation
   Bucket: 's3-bucket-name', // Name of an S3 bucket
   Key: 'object-id', // id of an object this URL allows access to
   Expires: '300'  // A URL is only valid for 5 minutes
 })
```

## How To Test WebSocket Connections
Tool: WebSocket CLI client

**Install**
`npm install wscat -g`

**connect**
```
wscat -c wss://bblabla.amazonaws.com/dev
# <message><ENTER> to send message
```

# DynamoDB JSON
You can read more about DynamoDB JSON  [here](http://bit.ly/dynamo-db-json).