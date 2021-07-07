import { App } from '../app';

import * as CStrikeSlashCommand from './cstrikeSlashCommand';
import * as EchoSlashCommand from './echoSlashCommand';
import * as ServerConfigModalSubmission from './serverConfigModalSubmission';
import * as ServerStopButtonClick from './serverStopButtonClick';

export { prepareHandlers };

function prepareHandlers(app: App): void {
    EchoSlashCommand.handle(app);
    CStrikeSlashCommand.handle(app);
    ServerConfigModalSubmission.handle(app);
    ServerStopButtonClick.handle(app);
}
