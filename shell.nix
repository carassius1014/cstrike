{ pkgs }:

let yarnFix = pkgs.yarn.override { nodejs = pkgs.nodejs-18_x; };

in with pkgs;

mkShell {
  buildInputs = [ nodejs-18_x nixfmt nodePackages.pm2 yarnFix ];

}
