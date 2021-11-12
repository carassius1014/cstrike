import { Docker } from 'node-docker-api';
import { Container } from 'node-docker-api/lib/container';

export { startContainer, stopContainer };

async function startContainer(client: Docker, containerID: string): Promise<void> {
    const container = await findContainerByID(client, containerID);

    if (container === undefined) {
        throw Error('hlds container not found');
    }

    const state = (container.data as { State: string }).State;
    if (state !== 'created' && state !== 'exited') {
        throw Error("cannot start hlds container: maybe it's already running");
    }

    await container.start();
}

async function stopContainer(client: Docker, containerID: string): Promise<void> {
    const container = await findContainerByID(client, containerID);

    if (container === undefined) {
        throw Error('hlds container not found');
    }

    const state = (container.data as { State: string }).State;
    if (state !== 'running') {
        throw Error("cannot stop hlds container: maybe it's not running");
    }

    await container.stop();
}

async function findContainerByID(client: Docker, containerID: string): Promise<Container | undefined> {
    const containers = await client.container.list({ all: true });
    return containers.find(container => container.id === containerID);
}
