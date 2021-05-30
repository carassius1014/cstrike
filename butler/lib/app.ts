import { App as SlackApp } from '@slack/bolt';

import { Config } from './config';
import { prepareHandlers } from './handlers';
import * as gRPC from './grpc';

export { App, create };

interface App {
    slackApp: SlackApp;
    config: Config;
    grpcClient: gRPC.Client;
}

function create(config: Config): App {
    const slackApp = new SlackApp(config);
    const { servantHost, servantPort } = config;
    const grpcClient = gRPC.create(servantHost, servantPort);
    const app = { slackApp, config, grpcClient };
    prepareHandlers(app);
    return app;
}
