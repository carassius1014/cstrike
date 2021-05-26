// GENERATED CODE -- DO NOT EDIT!

// package: cstrike
// file: echo.proto

import * as echo_pb from "./echo_pb";
import * as grpc from "@grpc/grpc-js";

interface IEchoService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  echo: grpc.MethodDefinition<echo_pb.EchoRequest, echo_pb.EchoResponse>;
}

export const EchoService: IEchoService;

export interface IEchoServer extends grpc.UntypedServiceImplementation {
  echo: grpc.handleUnaryCall<echo_pb.EchoRequest, echo_pb.EchoResponse>;
}

export class EchoClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  echo(argument: echo_pb.EchoRequest, callback: grpc.requestCallback<echo_pb.EchoResponse>): grpc.ClientUnaryCall;
  echo(argument: echo_pb.EchoRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<echo_pb.EchoResponse>): grpc.ClientUnaryCall;
  echo(argument: echo_pb.EchoRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<echo_pb.EchoResponse>): grpc.ClientUnaryCall;
}
