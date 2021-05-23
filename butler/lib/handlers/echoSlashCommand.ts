import { App } from '@slack/bolt';
import * as Console from 'fp-ts/Console';

export { handle };

function handle(app: App): void {
    app.command('/echo', async ({ ack, body }) => {
        await ack();
        Console.log(`Got: ${body.text}`)();
    });
}
