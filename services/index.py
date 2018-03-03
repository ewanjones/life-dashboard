#!/usr/bin/env python
import pika
import json

# establish connection, channel and queue
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='main')


def fib():
    return {'message': 'hello world'}

def on_request(ch, method, props, body):
    request = json.loads(body)

    response = fib()

    # publish response
    ch.basic_publish(
        exchange='',
        routing_key=props.reply_to,
        properties=pika.BasicProperties(correlation_id = props.correlation_id),
        body=json.dumps(response)
    )

    # acknowledge delivery
    ch.basic_ack(delivery_tag = method.delivery_tag)


# wait for responses on channel
channel.basic_qos(prefetch_count=1)
channel.basic_consume(on_request, queue='main')

print("Python server listening..")
channel.start_consuming()
