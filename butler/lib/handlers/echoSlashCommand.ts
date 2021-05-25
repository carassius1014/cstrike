import * as Console from 'fp-ts/Console';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { App } from '../app';

export { handle };

function handle(app: App): void {
    const { slackApp, servantClient } = app;
    slackApp.command('/echo', async ({ ack, body, client }) => {
        await ack();
        const emsg = await servantClient.echo(body.text);

        pipe(
            emsg,
            E.match(
                (err) => {
                    Console.error(err)();
                },
                async (message) => {
                    await client.chat.postMessage({
                        channel: body.user_id,
                        text: message,
                    });
                },
            ),
        );
    });
}
