import { App } from '@slack/bolt';

import * as CStrikeSlashCommand from './cstrikeSlashCommand';
import * as EchoSlashCommand from './echoSlashCommand';
import * as ServerConfigModalSubmission from './serverConfigModalSubmission';

export { prepareHandlers };

function prepareHandlers(app: App): void {
    EchoSlashCommand.handle(app);
    CStrikeSlashCommand.handle(app);
    ServerConfigModalSubmission.handle(app);
}
