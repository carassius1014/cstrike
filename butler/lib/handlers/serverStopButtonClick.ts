import * as Console from 'fp-ts/Console';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { App } from '../app';
import * as ErrorMessageBlocks from '../views/errorMessageBlocks';
import * as ServerStartSuccessfullyMessageBlocks from '../views/serverStartedSuccessfullyMessageBlocks';
import * as ServerStoppedSuccessfullyMessageBlocks from '../views/serverStoppedSuccessfullyMessageBlocks';

export { handle };

function handle(app: App): void {
    const { slackApp, grpcClient, config } = app;
    const { cstrikeChannel } = config;

    slackApp.action(ServerStartSuccessfullyMessageBlocks.serverStopActionId, async ({ ack, client }) => {
        await ack();

        try {
            const response = await grpcClient.servantService.stopServer();
            const res = getOrThrow(response);

            if (res.success) {
                await client.chat.postMessage({
                    channel: cstrikeChannel,
                    blocks: ServerStoppedSuccessfullyMessageBlocks.buildView(),
                });
            } else {
                await client.chat.postMessage({
                    channel: cstrikeChannel,
                    blocks: ErrorMessageBlocks.buildView({ why: res.errorMessage }),
                });
            }
        } catch (e) {
            Console.error(e)();
        }
    });
}

function getOrThrow<A>(x: E.Either<Error, A>): A {
    return pipe(
        x,
        E.match(
            (e) => {
                throw e;
            },
            (a) => a,
        ),
    );
}
