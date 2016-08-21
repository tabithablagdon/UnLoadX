#!/bin/bash

#start an instance, storing the output in awscli*.log
aws ec2 run-instances --image-id ami-b57536d5 --count 1 --instance-type t2.micro --key-name awskey1 --security-groups launch-wizard-3 --user-data file://./awsCLI-options.sh > ./lb-ips/awscli$AWSCLICOUNTER.log

# extract reservation id and use it to get public ip
resId=$(cat ./lb-ips/awscli$AWSCLICOUNTER.log | grep ReservationId)
resId=${resId:22}
resId=${resId::${#resId}-3}

# store ip in env variable and print to stdout
ip=$(aws ec2 describe-instances --filters "Name=reservation-id,Values=$resId" --query 'Reservations[0].Instances[0].[PublicIpAddress]')
echo $ip
#increment the environment variable
AWSCLICOUNTER=$((AWSCLICOUNTER + 1))
