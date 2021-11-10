import { Block, KnownBlock } from '@slack/bolt';

import * as Divider from './divider';
import * as Header from './header';

export { buildView };

function buildView(): Array<Block | KnownBlock> {
    return [Header.buildView({ text: 'HLDS server has stopped :ok_hand:' }), Divider.buildView()];
}
