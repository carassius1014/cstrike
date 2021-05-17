import { App } from '@slack/bolt';
import { handleCStrikeSlashCommand } from './cstrikeSlashCommand';

export { prepareHandlers };

function prepareHandlers(app: App): void {
    handleCStrikeSlashCommand(app);
}
