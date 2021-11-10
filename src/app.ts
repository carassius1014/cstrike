import { App as SlackApp } from '@slack/bolt';

import { Config } from './config';
import { prepareHandlers } from './handlers';

export { App, create };

interface App {
    slackApp: SlackApp;
    config: Config;
}

function create(config: Config): App {
    const slackApp = new SlackApp({ token: config.token, appToken: config.appToken, socketMode: true });
    const app = { slackApp, config };
    prepareHandlers(app);
    return app;
}
