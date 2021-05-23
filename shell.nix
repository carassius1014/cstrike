{ }:

let
  grpc-tools = pkgs.callPackage ./nix/grpc-tools.nix { };
  pkgs = import ./nix/pkgs.nix;
  nodejs = import ./nix/nodejs.nix;
  yarn = import ./nix/yarn.nix;
in pkgs.mkShell {
  buildInputs = [
    grpc-tools
    nodejs
    pkgs.clippy
    pkgs.cargo
    pkgs.cargo-watch
    pkgs.grpcurl
    pkgs.heroku
    pkgs.niv
    pkgs.nixfmt
    pkgs.protobuf
    pkgs.rustc
    pkgs.rustfmt
    yarn
  ];

  PROTOC = "${pkgs.protobuf}/bin/protoc";
  PROTOC_INCLUDE = "${pkgs.protobuf}/include";
  RUST_SRC_PATH = "${pkgs.rust.packages.stable.rustPlatform.rustLibSrc}";
}
