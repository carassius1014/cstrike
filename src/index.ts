import * as Console from 'fp-ts/Console';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import * as App from './app';
import * as Config from './config';

function main(): void {
    pipe(
        Config.parse(process.env),
        E.match(
            (err) => {
                Console.error(err)();
            },
            async (config) => {
                const app = App.create(config);
                await app.slackApp.start(config.port);
                Console.log('cstrike-butler is up!')();
            },
        ),
    );
}

main();
