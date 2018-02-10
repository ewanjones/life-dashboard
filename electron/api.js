#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// connect to channel
// amqp.connect('amqp://localhost', function(err, conn) {
//   conn.createChannel(function(err, ch) {
//     var queue = 'main';
//
//     ch.assertQueue(queue, {durable: false});
//     // Note: on Node 6 Buffer.from(msg) should be used
//     ch.sendToQueue(q, new Buffer('Hello World!'));
//     console.log(" [x] Sent 'Hello World!'");
//   });
// });

amqp.connect('amqp://localhost', function(err, conn) {
    try {
        conn.createChannel(function(err, ch) {
            var queue = 'main';

            ch.assertQueue(queue, {durable: false});
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            ch.consume(queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, {noAck: true});
        });
    }
    catch(err) {
        console.log('Connection error: ' + err)
    }
});
