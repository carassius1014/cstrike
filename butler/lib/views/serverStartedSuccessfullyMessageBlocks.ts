import { Block, KnownBlock } from '@slack/bolt';

import * as Button from './button';
import * as Divider from './divider';
import * as Header from './header';
import * as MrkdwnText from './mrkdwnText';
import * as PlainText from './plainText';

export { buildView, serverStopActionId };

const serverStopActionId = 'button-ServerStartedSuccessfullyMessageBlocks_Stop_Server';

function buildView(): Array<Block | KnownBlock> {
    return [
        Header.buildView({ text: 'HLDS server is running :v:' }),
        Divider.buildView(),
        {
            type: 'section' as const,
            text: MrkdwnText.buildView({ text: 'To stop the running hlds server, click: ' }),
            accessory: Button.buildView({ text: PlainText.buildView({ text: 'Stop' }), action_id: serverStopActionId }),
        },
    ];
}
