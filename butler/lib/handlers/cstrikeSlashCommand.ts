import { App } from '@slack/bolt';

import * as ServerConfigModal from '../views/serverConfigModal';

export { handleCStrikeSlashCommand };

function handleCStrikeSlashCommand(app: App): void {
    app.command('/cstrike', async ({ ack, body, client }) => {
        await ack();
        const { trigger_id } = body;
        await client.views.open({
            trigger_id,
            view: ServerConfigModal.view,
        });
    });
}
