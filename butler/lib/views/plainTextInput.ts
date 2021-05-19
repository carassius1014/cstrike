import { InputBlock } from '@slack/types';

import * as PlainText from './plainText';

export { Input, buildView };

interface Input {
    block_id: string;
    action_id: string;
    label: string;
    placeholder: string;
    multiline?: boolean;
    initial_value?: string | undefined;
}

function buildView({
    block_id,
    action_id,
    label,
    multiline = false,
    placeholder,
    initial_value = undefined,
}: Input): InputBlock {
    return {
        type: 'input' as const,
        block_id,
        label: PlainText.buildView({ text: label }),
        element: {
            type: 'plain_text_input' as const,
            action_id,
            initial_value,
            multiline,
            placeholder: PlainText.buildView({ text: placeholder }),
        },
    };
}
