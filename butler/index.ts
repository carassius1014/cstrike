import * as Console from 'fp-ts/Console';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import * as App from './lib/app';
import * as Config from './lib/config';

function main(): void {
    pipe(
        Config.parse(process.env),
        E.match(
            (err) => {
                Console.error(err)();
            },
            async (config) => {
                const app = App.create(config);
                await app.start(config.port);
                Console.log('cstrike-butler is up!')();
            },
        ),
    );
}

main();
