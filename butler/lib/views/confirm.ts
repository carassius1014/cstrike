import { Confirm } from '@slack/types';

import * as MrkDwnText from './mrkdwnText';
import * as PlainText from './plainText';

export { Input, buildView };

interface Input {
    title: string;
    body: string;
    confirmText: string;
    denyText: string;
}

function buildView({ title, body, confirmText, denyText }: Input): Confirm {
    return {
        title: PlainText.buildView({ text: title }),
        text: MrkDwnText.buildView({ text: body }),
        confirm: PlainText.buildView({ text: confirmText }),
        deny: PlainText.buildView({ text: denyText }),
    };
}
