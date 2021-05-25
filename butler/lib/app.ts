import { App } from '@slack/bolt';

import { Config } from './config';
import { prepareHandlers } from './handlers';
import { ServantClient } from './servant';

export { create };

function create(config: Config): App {
    const app = new App(config);
    const servantClient = new ServantClient(config.servantHost, config.servantPort);
    prepareHandlers(app, servantClient);
    return app;
}
