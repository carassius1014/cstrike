{ }:

let
  pkgs = import ./nix/pkgs.nix;
  nodejs = import ./nix/nodejs.nix;
  yarn = import ./nix/yarn.nix;
in pkgs.mkShell {
  buildInputs = [
    nodejs
    pkgs.heroku
    pkgs.niv
    pkgs.nixfmt
    yarn
  ];

}
