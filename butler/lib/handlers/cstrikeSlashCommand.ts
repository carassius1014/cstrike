import { App } from '@slack/bolt';

export { handleCStrikeSlashCommand };

function handleCStrikeSlashCommand(app: App): void {
    app.command('/cstrike', async ({ ack, body, client }) => {
        await ack();
        await client.chat.postMessage({
            channel: body.user_id,
            text: 'You triggered "/cstrike".',
        });
    });
}
