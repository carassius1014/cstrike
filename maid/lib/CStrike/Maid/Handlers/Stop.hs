module CStrike.Maid.Handlers.Stop
    ( run
    ) where

import           CStrike.Maid.Prelude

import "docker"  Docker.Client                  ( Container(..)
                                                , ContainerID
                                                , Timeout(DefaultTimeout)
                                                , defaultListOpts
                                                , listContainers
                                                , stopContainer
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
    unless running $ exitWithCode 44
    (runDocker $ stopContainer DefaultTimeout containerID) `getOrExit` 55
  where
    isContainerRunning :: ContainerID -> Handler Bool
    isContainerRunning hldsContainerID = do
        containers <- (runDocker $ listContainers defaultListOpts) `getOrExit` 22
        let runningContainer = find (\Container { containerId } -> containerId == hldsContainerID) containers
        pure $ isJust runningContainer
