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

