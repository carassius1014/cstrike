// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var protos_echo_pb = require('../protos/echo_pb.js');

function serialize_cstrike_EchoRequest(arg) {
  if (!(arg instanceof protos_echo_pb.EchoRequest)) {
    throw new Error('Expected argument of type cstrike.EchoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cstrike_EchoRequest(buffer_arg) {
  return protos_echo_pb.EchoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cstrike_EchoResponse(arg) {
  if (!(arg instanceof protos_echo_pb.EchoResponse)) {
    throw new Error('Expected argument of type cstrike.EchoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cstrike_EchoResponse(buffer_arg) {
  return protos_echo_pb.EchoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var EchoService = exports.EchoService = {
  echo: {
    path: '/cstrike.Echo/Echo',
    requestStream: false,
    responseStream: false,
    requestType: protos_echo_pb.EchoRequest,
    responseType: protos_echo_pb.EchoResponse,
    requestSerialize: serialize_cstrike_EchoRequest,
    requestDeserialize: deserialize_cstrike_EchoRequest,
    responseSerialize: serialize_cstrike_EchoResponse,
    responseDeserialize: deserialize_cstrike_EchoResponse,
  },
};

exports.EchoClient = grpc.makeGenericClientConstructor(EchoService);
