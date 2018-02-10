#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pika

# establish connection and chanel
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare queue
# This is the channel on which communications will be held
channel.queue_declare(queue='main')

# Pubish message
channel.basic_publish(exchange='',
                      routing_key='main',   # this is the chanel name
                      body='Hello World!')  # message
# Log the message in the console
print(" [x] Sent 'Hello World!'")

# always close the connection
connection.close()
