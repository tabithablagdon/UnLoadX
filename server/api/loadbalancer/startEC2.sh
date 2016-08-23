#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# if environment variable is set, dont actually create an instance
# just read the output from the last instance that was created
if [ $AWS == "test" ]
then
  let AWSCLICOUNTER-=1
fi

#start an instance, storing the output in awscli*.log
if [ $AWS != "test" ]
then
  aws ec2 run-instances --image-id ami-b57536d5 --count 1 --instance-type t2.micro --key-name awskey1 --security-groups launch-wizard-3 --user-data file://$DIR/awsCLI-options.sh > $DIR/lb-ips/awscli$AWSCLICOUNTER.log
fi

resId=$(cat $DIR/lb-ips/awscli$AWSCLICOUNTER.log | grep ReservationId)

resId=${resId:22}
resId=${resId::${#resId}-3}

# store ip in env variable and print to stdout
ip=$(aws ec2 describe-instances --filters "Name=reservation-id,Values=$resId" --query 'Reservations[0].Instances[0].[PublicIpAddress]')
echo $ip
#increment the environment variable
AWSCLICOUNTER=$((AWSCLICOUNTER + 1))
