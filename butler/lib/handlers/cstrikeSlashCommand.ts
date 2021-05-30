import * as Console from 'fp-ts/Console';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { App } from '../app';
import * as ServerConfigModal from '../views/serverConfigModal';

export { handle };

function handle(app: App): void {
    const { slackApp, grpcClient } = app;

    slackApp.command('/cstrike', async ({ ack, body, client }) => {
        await ack();
        const { trigger_id } = body;

        const emaps = await grpcClient.servantService.getMaps();

        pipe(
            emaps,
            E.match(
                (err) => {
                    Console.error(err)();
                },
                async (maps) => {
                    await client.views.open({
                        trigger_id,
                        view: ServerConfigModal.buildView(maps),
                    });
                },
            ),
        );
    });
}
