# Networking and Elasticity
## Route 53
Route 53 is a cloud domain name system (DNS) service that has servers distributed around the globe used to translates human-readable names like  [www.google.com](http://www.google.com/)  into the numeric IP addresses like 74.125.21.147.

### Features
-   scales automatically to manage spikes in DNS queries
-   allows you to register a domain name (or manage an existing)
-   routes internet traffic to the resources for your domain
-   checks the health of your resources

### Tips
-   Route 53 is found under the Networking & Content Delivery section on the AWS Management Console.
-   Route 53 allows you to route users based on the user’s geographic location.

## Elasticity in the Cloud
One of the main benefits of the cloud is that it allows you to stop guessing about capacity when you need to run your applications. With elasticity, your servers, databases, and application resources can automatically scale up or scale down based on load.

Resources can scale up (or vertically). In Amazon EC2, this can easily be achieved by stopping an instance and resizing it to an instance type that has more RAM, CPU, IO, or you can scale out (or horizontally), which increases the number of resources. An example would be adding more servers.

## EC2 Auto Scaling
EC2 Auto Scaling is a service that monitors your EC2 instances and automatically adjusts by adding or removing EC2 instances based on conditions you define in order to maintain application availability and provide peak performance to your users. You configure settings for a group and its instances as well as define the group’s minimum, maximum, and desired capacity. Setting different minimum and maximum capacity values forms the bounds of the group, which allows the group to scale as the load on your application spikes higher or lower, based on demand. 

### Features
-   Automatically scale in and out based on needs.
-   Included automatically with Amazon EC2.
-   Automate how your Amazon EC2 instances are managed.

### Tips
-   EC2 Auto Scaling is found on the EC2 Dashboard.
-   EC2 Auto Scaling adds instances only when needed, optimizing cost savings.
-   EC2 predictive scaling removes the need for manual adjustment of auto scaling parameters over time.

## Creating and Visualizing Auto Scaling Groupe
### 1. Select an Auto Scaling Group
Go to the EC2 Dashboard and select the  **Auto Scaling Groups**  service from the left navigation pane. Select an Auto Scaling Group which has already been created.

![](Select-an-Auto-Scaling-Group.png)

Snapshot: Select an Auto Scaling Group

### 2. View Details of the Selected Auto Scaling Group
Once you select an Auto Scaling Group, you can view further details, as shown in the snapshots below.

![](details-autoscaling-group.png)

Snapshot: Details of an Auto Scaling group

### 3. Launch template
> A Launch Template specifies instance configuration information, such as, the ID of the Amazon Machine Image (AMI), the instance type, a key pair, security groups, and the other parameters that will be used to launch EC2 instances.

View the Launch template used in the current Auto Scaling group. In the snapshot below, we have the following configuration:

-   `Amazon Linux 2`  AMI
-   `t2.nano`  instance type
-   An existing key pair to log in to the EC2 instances. We have kept the rest of the other things as default.

![](launch-template.png)

Snapshot: The Launch template used in the current group

### 4. Activity
On the activity tab, the Status column shows the current status of your instances. In the snapshot below, notice that we have a list showing that one instance was created initially, and later it was terminated. Consequently, the auto scaling group has automatically spun up a new instance.

While your instance is launching, the status column shows  **In progress**. The status changes to  **successful**  after the instances are launched.

You can also use the "Refresh" button to see the current status of your instances.

![](activity.png)

Snapshot: Activity history

### 5. Auto Scaling
Scaling policies allow you to dynamically scale your Amazon EC2 capacity automatically, based on demand. You can create and add either a step /simple/target scaling policy.

![](auto-scaling.png)

Snapshot: View/add policies for the current group

### 6. Instances Management
View the list of instances running as part of the current group. In the snapshot below, you can see that your autoscaling group has launched your EC2 instance and that it is  _InService_. Similarly, you can view other details, such as AZs, and the health status of each instance.

![](instances-management.png)

Snapshot: List of instances in the current group

### 7. Instance refresh
An instance refresh allows you to trigger a rolling replacement of all previously launched instances in the Auto Scaling group with a new group of instances.

## Elastic Load Balancing
Elastic Load Balancing automatically distributes incoming application traffic across multiple servers.

Elastic Load Balancer is a service that:
-   Balances load between two or more servers
-   Stands in front of a web server
-   Provides redundancy and performance

### Tips
-   Elastic Load Balancing can be found on the EC2 Dashbaoard.
-   Elastic Load Balancing works with EC2 Instances, containers, IP addresses, and Lambda functions.
-   You can configure Amazon EC2 instances to only accept traffic from a load balancer.

### ALB vs NLB vs CLB
1.  **Application Load Balancer**  (ALB)  
    A simple use case: Assume you are running a microservices-architecture based application. An  [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)  allows you to host the different API endpoints of your application on different servers. The load balancer then redirects the incoming HTTP/HTTP traffic to the suitable server based on the rules you specify in the configuration.
    
    If you choose this option, you will be taken to a six-step process:    
    1.  Configure Load Balancer
    2.  Configure Security Settings
    3.  Configure Security Groups
    4.  Configure Routing
    5.  Register Targets
    6.  Review

2.  **Network Load Balancer** (NLB)  
    A  [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html)  helps to balance the load on each individual server. Having an NLB becomes essential when your application requires handling millions of requests per second securely while maintaining ultra-low latencies.
    
    This option has a five-step process:    
    1.  Configure Load Balancer
    2.  Configure Security Settings
    3.  Configure Routing
    4.  Register Targets
    5.  Review

**Classic Load Balancer**  (CLB)  
It is a previous generation option. You can choose a  [Classic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html)  when you have an existing application running in the EC2-Classic network. 

This option has a five-step process:    
1.  Define Load Balancer
2.  Assign Security Groups
3.  Configure Security Settings
4.  Configure Health Check
5.  Add EC2 Instances
6.  Add Tags
7.  Review

## Redundancy vs Performance [Extra]
### Redundancy
Def: If you lose a server, the load balancer will send requests to other working servers. This feature maintains continuous operations in an emergency.

### Performance
If a server starts having issues or bottlenecks, the load balancer will add more servers to the pool of available servers. Auto scaling automatically adjusts capacity to maintain a steady state.

## Resources
### Route 53
-   [Amazon Route 53 Overview](https://aws.amazon.com/route53/)

### EC2 Auto Scaling
-   [Amazon EC2 Autoscaling Overview](https://aws.amazon.com/ec2/autoscaling/)
-   [What is Amazon EC2 Autoscaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
