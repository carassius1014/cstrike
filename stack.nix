{ }:
let pkgs = import ./nix/pkgs.nix;
in with pkgs;
haskell.lib.buildStackProject {
  name = "cstrike-maid";
  ghc = pkgs.haskell.compiler.ghc8104;
  buildInputs = [ zlib ];
}
