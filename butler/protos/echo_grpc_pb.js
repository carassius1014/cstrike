// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var protos_echo_pb = require('../protos/echo_pb.js');

function serialize_servant_EchoRequest(arg) {
  if (!(arg instanceof protos_echo_pb.EchoRequest)) {
    throw new Error('Expected argument of type servant.EchoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_servant_EchoRequest(buffer_arg) {
  return protos_echo_pb.EchoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_servant_EchoResponse(arg) {
  if (!(arg instanceof protos_echo_pb.EchoResponse)) {
    throw new Error('Expected argument of type servant.EchoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_servant_EchoResponse(buffer_arg) {
  return protos_echo_pb.EchoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var EchoService = exports.EchoService = {
  echo: {
    path: '/servant.Echo/Echo',
    requestStream: false,
    responseStream: false,
    requestType: protos_echo_pb.EchoRequest,
    responseType: protos_echo_pb.EchoResponse,
    requestSerialize: serialize_servant_EchoRequest,
    requestDeserialize: deserialize_servant_EchoRequest,
    responseSerialize: serialize_servant_EchoResponse,
    responseDeserialize: deserialize_servant_EchoResponse,
  },
};

exports.EchoClient = grpc.makeGenericClientConstructor(EchoService);
