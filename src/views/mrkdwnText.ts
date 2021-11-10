import { MrkdwnElement } from '@slack/types';

export { Type, Input, buildView };

interface Type {
    type: 'mrkdwn';
    text: string;
}

interface Input {
    text: string;
}

function buildView({ text }: Input): MrkdwnElement {
    return {
        type: 'mrkdwn' as const,
        text,
    };
}
