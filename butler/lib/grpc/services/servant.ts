import { credentials } from '@grpc/grpc-js';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { promisify } from 'util';

import { Unit } from '../../../protos/prelude_pb';
import { ServantClient } from '../../../protos/servant_grpc_pb';
import {
    GetMapsResponse,
    StartServerRequest,
    StartServerResponse,
    StopServerResponse,
} from '../../../protos/servant_pb';
import { ServerConfig } from '../../domainObjects/serverConfig';

export { Service };

class Service {
    private readonly client: ServantClient;

    public constructor(url: string) {
        this.client = new ServantClient(url, credentials.createInsecure());
    }

    public async getMaps(): Promise<E.Either<Error, string[]>> {
        const req = new Unit();

        const { client } = this;
        const res = await promisify<Unit, GetMapsResponse | undefined>(client.getMaps.bind(client))(req);
        const maps = res?.getMapsList();

        const err = Error('failed to fetch response maps');
        return E.fromNullable(err)(maps);
    }

    public async startServer(
        config: ServerConfig,
    ): Promise<E.Either<Error, { success: boolean; errorMessage: string }>> {
        const req = new StartServerRequest();
        req.setName(config.name);
        req.setPassword(config.password);
        req.setPlayersList(config.players);
        req.setMapsList(config.maps);

        const { client } = this;
        const res = await promisify<StartServerRequest, StartServerResponse | undefined>(
            client.startServer.bind(client),
        )(req);
        const nsuccess = res?.getSuccess();
        const nerrorMessage = res?.getErrorMessage();

        const mkFieldFailure = (field: string): Error => Error(`failed to fetch field: ${field}`);
        return pipe(
            E.bindTo('success')(E.fromNullable(mkFieldFailure('success'))(nsuccess)),
            E.bind('errorMessage', () => E.fromNullable(mkFieldFailure('errorMessage'))(nerrorMessage)),
            E.map(({ success, errorMessage }) => {
                return { success, errorMessage };
            })
        );
    }

    public async stopServer(): Promise<E.Either<Error, { success: boolean; errorMessage: string }>> {
        const req = new Unit();

        const { client } = this;
        const res = await promisify<Unit, StopServerResponse | undefined>(client.stopServer.bind(client))(req);
        const nsuccess = res?.getSuccess();
        const nerrorMessage = res?.getErrorMessage();

        const mkFieldFailure = (field: string): Error => Error(`failed to fetch field: ${field}`);
        return pipe(
            E.bindTo('success')(E.fromNullable(mkFieldFailure('success'))(nsuccess)),
            E.bind('errorMessage', () => E.fromNullable(mkFieldFailure('errorMessage'))(nerrorMessage)),
            E.map(({ success, errorMessage }) => {
                return { success, errorMessage };
            }),
        );
    }
}
