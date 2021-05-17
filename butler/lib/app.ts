import { App } from '@slack/bolt';

import { Config } from './config';
import { prepareHandlers } from './handlers';

export { create };

function create(config: Config): App {
    const app = new App(config);
    prepareHandlers(app);
    return app;
}
