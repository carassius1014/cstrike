import { Service as EchoService } from './services/echo';
import { Service as ServantService } from './services/servant';

export { Client, create };

interface Client {
    echoService: EchoService;
    servantService: ServantService;
}

function create(host: string, port: number): Client {
    const url = `${host}:${port}`;
    return {
        echoService: new EchoService(url),
        servantService: new ServantService(url),
    };
}
