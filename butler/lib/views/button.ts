import { Button, Confirm, PlainTextElement } from '@slack/types';

export { Input, buildView };

interface Input {
    text: PlainTextElement;
    action_id: string;
    style: 'primary' | 'danger' | undefined;
    confirm: Confirm | undefined;
}

function buildView({ text, action_id, style, confirm }: Input): Button {
    return {
        type: 'button' as const,
        text,
        action_id,
        style,
        confirm,
    };
}
