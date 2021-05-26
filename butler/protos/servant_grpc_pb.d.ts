// GENERATED CODE -- DO NOT EDIT!

// package: cstrike
// file: servant.proto

import * as servant_pb from "./servant_pb";
import * as prelude_pb from "./prelude_pb";
import * as grpc from "@grpc/grpc-js";

interface IServantService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getMaps: grpc.MethodDefinition<prelude_pb.Unit, servant_pb.GetMapsResponse>;
}

export const ServantService: IServantService;

export interface IServantServer extends grpc.UntypedServiceImplementation {
  getMaps: grpc.handleUnaryCall<prelude_pb.Unit, servant_pb.GetMapsResponse>;
}

export class ServantClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getMaps(argument: prelude_pb.Unit, callback: grpc.requestCallback<servant_pb.GetMapsResponse>): grpc.ClientUnaryCall;
  getMaps(argument: prelude_pb.Unit, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<servant_pb.GetMapsResponse>): grpc.ClientUnaryCall;
  getMaps(argument: prelude_pb.Unit, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<servant_pb.GetMapsResponse>): grpc.ClientUnaryCall;
}
