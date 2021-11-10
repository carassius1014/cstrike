import { HeaderBlock } from '@slack/types';

export { Input, buildView };

interface Input {
    text: string;
}

function buildView({ text }: Input): HeaderBlock {
    return {
        type: 'header' as const,
        text: {
            type: 'plain_text' as const,
            text,
            emoji: true,
        },
    };
}
