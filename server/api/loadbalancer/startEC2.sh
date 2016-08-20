#!/bin/bash

#start an instance, storing the output in awscli*.log
aws ec2 run-instances --image-id ami-b57536d5 --count 1 --instance-type t2.micro --key-name awskey1 --security-groups launch-wizard-3 --user-data file:///Users/tabithablagdon/Documents/coding/hackreactor/projects/unloadx/server/api/loadbalancer/startlb.sh > /Users/tabithablagdon/Documents/coding/hackreactor/projects/unloadx/server/api/loadbalancer/lb-ips/awscli$AWSCLICOUNTER.log

# extract reservation id and use it to get public ip
resId=$(cat /Users/tabithablagdon/Documents/coding/hackreactor/projects/unloadx/server/api/loadbalancer/lb-ips/awscli$AWSCLICOUNTER.log | grep ReservationId)
resId=${resId:22}
resId=${resId::${#resId}-3}

# store ip in file and start node
aws ec2 describe-instances --filters "Name=reservation-id,Values=$resId" --query 'Reservations[0].Instances[0].[PublicIpAddress]' > /Users/tabithablagdon/Documents/coding/hackreactor/projects/unloadx/server/api/loadbalancer/lb-ips/lbgen$AWSCLICOUNTER.txt

# print to stdout to resolve the API server promise this script is inside of
echo $(/Users/tabithablagdon/Documents/coding/hackreactor/projects/unloadx/server/api/loadbalancer/lb-ips/lbgen$AWSCLICOUNTER.txt)

#increment the environment variable
AWSCLICOUNTER=$((AWSCLICOUNTER + 1))

# /home/ec2-user/prod/unloadx/server/api/loadbalancer/lb-ips/
