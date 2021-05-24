// GENERATED CODE -- DO NOT EDIT!

// package: cstrike
// file: protos/echo.proto

import * as protos_echo_pb from "../protos/echo_pb";
import * as grpc from "@grpc/grpc-js";

interface IEchoService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  echo: grpc.MethodDefinition<protos_echo_pb.EchoRequest, protos_echo_pb.EchoResponse>;
}

export const EchoService: IEchoService;

export interface IEchoServer extends grpc.UntypedServiceImplementation {
  echo: grpc.handleUnaryCall<protos_echo_pb.EchoRequest, protos_echo_pb.EchoResponse>;
}

export class EchoClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  echo(argument: protos_echo_pb.EchoRequest, callback: grpc.requestCallback<protos_echo_pb.EchoResponse>): grpc.ClientUnaryCall;
  echo(argument: protos_echo_pb.EchoRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_echo_pb.EchoResponse>): grpc.ClientUnaryCall;
  echo(argument: protos_echo_pb.EchoRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_echo_pb.EchoResponse>): grpc.ClientUnaryCall;
}
