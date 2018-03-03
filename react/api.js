#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

function ajaxRequest(payload) {
    let json = JSON.stringify(payload)

    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                // correlation id
                var corr = generateUuid();
                // listen for replies before sending request
                ch.consume(q.queue, function(response) {
                    // check that correlation id matches before processing
                    if (response.properties.correlationId == corr) {
                        // handle response here
                        console.log(response.content.toString('utf8'))

                        setTimeout(function() { conn.close(); process.exit(0) }, 500);
                        return response.content.toString('utf8')
                    }
                }, {noAck: true});

                // send request
                ch.sendToQueue(
                    'main',                                     // queue name
                    new Buffer(json),                           // request body
                    { correlationId: corr, replyTo: q.queue }   // request properties
                );
            });
        });
    });
}

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}

ajaxRequest(5)
