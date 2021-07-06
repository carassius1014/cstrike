import { Block, KnownBlock } from '@slack/types';

import * as Divider from './divider';
import * as Header from './header';
import * as MrkdwnText from './mrkdwnText';

export { Input, buildView };

interface Input {
    why: string;
}

function buildView({ why }: Input): Array<Block | KnownBlock> {
    return [
        Header.buildView({ text: 'Something went wrong :cry:' }),
        Divider.buildView(),
        { type: 'section', text: MrkdwnText.buildView({ text: why }) },
    ];
}
