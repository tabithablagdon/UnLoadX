#!/bin/bash

docker pull aeb0/loadbalancer && docker run -p 9000:9000 -p 9090:9090 -d aeb0/loadbalancer go run lbserver.go > /home/ec2-user/startup.log
