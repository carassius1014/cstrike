import { Do } from 'fp-ts-contrib/Do';
import * as E from 'fp-ts/Either';

import { Environment } from './env';

export { Config, Error, parse };

interface Error {
    type: 'config';
    message: string;
}

interface Config {
    token: string;
    signingSecret: string;
    port: number;
}

function parse(env: Environment): E.Either<Error, Config> {
    function parseString(key: string): E.Either<Error, string> {
        const val = env[key];
        return val === undefined ? E.left({ type: 'config', message: `cannot parse env var: ${key}` }) : E.right(val);
    }

    function parseNumber(key: string): E.Either<Error, number> {
        const val = env[key];
        if (val === undefined) {
            return E.left({ type: 'config', message: `cannot parse env var: ${key}` });
        }
        const num = parseInt(val);
        return num === undefined
            ? E.left({ type: 'config', message: `cannot parse env var: ${key} as a number` })
            : E.right(num);
    }

    return Do(E.Monad)
        .bind('token', parseString('SLACK_BOT_TOKEN'))
        .bind('signingSecret', parseString('SLACK_SIGNING_SECRET'))
        .bind('port', parseNumber('PORT'))
        .return(({ token, signingSecret, port }) => {
            return {
                token,
                signingSecret,
                port,
            };
        });
}
