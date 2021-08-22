module CStrike.Maid.Handlers.Types
    ( Handler
    , runHandler
    , runDocker
    , getSettings
    , exitWithCode
    , getOrExit
    ) where

import           CStrike.Maid.Prelude

import "docker"  Docker.Client                  ( DockerT
                                                , runDockerT
                                                )
import "base"    System.Exit                    ( ExitCode(..) )

import           CStrike.Maid.App               ( App(..) )
import           CStrike.Maid.Settings          ( Settings )

type Handler = ReaderT Settings (DockerT IO)

runHandler :: forall a . App -> Handler a -> IO a
runHandler App {..} m = runDockerT (dockerClientOpts, httpHandler) $ flip runReaderT settings m

runDocker :: forall a . DockerT IO a -> Handler a
runDocker = lift

getSettings :: Handler Settings
getSettings = ask

exitWithCode :: forall a . Int -> Handler a
exitWithCode = exitWith . ExitFailure

getOrExit :: forall a e . Handler (Either e a) -> Int -> Handler a
getOrExit m code = do
    res <- m
    case res of
        Left  _ -> exitWith $ ExitFailure code
        Right a -> pure a
