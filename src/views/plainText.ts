import { PlainTextElement } from '@slack/types';

export { Input, buildView };

interface Input {
    text: string;
}

function buildView({ text }: Input): PlainTextElement {
    return {
        type: 'plain_text' as const,
        text,
    };
}
