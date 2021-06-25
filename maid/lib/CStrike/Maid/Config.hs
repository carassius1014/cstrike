module CStrike.Maid.Config
    ( Config(..)
    , parse
    ) where

import           CStrike.Maid.Prelude

import "directory" System.Directory             ( makeAbsolute )
import "base"    System.Environment             ( getEnv )

data Config = Config
    { hldsRoot :: FilePath
    , pidFile  :: FilePath
    }
    deriving stock Show

parse :: IO Config
parse = do
    hldsRoot <- getEnv' "HLDS_ROOT"
    pidFile  <- getEnv' "HLDS_PID_FILE"
    pure Config { .. }
  where
    getEnv' :: String -> IO String
    getEnv' = getEnv >=> makeAbsolute
