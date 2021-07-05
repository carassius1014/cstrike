import { Block, KnownBlock } from '@slack/types';

import * as Divider from './divider';
import * as Header from './header';
import * as MarkdownText from './markdownText';

export { buildView };

function buildView(why: string): Array<Block | KnownBlock> {
    return [
        Header.buildView({ text: '*Something went wrong* :cry:' }),
        Divider.buildView(),
        { type: 'section', text: MarkdownText.buildView({ text: why }) },
    ];
}
