let
  grpc-haskell-src = builtins.fetchGit {
    url = "https://github.com/awakesecurity/gRPC-haskell";
    rev = "8525994a4fbb6768a2317d7e54fe594b8940b579";
  };
in {
  grpc-haskell =
    (import "${grpc-haskell-src}/release.nix").grpc-haskell-no-tests;
  grpc = (import "${grpc-haskell-src}/release.nix").grpc;
}
