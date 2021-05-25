import { Do } from 'fp-ts-contrib/Do';
import * as E from 'fp-ts/Either';

import { Environment } from './env';

export { Config, parse };

interface Config {
    token: string;
    signingSecret: string;
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
        return Do(E.Monad)
            .bind('val', fromNullable(env[key]))
            .bindL('num', ({ val }) => fromNullable(parseInt(val)))
            .return(({ num }) => num);
    }

    return Do(E.Monad)
        .bind('token', parseString('SLACK_BOT_TOKEN'))
        .bind('signingSecret', parseString('SLACK_SIGNING_SECRET'))
        .bind('port', parseNumber('PORT'))
        .bind('cstrikeChannel', parseString('SLACK_CSTRIKE_CHANNEL'))
        .bind('servantHost', parseString('SERVANT_HOST'))
        .bind('servantPort', parseNumber('SERVANT_PORT'))
        .return(({ token, signingSecret, port, cstrikeChannel, servantHost, servantPort }) => {
            return {
                token,
                signingSecret,
                port,
                cstrikeChannel,
                servantHost,
                servantPort,
            };
        });
}
