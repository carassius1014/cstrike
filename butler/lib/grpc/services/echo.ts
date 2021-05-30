import { credentials } from '@grpc/grpc-js';
import * as E from 'fp-ts/Either';
import { promisify } from 'util';

import { EchoClient } from '../../../protos/echo_grpc_pb';
import { EchoRequest, EchoResponse } from '../../../protos/echo_pb';

export { Service };

class Service {
    private readonly client: EchoClient;

    public constructor(url: string) {
        this.client = new EchoClient(url, credentials.createInsecure());
    }

    public async echo(message: string): Promise<E.Either<Error, string>> {
        const req = new EchoRequest();
        req.setMessage(message);

        const { client } = this;
        const res = await promisify<EchoRequest, EchoResponse | undefined>(client.echo.bind(client))(req);
        const responseMsg = res?.getMessage();

        const err = Error('failed to fetch response message');
        return E.fromNullable(err)(responseMsg);
    }
}
