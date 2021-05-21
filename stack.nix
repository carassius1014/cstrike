{ }:
let
  pkgs = import ./nix/pkgs.nix;
  grpc-pkgs = import ./nix/grpc.nix;
in with pkgs;
with grpc-pkgs;
haskell.lib.buildStackProject {
  name = "cstrike";
  ghc = pkgs.haskell.compiler.ghc8104;
  buildInputs = [ grpc zlib ];
}
