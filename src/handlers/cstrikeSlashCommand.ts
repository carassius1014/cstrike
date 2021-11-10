import { App } from '../app';
import { listMaps } from '../useCases/listMaps';
import * as ServerConfigModal from '../views/serverConfigModal';

export { handle };

function handle(app: App): void {
    const { slackApp, settings } = app;

    slackApp.command('/cstrike', async ({ ack, body, client }) => {
        await ack();
        const { trigger_id } = body;

        const { pathToCstrikeMaps, pathToCzeroMaps } = settings;
        const maps = await listMaps(pathToCstrikeMaps, pathToCzeroMaps);

        await client.views.open({
            trigger_id,
            view: ServerConfigModal.buildView({ maps }),
        });
    });
}
