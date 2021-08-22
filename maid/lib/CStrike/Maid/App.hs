module CStrike.Maid.App
    ( App(..)
    , make
    ) where

import           CStrike.Maid.Prelude

import "docker"  Docker.Client                  ( DockerClientOpts
                                                , HttpHandler
                                                , defaultClientOpts
                                                , unixHttpHandler
                                                )

import           CStrike.Maid.Settings          ( Settings )
import qualified CStrike.Maid.Settings         as Settings
                                                ( make )

data App = App
    { settings         :: Settings
    , dockerClientOpts :: DockerClientOpts
    , httpHandler      :: HttpHandler IO
    }

make :: IO App
make = do
    settings <- Settings.make
    let dockerClientOpts = defaultClientOpts
    httpHandler <- unixHttpHandler "/run/docker.sock" -- TODO: pass socket as environment variable
    pure App { .. }
