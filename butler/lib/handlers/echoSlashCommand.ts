import { App } from '../app';

export { handle };

function handle(app: App): void {
    const { slackApp } = app;
    slackApp.command('/echo', async ({ ack, body, client }) => {
        await ack();
        await client.chat.postMessage({
            channel: body.channel_id,
            text: body.text,
        });
    });
}
