{ }:

let
  pkgs = import ./nix/pkgs.nix;
  nodejs = import ./nix/nodejs.nix;
  yarn = import ./nix/yarn.nix;
in pkgs.mkShell {
  buildInputs = [
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
