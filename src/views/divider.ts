import { DividerBlock } from '@slack/types';

export { buildView };

function buildView(): DividerBlock {
    return {
        type: 'divider' as const,
    };
}
