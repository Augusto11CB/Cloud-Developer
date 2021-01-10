# Messaging and Container
## Simple Notification Service
Amazon Simple Notification Service (or SNS) is a cloud service that allows you to send notifications to the users of your applications. SNS allows you to decouple the notification logic from being embedded in your applications and allows notifications to be published to a large number of subscribers.

### Features
-   SNS uses a publish/subscribe model.
-   SNS can publish messages to Amazon SQS queues, AWS Lambda functions, and HTTP/S webhooks.

### Tips
-   SNS is found under the Application Integration section on the AWS Management Console.
-   SNS Topic names are limited to 256 characters.
-   A notification can contain only one message.

## SQS - Simple Queue Service
Amazon Simple Queue Service (SQS) is a fully managed message queuing service that allows you to integrate queuing functionality in your application. SQS offers two types of message queues: standard and FIFO.

### Queues
A queue is a data structure that holds requests called messages. Messages in a queue are commonly processed in order, first in, first out (or FIFO).

Messaging queues improve:
-   performance
-   scalability
-   user experience
-   asynchronous processing

### Features
-   send messages
-   store messages
-   receive messages

![](sqs-work-flow.png)

### Tips
-   The Simple Queue Service (SQS) is found under the Application Integration on the AWS Management Console.
-   FIFO queues support up to 300 messages per second.
-   **FIFO queues guarantee the ordering of messages.**
-   **Standard queues offer best-effort ordering but no guarantees.**
-   Standard queues deliver a message at least once, but occasionally more than one copy of a message is delivered.
- A standard queue supports an unlimited number of transactions per second (TPS) for each API action (SendMessage, ReceiveMessage, or DeleteMessage). Whereas, FIFO queues support up to 3000 messages per second while _strictly_ preserving the message order.

### SQS - Queue Configuration
_Configuration details_  - You can set the following items:

-   _Visibility timeout_  - The time-duration (0 seconds - 12 hours) after which a  _consumer_  message can become visible to the other consumers. Generally, the consumer must process and delete a message from the queue.  
      
    
-   _Message retention period_  - The duration (1 minute - 14 days) for which the queue retains a message that does not get deleted. Amazon SQS will automatically delete messages that have been in a queue for more than the specified period.  
      
    
-   _Delivery delay_  - The time (0 seconds - 15 minutes) to intentionally delay the delivery of each (new) message added to the queue. According to AWS:
    
    > If your consumers need additional time to process messages, you must delay each new message coming to the queue.
    
-   _Maximum message size_  - It should be between 1 KB and 256 KB.

![](sqa-configuration-details.png)

## Elastic Container Service (ECS)
ECS is an orchestration service used for automating deployment, scaling, and managing of your containerized applications. ECS works well with Docker containers by:

-   launching and stopping Docker containers
-   scaling your applications
-   querying the state of your applications

### Tips
-   ECS is under the Compute section on the AWS Management Console.
-   You can schedule long-running applications, services, and batch processeses using ECS.
-   Docker is the only container platform supported by Amazon ECS.

## Resources
### Simple Notification Service
-   [Amazon SNS Overview](https://aws.amazon.com/sns/)
-   [What is Amazon SNS](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)

### SQS - Simple Queue Service
-   [Amazon SQS Overview](https://aws.amazon.com/sqs/)
-   [What is Amazon SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)