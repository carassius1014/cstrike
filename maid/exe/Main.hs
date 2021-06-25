import           CStrike.Maid.Prelude

import           CStrike.Maid.Command           ( Command(..) )
import qualified CStrike.Maid.Command          as Command
                                                ( parse )
import qualified CStrike.Maid.Config           as Config
                                                ( parse )
import qualified CStrike.Maid.Handlers.Start   as Start
                                                ( handle )
import qualified CStrike.Maid.Handlers.Stop    as Stop
                                                ( handle )

main :: IO ()
main = do
    config  <- Config.parse
    command <- Command.parse
    flip runReaderT config $ case command of
        Start startMap -> Start.handle startMap
        Stop           -> Stop.handle
