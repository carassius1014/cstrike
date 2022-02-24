import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { Environment } from './env';

export { Settings, make };

interface Settings {
    token: string;
    appToken: string;
    port: number;
    pathToContainerID: string;
    cstrikeChannel: string;
    pathToCstrikeMaps: string;
    pathToCzeroMaps: string;
    pathToCzeroMapcycleTxt: string;
    pathToCzeroServerCfg: string;
    pathToStartMap: string;
    defaultHostname: string;
    defaultPassword: string;
}

function make(env: Environment): E.Either<Error, Settings> {
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
        E.bind('pathToContainerID', () => parseString('CONTAINER')),
        E.bind('cstrikeChannel', () => parseString('SLACK_CSTRIKE_CHANNEL')),
        E.bind('pathToCstrike', () => parseString('CSTRIKE_DIR')),
        E.bind('pathToCzero', () => parseString('CZERO_DIR')),
        E.bind('pathToCzeroMapcycleTxt', () => parseString('CZERO_MAPCYCLE_TXT')),
        E.bind('pathToCzeroServerCfg', () => parseString('CZERO_SERVER_CFG')),
        E.bind('pathToStartMap', () => parseString('MAP')),
        E.bind('defaultHostname', () => parseString('DEFAULT_HOSTNAME')),
        E.bind('defaultPassword', () => parseString('DEFAULT_PASSWORD')),
        E.map(
            ({
                token,
                appToken,
                port,
                pathToContainerID,
                cstrikeChannel,
                pathToCstrike,
                pathToCzero,
                pathToCzeroMapcycleTxt,
                pathToCzeroServerCfg,
                pathToStartMap,
                defaultHostname,
                defaultPassword,
            }) => {
                return {
                    token,
                    appToken,
                    port,
                    pathToContainerID,
                    cstrikeChannel,
                    pathToCstrikeMaps: `${pathToCstrike}/maps`,
                    pathToCzeroMaps: `${pathToCzero}/maps`,
                    pathToCzeroMapcycleTxt,
                    pathToCzeroServerCfg,
                    pathToStartMap,
                    defaultHostname,
                    defaultPassword,
                };
            },
        ),
    );
}
