import { App } from '@slack/bolt';

import * as CStrikeSlashCommand from './cstrikeSlashCommand';
import * as ServerConfigModalSubmission from './serverConfigModalSubmission';

export { prepareHandlers };

function prepareHandlers(app: App): void {
    CStrikeSlashCommand.handle(app);
    ServerConfigModalSubmission.handle(app);
}
