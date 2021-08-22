module CStrike.Maid.Handlers.Start
    ( run
    ) where

import           CStrike.Maid.Prelude

import "docker"  Docker.Client                  ( Container(..)
                                                , ContainerID
                                                , defaultListOpts
                                                , defaultStartOpts
                                                , listContainers
                                                , startContainer
                                                )

import           CStrike.Maid.Handlers.Types    ( Handler
                                                , exitWithCode
                                                , getOrExit
                                                , getSettings
                                                , runDocker
                                                )
import           CStrike.Maid.Settings          ( Settings(..) )

run :: Handler ()
run = do
    Settings { containerID } <- getSettings
    running                  <- isContainerRunning containerID
    when running $ exitWithCode 11
    (runDocker $ startContainer defaultStartOpts containerID) `getOrExit` 33
  where
    isContainerRunning :: ContainerID -> Handler Bool
    isContainerRunning hldsContainerID = do
        containers <- (runDocker $ listContainers defaultListOpts) `getOrExit` 22
        let runningContainer = find (\Container { containerId } -> containerId == hldsContainerID) containers
        pure $ isJust runningContainer
