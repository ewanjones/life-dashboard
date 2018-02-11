#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: rpc_client.js num");
  process.exit(1);
}

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            // correlation id
            var corr = generateUuid();
            var num = parseInt(args[0]);

            console.log(' [x] Requesting fib(%d)', num);

            // listen for replies before sending request
            ch.consume(q.queue, function(response) {
                // check that correlation id matches before processing
                if (response.properties.correlationId == corr) {
                    // handle response here
                    console.log(' [.] Got %s', response.content.toString());
                    setTimeout(function() { conn.close(); process.exit(0) }, 500);
                }
            }, {noAck: true});

            ch.sendToQueue(
                'main',                                     // queue name
                new Buffer(num.toString()),                 // request body
                { correlationId: corr, replyTo: q.queue }   // request properties
            );
        });
    });
});

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}
