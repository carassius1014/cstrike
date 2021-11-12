import { App as SlackApp } from '@slack/bolt';
import * as fs from 'fs';
import { Docker } from 'node-docker-api';

import { prepareHandlers } from './handlers';
import { Settings } from './settings';

export { App, make };

interface App {
    containerID: string;
    dockerClient: Docker;
    slackApp: SlackApp;
    settings: Settings;
}

async function make(settings: Settings): Promise<App> {
    const rawContainerID = await fs.promises.readFile(settings.pathToContainerID, 'utf-8');
    const containerID = rawContainerID.trim();
    const dockerClient = new Docker({ socketPath: '/var/run/docker.sock' });
    const slackApp = new SlackApp({ token: settings.token, appToken: settings.appToken, socketMode: true });
    const app = { containerID, dockerClient, slackApp, settings };
    prepareHandlers(app);
    return app;
}
