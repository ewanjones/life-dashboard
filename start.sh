#!/bin/sh

rabbitmq-server &
sleep 20 &&
python services/index.py &

npm run dash
