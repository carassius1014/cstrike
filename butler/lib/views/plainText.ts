import { PlainTextElement } from '@slack/types';

export { Type, Input, buildView };

interface Type {
    type: 'plain_text';
    text: string;
}

interface Input {
    text: string;
}

function buildView({ text }: Input): PlainTextElement {
    return {
        type: 'plain_text' as const,
        text,
    };
}
