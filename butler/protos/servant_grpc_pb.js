// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var servant_pb = require('./servant_pb.js');
var prelude_pb = require('./prelude_pb.js');

function serialize_cstrike_GetMapsResponse(arg) {
  if (!(arg instanceof servant_pb.GetMapsResponse)) {
    throw new Error('Expected argument of type cstrike.GetMapsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cstrike_GetMapsResponse(buffer_arg) {
  return servant_pb.GetMapsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cstrike_StartServerRequest(arg) {
  if (!(arg instanceof servant_pb.StartServerRequest)) {
    throw new Error('Expected argument of type cstrike.StartServerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cstrike_StartServerRequest(buffer_arg) {
  return servant_pb.StartServerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cstrike_StartServerResponse(arg) {
  if (!(arg instanceof servant_pb.StartServerResponse)) {
    throw new Error('Expected argument of type cstrike.StartServerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cstrike_StartServerResponse(buffer_arg) {
  return servant_pb.StartServerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cstrike_StopServerResponse(arg) {
  if (!(arg instanceof servant_pb.StopServerResponse)) {
    throw new Error('Expected argument of type cstrike.StopServerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cstrike_StopServerResponse(buffer_arg) {
  return servant_pb.StopServerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cstrike_Unit(arg) {
  if (!(arg instanceof prelude_pb.Unit)) {
    throw new Error('Expected argument of type cstrike.Unit');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cstrike_Unit(buffer_arg) {
  return prelude_pb.Unit.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServantService = exports.ServantService = {
  getMaps: {
    path: '/cstrike.Servant/getMaps',
    requestStream: false,
    responseStream: false,
    requestType: prelude_pb.Unit,
    responseType: servant_pb.GetMapsResponse,
    requestSerialize: serialize_cstrike_Unit,
    requestDeserialize: deserialize_cstrike_Unit,
    responseSerialize: serialize_cstrike_GetMapsResponse,
    responseDeserialize: deserialize_cstrike_GetMapsResponse,
  },
  startServer: {
    path: '/cstrike.Servant/startServer',
    requestStream: false,
    responseStream: false,
    requestType: servant_pb.StartServerRequest,
    responseType: servant_pb.StartServerResponse,
    requestSerialize: serialize_cstrike_StartServerRequest,
    requestDeserialize: deserialize_cstrike_StartServerRequest,
    responseSerialize: serialize_cstrike_StartServerResponse,
    responseDeserialize: deserialize_cstrike_StartServerResponse,
  },
  stopServer: {
    path: '/cstrike.Servant/stopServer',
    requestStream: false,
    responseStream: false,
    requestType: prelude_pb.Unit,
    responseType: servant_pb.StopServerResponse,
    requestSerialize: serialize_cstrike_Unit,
    requestDeserialize: deserialize_cstrike_Unit,
    responseSerialize: serialize_cstrike_StopServerResponse,
    responseDeserialize: deserialize_cstrike_StopServerResponse,
  },
};

exports.ServantClient = grpc.makeGenericClientConstructor(ServantService);
