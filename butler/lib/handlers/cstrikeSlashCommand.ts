import { App } from '../app';
import { listMaps } from '../useCases/listMaps';
import * as ServerConfigModal from '../views/serverConfigModal';

export { handle };

function handle(app: App): void {
    const { slackApp } = app;

    slackApp.command('/cstrike', async ({ ack, body, client }) => {
        await ack();
        const { trigger_id } = body;

        const maps = listMaps();

        await client.views.open({
            trigger_id,
            view: ServerConfigModal.buildView({ maps }),
        });
    });
}
