import { App } from '../app';
import { stopHLDS } from '../useCases/stopHLDS';
import * as ErrorMessageBlocks from '../views/errorMessageBlocks';
import * as ServerStartSuccessfullyMessageBlocks from '../views/serverStartedSuccessfullyMessageBlocks';
import * as ServerStoppedSuccessfullyMessageBlocks from '../views/serverStoppedSuccessfullyMessageBlocks';

export { handle };

function handle(app: App): void {
    const { slackApp, settings } = app;
    const { cstrikeChannel } = settings;

    slackApp.action(ServerStartSuccessfullyMessageBlocks.serverStopActionId, async ({ ack, client }) => {
        await ack();

        try {
            await stopHLDS(app);

            await client.chat.postMessage({
                channel: cstrikeChannel,
                blocks: ServerStoppedSuccessfullyMessageBlocks.buildView(),
            });
        } catch (e) {
            const why = (e as Error).message;
            await client.chat.postMessage({
                channel: cstrikeChannel,
                blocks: ErrorMessageBlocks.buildView({ why }),
            });
        }
    });
}
