/*
 * This file will demonstrate how can we do cross platform integrating with gRPC
 * This file is for purpose to integrate a Client in Node with a Server in Java
 * See: https://github.com/lapth/gprc-sample-java/tree/UnaryRPC for the Server
 */

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

// The proto file
var PROTO_PATH = __dirname + "/protos/greet.proto";

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
var greet_proto = grpc.loadPackageDefinition(packageDefinition).greet;

var main = function() {
    // Create new Greet Service
    var greetClient = new greet_proto.GreetService('localhost:30000', grpc.credentials.createInsecure());
    // Create the request object
    var input = {
        greeting: {
            first_name: "Lap",
            last_name: "Tran"
        }
    };
    // Call greet function
    greetClient.greet(input, function(err, res) {
        console.log("Response: " + res.result);
    });
}

main();
