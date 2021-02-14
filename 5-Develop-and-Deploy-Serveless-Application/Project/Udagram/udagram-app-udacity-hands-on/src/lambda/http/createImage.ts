import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'
import * as middy from 'middy'
// import { cors } from 'middy/middlewares'



const docClient = new AWS.DynamoDB.DocumentClient()
const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const groupsTable = process.env.GROUPS_TABLE
const imagesTable = process.env.IMAGES_TABLE
const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const groupId = event.pathParameters.groupId
  const validGroupId = await groupExists(groupId)

  if (!validGroupId) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Group does not exist'
      })
    }
  }

  const imageId = uuid.v4()
  const newItem = await createImage(groupId, imageId, event)

  const url = getUploadUrl(imageId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
})

// handler.use(
//   cors({
//     credentials: true
//   })
// )

async function groupExists(groupId: string) {
  const result = await docClient
    .get({
      TableName: groupsTable,
      Key: {
        id: groupId
      }
    })
    .promise()

  console.log('Get group: ', result)
  return !!result.Item
}

async function createImage(groupId: string, imageId: string, event: any) {
  const timestamp = new Date().toISOString()
  const newImage = JSON.parse(event.body)

  const newItem = {
    groupId,
    timestamp,
    imageId,
    ...newImage,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`
  }
  console.log('Storing new item: ', newItem)

  await docClient
    .put({
      TableName: imagesTable,
      Item: newItem
    })
    .promise()

  return newItem
}

function getUploadUrl(imageId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: urlExpiration
  })
}

// custom:
//   documentation:
//     api:
//       info:
//         version: v1.0.0
//         title: Udagram API
//         description: Serverless application for images sharing
//     models:
//       - name: ImageRequest
//         contentType: application/json
//         schema: ${file(models/create-image-request.json)}

// # Function
// CreateImage:
// handler: src/lambda/http/createImage.handler
// events:
//   - http:
//       method: post
//       path: groups/{groupId}/images
//       cors: true
//       reqValidatorName: RequestBodyValidator
//       documentation:
//         summary: Create a new image
//         description: Create a new image
//         requestModels:
//           'application/json': ImageRequest

// # Resources
// AttachmentsBucket:
// Type: AWS::S3::Bucket
// DeletionPolicy: Retain
// #DependsOn: SNSTopicPolicy
// Properties:
//   BucketName: ${self:provider.environment.IMAGES_S3_BUCKET}
//   #NotificationConfiguration:
//     #TopicConfigurations:
//       #- Event: s3:ObjectCreated:Put
//         #Topic: !Ref ImagesTopic
//   CorsConfiguration:
//     CorsRules:
//       -
//         AllowedOrigins:
//           - '*'
//         AllowedHeaders:
//           - '*'
//         AllowedMethods:
//           - GET
//           - PUT
//           - POST
//           - DELETE
//           - HEAD
//         MaxAge: 3000

// BucketPolicy: # Allows anyone to get images from the bucket without be logged in
// Type: AWS::S3::BucketPolicy
// Properties:
//   PolicyDocument:
//     Id: MyPolicy
//     Version: "2012-10-17"
//     Statement:
//       - Sid: PublicReadForGetBucketObjects
//         Effect: Allow
//         Principal: '*'
//         Action: 's3:GetObject'
//         Resource: 'arn:aws:s3:::${self:provider.environment.IMAGES_S3_BUCKET}/*'
//   Bucket: !Ref AttachmentsBucket

// # iamRoleStatements
// - Effect: Allow
// Action:
//   - dynamodb:Query
//   - dynamodb:PutItem
// Resource: arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.IMAGES_TABLE}

// - Effect: Allow
// Action: # generate a presigned url
//   - s3:PutObject
//   - s3:GetObject
// Resource: arn:aws:s3:::${self:provider.environment.IMAGES_S3_BUCKET}/*