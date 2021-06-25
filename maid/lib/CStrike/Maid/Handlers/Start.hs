module CStrike.Maid.Handlers.Start
    ( handle
    ) where

import           CStrike.Maid.Prelude

import "process" System.Process                 ( CreateProcess(..)
                                                , createProcess
                                                , proc
                                                )

import           CStrike.Maid.Config            ( Config(..) )
import           CStrike.Maid.Handlers.Types    ( HandlerM )

handle :: String -> HandlerM ()
handle startMap = do
    Config {..} <- ask
    void . liftIO $ createProcess (proc
                                      "./hlds_run"
                                      [ "run"
                                      , "-game"
                                      , "czero"
                                      , "+maxplayers"
                                      , "16"
                                      , "+map"
                                      , startMap
                                      , "+mapcyclefile"
                                      , "mapcycle.txt"
                                      , "--pidfile"
                                      , pidFile
                                      , "-autoupdate"
                                      , "-debug"
                                      ]
                                  )
        { cwd = Just hldsRoot
        }
