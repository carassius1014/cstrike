import { App } from '@slack/bolt';

import { ServantClient } from '../servant';

import * as CStrikeSlashCommand from './cstrikeSlashCommand';
import * as EchoSlashCommand from './echoSlashCommand';
import * as ServerConfigModalSubmission from './serverConfigModalSubmission';

export { prepareHandlers };

function prepareHandlers(app: App, servantClient: ServantClient): void {
    EchoSlashCommand.handle(app, servantClient);
    CStrikeSlashCommand.handle(app);
    ServerConfigModalSubmission.handle(app);
}
