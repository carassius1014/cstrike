{ }:
let pkgs = import ./nix/pkgs.nix;
in with pkgs;
haskell.lib.buildStackProject {
  ghc = pkgs.haskell.compiler.ghc8104;
  name = "cstrike";
}
