module CStrike.Maid.Handlers.Stop
    ( handle
    ) where

import           CStrike.Maid.Prelude

import "directory" System.Directory             ( doesFileExist
                                                , removeFile
                                                )
import "base"    System.Exit                    ( ExitCode(..) )
import "process" System.Process                 ( createProcess
                                                , shell
                                                )

import           CStrike.Maid.Config            ( Config(..) )
import           CStrike.Maid.Handlers.Types    ( HandlerM )

handle :: HandlerM ()
handle = do
    Config {..}   <- ask
    pidFileExists <- liftIO $ doesFileExist pidFile
    unless pidFileExists $ exitWith (ExitFailure 88)

    void . liftIO $ createProcess $ shell "pkill -f hlds_*"
    liftIO $ removeFile pidFile
