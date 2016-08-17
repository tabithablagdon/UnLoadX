#need to provide credentials to login and fix path

aws ec2 run-instances --image-id ami-b57536d5 --count 1 --instance-type t2.micro --key-name awskey1 --security-groups launch-wizard-3 --user-data file:///Users/andrewbrown/startlb.sh
