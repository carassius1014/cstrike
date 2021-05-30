import { credentials } from '@grpc/grpc-js';
import * as E from 'fp-ts/Either';
import { promisify } from 'util';

import { Unit } from '../../../protos/prelude_pb';
import { ServantClient } from '../../../protos/servant_grpc_pb';
import { GetMapsResponse } from '../../../protos/servant_pb';

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
}
