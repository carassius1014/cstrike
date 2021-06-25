module CStrike.Maid.Handlers.Types
    ( HandlerM
    ) where

import           CStrike.Maid.Prelude

import           CStrike.Maid.Config            ( Config )

type HandlerM = ReaderT Config IO
