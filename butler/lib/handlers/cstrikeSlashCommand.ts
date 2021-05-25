import { App } from '../app';
import * as ServerConfigModal from '../views/serverConfigModal';

export { handle };

function handle(app: App): void {
    const { slackApp } = app;
    slackApp.command('/cstrike', async ({ ack, body, client }) => {
        await ack();
        const { trigger_id } = body;
        await client.views.open({
            trigger_id,
            view: ServerConfigModal.view,
        });
    });
}
