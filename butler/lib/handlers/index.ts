import { App } from '@slack/bolt';

import { handleCStrikeSlashCommand } from './cstrikeSlashCommand';
import { handleServerConfigModalSubmission } from './serverConfigModalSubmission';

export { prepareHandlers };

function prepareHandlers(app: App): void {
    handleCStrikeSlashCommand(app);
    handleServerConfigModalSubmission(app);
}
