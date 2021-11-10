import { App as SlackApp } from '@slack/bolt';

import { prepareHandlers } from './handlers';
import { Settings } from './settings';

export { App, create };

interface App {
    slackApp: SlackApp;
    settings: Settings;
}

function create(settings: Settings): App {
    const slackApp = new SlackApp({ token: settings.token, appToken: settings.appToken, socketMode: true });
    const app = { slackApp, settings };
    prepareHandlers(app);
    return app;
}
