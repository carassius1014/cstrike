{ }:

let
  pkgs = import ./nix/pkgs.nix;
  nodejs = import ./nix/nodejs.nix;
  yarn = import ./nix/yarn.nix;
in pkgs.mkShell {
  buildInputs = [
    nodejs
    pkgs.haskell.packages.ghc8104.brittany
    pkgs.heroku
    pkgs.niv
    pkgs.nixfmt
    pkgs.stack
    yarn
  ];
}
