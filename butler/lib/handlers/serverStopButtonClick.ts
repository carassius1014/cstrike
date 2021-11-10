import * as Console from 'fp-ts/Console';

import { App } from '../app';
import { stopHLDS } from '../useCases/stopHLDS';
import * as ErrorMessageBlocks from '../views/errorMessageBlocks';
import * as ServerStartSuccessfullyMessageBlocks from '../views/serverStartedSuccessfullyMessageBlocks';
import * as ServerStoppedSuccessfullyMessageBlocks from '../views/serverStoppedSuccessfullyMessageBlocks';

export { handle };

function handle(app: App): void {
    const { slackApp, config } = app;
    const { cstrikeChannel } = config;

    slackApp.action(ServerStartSuccessfullyMessageBlocks.serverStopActionId, async ({ ack, client }) => {
        await ack();

        try {
            const success = stopHLDS();

            if (success) {
                await client.chat.postMessage({
                    channel: cstrikeChannel,
                    blocks: ServerStoppedSuccessfullyMessageBlocks.buildView(),
                });
            } else {
                const why = 'something wrong happened!'; // TODO: get error message from use case response

                await client.chat.postMessage({
                    channel: cstrikeChannel,
                    blocks: ErrorMessageBlocks.buildView({ why }),
                });
            }
        } catch (e) {
            Console.error(e)();
        }
    });
}
