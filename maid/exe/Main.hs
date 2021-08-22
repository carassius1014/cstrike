import           CStrike.Maid.Prelude

import qualified CStrike.Maid.App              as App
                                                ( make )
import           CStrike.Maid.Command           ( Command(..) )
import qualified CStrike.Maid.Command          as Command
                                                ( parse )
import qualified CStrike.Maid.Handlers.Start   as Start
                                                ( run )
import qualified CStrike.Maid.Handlers.Stop    as Stop
                                                ( run )
import           CStrike.Maid.Handlers.Types    ( runHandler )

main :: IO ()
main = do
    command <- Command.parse
    app     <- App.make
    runHandler app $ case command of
        Start -> Start.run
        Stop  -> Stop.run
