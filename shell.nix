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
    pkgs.rustc
    pkgs.rustfmt
    yarn
  ];

  RUST_SRC_PATH = "${pkgs.rust.packages.stable.rustPlatform.rustLibSrc}";
}
