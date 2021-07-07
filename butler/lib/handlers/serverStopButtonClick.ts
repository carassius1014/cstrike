import * as Console from 'fp-ts/Console';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { App } from '../app';
import * as ServerStartSuccessfullyMessageBlocks from '../views/serverStartedSuccessfullyMessageBlocks';

export { handle };

function handle(app: App): void {
    const { slackApp, grpcClient } = app;

    slackApp.action(ServerStartSuccessfullyMessageBlocks.serverStopActionId, async ({ ack }) => {
        await ack();

        try {
            const response = await grpcClient.servantService.stopServer();
            getOrThrow(response);
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
