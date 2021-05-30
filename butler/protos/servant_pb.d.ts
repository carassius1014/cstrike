// package: cstrike
// file: servant.proto

import * as jspb from "google-protobuf";
import * as prelude_pb from "./prelude_pb";

export class GetMapsResponse extends jspb.Message {
  clearMapsList(): void;
  getMapsList(): Array<string>;
  setMapsList(value: Array<string>): void;
  addMaps(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMapsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMapsResponse): GetMapsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMapsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMapsResponse;
  static deserializeBinaryFromReader(message: GetMapsResponse, reader: jspb.BinaryReader): GetMapsResponse;
}

export namespace GetMapsResponse {
  export type AsObject = {
    mapsList: Array<string>,
  }
}

export class StartServerRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  clearPlayersList(): void;
  getPlayersList(): Array<string>;
  setPlayersList(value: Array<string>): void;
  addPlayers(value: string, index?: number): string;

  clearMapsList(): void;
  getMapsList(): Array<string>;
  setMapsList(value: Array<string>): void;
  addMaps(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartServerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StartServerRequest): StartServerRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartServerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartServerRequest;
  static deserializeBinaryFromReader(message: StartServerRequest, reader: jspb.BinaryReader): StartServerRequest;
}

export namespace StartServerRequest {
  export type AsObject = {
    name: string,
    password: string,
    playersList: Array<string>,
    mapsList: Array<string>,
  }
}

export class StartServerResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorMessage(): string;
  setErrorMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartServerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StartServerResponse): StartServerResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartServerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartServerResponse;
  static deserializeBinaryFromReader(message: StartServerResponse, reader: jspb.BinaryReader): StartServerResponse;
}

export namespace StartServerResponse {
  export type AsObject = {
    success: boolean,
    errorMessage: string,
  }
}

