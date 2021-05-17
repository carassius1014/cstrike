let
  pkgs = import ./pkgs.nix;
  nodejs = import ./nodejs.nix;
in pkgs.yarn.override { inherit nodejs; }
