{-# LANGUAGE DeriveAnyClass #-}

module CStrike.Maid.Command
    ( Command(..)
    , parse
    ) where

import           CStrike.Maid.Prelude

import "optparse-generic" Options.Generic       ( ParseRecord
                                                , getRecord
                                                )

data Command
    = Start
    | Stop
    deriving stock Generic
    deriving stock Show
    deriving anyclass ParseRecord

parse :: IO Command
parse = getRecord ""
