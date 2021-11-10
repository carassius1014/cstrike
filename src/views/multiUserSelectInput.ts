import { InputBlock } from '@slack/types';

import * as PlainText from './plainText';

export { Input, buildView };

interface Input {
    block_id: string;
    action_id: string;
    label: string;
    placeholder: string;
}

function buildView({ block_id, action_id, label, placeholder }: Input): InputBlock {
    return {
        type: 'input' as const,
        block_id,
        label: PlainText.buildView({ text: label }),
        element: {
            type: 'multi_users_select' as const,
            action_id,
            placeholder: PlainText.buildView({ text: placeholder }),
        },
    };
}
