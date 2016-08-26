### UnLoadX - Load balancing and testing tool with a performance measuring UI

## Table of Contents
1. Description
2. Instructions
3. Team
4. Tech Stack
5. Requirements
6. Installing Dependencies

## Description
UnLoadX is a load balancer that manages (balances) user-generated network traffic. The load balancer functions by receiving user-generated (GET) requests and sending the requests to their appropriate endpoint within a group of servers. The load balancer decides which server is best fit to process the request by using an algorithm that reads each server's "health" (CPU and memory). After the servers process the requests, performance metrics, including latency and request processing success rate, are displayed back to the user.

Users can use UnLoadX to test whether a group of their servers are able to handle a specified amount of network traffic. Users must provide both the number of requests (per concurrent user)to be processed by the load balancer and a list of IP address-port combinations that the load balancer can choose to send the incoming requests to. The system always assumes 15 concurrent users, so the total number of requests for the load balancer to process will be 15 X [number of entered requests]. Users also can specify (optional) path information and application type, as needed.

## Instructions
1. Navigate to http://52.9.136.53:3000.
2. If you don't already have a profile, click "LOG IN" and create a profile. Switch to the "Sign Up" tab and create a profile through either Google or Facebook or by using your email address. You will have to confirm your email address if you use your email.
3. Once you are logged in, enter in the IP/Port combination(s) you would like to test. A new IP/Port line will appear once you begin entering information into the current one. You can enter additional endpoint path information, if you wish, though this is optional. The Application Type field is used in the load balancer algorithm and is also optional.
4. After entering in all of the IP/ports you would like to test, enter in the traffic volume per concurrent user. Recall that there are 15 concurrent users so the total volume will be 15 X your entered number.
5. At the bottom of the form, you will see "Waiting for Load Balancer" until you login. If you are a first time user, you will continue to see this message until the load balancer is ready to receive your submission (may take a few minutes). Once the load balancer is ready (and you have entered in the test information above), hit the "Run Test" button.
6. After clicking the button, you will be taken to the Results page, however the results will not be ready immediately (the load balancer will still be processing the requests). Wait for the button to appear that reads "Click to See Test Results" and click it. In the meantime, you can play around with the network architecture diagram by dragging and dropping the icons.
7. View the test metrics to analyze test performance. High latency numbers indicate that the server group is likely taking a while to process the requests and additional servers may need to be added to the group to process the network traffic. Examine the server health data to determine which servers are working harder (relatively) within the group. A higher CPU level indicates that a server is doing proportionally more of the processing. A higher memory level indicates that a server has less capability to store additional incoming information. In summary, use the metrics to determine whether additional servers should be added to the group and/or specific servers within the group should be removed in order to balance the desired level of network traffic.

## Team

  - __Product Owner__: [Andy Brown](https://github.com/aebrow4)
  - __Scrum Master__: [Tabitha Blagdon](https://github.com/tabithablagdon)
  - __Development Team Members__: [James Ramadan](https://github.com/jamesramadan)

## Tech Stack
Angular 2
NVD3
Node.js & Express.js
Go

## Requirements
- Node 6.3.0
- NPM 3.10.3

### Installing Dependencies
1. Run npm install from the command line.
2. Run npm start from the command line to start up the application.

