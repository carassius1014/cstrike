import { App as SlackApp } from '@slack/bolt';

import { Config } from './config';
import { prepareHandlers } from './handlers';
import { ServantClient } from './servant';

export { App, create };

interface App {
    slackApp: SlackApp;
    config: Config;
    servantClient: ServantClient;
}

function create(config: Config): App {
    const slackApp = new SlackApp(config);
    const servantClient = new ServantClient(config.servantHost, config.servantPort);
    const app = { slackApp, config, servantClient };
    prepareHandlers(app);
    return app;
}
