module CStrike.Maid.Settings
    ( Settings(..)
    , make
    ) where

import           CStrike.Maid.Prelude

import qualified "base" Data.Maybe             as Unsafe
                                                ( fromJust )
import qualified "text" Data.Text              as Text
                                                ( strip )
import "docker"  Docker.Client                  ( ContainerID
                                                , toContainerID
                                                )
import "base"    System.Environment             ( getEnv )

data Settings = Settings
    { containerID :: ContainerID
    }

make :: IO Settings
make = do
    containerID <- Unsafe.fromJust . toContainerID . Text.strip <$> readPath "CONTAINER"
    pure Settings { .. }
    where readPath = getEnv >=> readFileText
