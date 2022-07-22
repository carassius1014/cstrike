import * as Console from 'fp-ts/Console';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import * as App from './app';
import * as Settings from './settings';

function main(): void {
    pipe(
        Settings.make(process.env),
        E.match(
            (err) => {
                Console.error(err)();
            },
            async (settings) => {
                const app = await App.make(settings);
                await app.slackApp.start(settings.port);
                Console.log('cstrike-slack is up!')();
            },
        ),
    );
}

main();
