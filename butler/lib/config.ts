import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { Environment } from './env';

export { Config, parse };

interface Config {
    token: string;
    appToken: string;
    port: number;
    servantHost: string;
    servantPort: number;
    cstrikeChannel: string;
}

function parse(env: Environment): E.Either<Error, Config> {
    function buildError(key: string): Error {
        return new Error(`Unable to parse env var: ${key}`);
    }

    function parseString(key: string): E.Either<Error, string> {
        return E.fromNullable(buildError(key))(env[key]);
    }

    function parseNumber(key: string): E.Either<Error, number> {
        const fromNullable = E.fromNullable(buildError(key));
        return pipe(
            E.bindTo('val')(fromNullable(env[key])),
            E.bind('num', ({ val }) => fromNullable(parseInt(val))),
            E.map(({ num }) => num),
        );
    }

    return pipe(
        E.bindTo('token')(parseString('SLACK_BOT_TOKEN')),
        E.bind('appToken', () => parseString('SLACK_APP_TOKEN')),
        E.bind('port', () => parseNumber('PORT')),
        E.bind('cstrikeChannel', () => parseString('SLACK_CSTRIKE_CHANNEL')),
        E.bind('servantHost', () => parseString('SERVANT_HOST')),
        E.bind('servantPort', () => parseNumber('SERVANT_PORT')),
        E.map(({ token, appToken, port, cstrikeChannel, servantHost, servantPort }) => {
            return {
                token,
                appToken,
                port,
                cstrikeChannel,
                servantHost,
                servantPort,
            };
        }),
    );
}
