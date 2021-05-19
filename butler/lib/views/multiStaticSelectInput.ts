import { InputBlock } from '@slack/types';

import * as PlainText from './plainText';

export { Input, Option, buildView };

interface Option {
    text: PlainText.Type;
    value: string;
}

interface Input {
    block_id: string;
    action_id: string;
    label: string;
    placeholder: string;
    options: Option[];
}

function buildView({ block_id, action_id, label, placeholder, options }: Input): InputBlock {
    return {
        type: 'input' as const,
        block_id,
        label: PlainText.buildView({ text: label }),
        element: {
            type: 'multi_static_select' as const,
            action_id,
            placeholder: PlainText.buildView({ text: placeholder }),
            options,
        },
    };
}
