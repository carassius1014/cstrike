import { Service as EchoService } from './services/echo';

export { Client, create }

interface Client {
    echoService: EchoService
}

function create(host: string, port: number): Client {
    const url = `${host}:${port}`;
    return {
        echoService: new EchoService(url)
    }
}
