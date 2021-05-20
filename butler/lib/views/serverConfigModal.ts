import { View } from '@slack/types';

import * as MultiStaticSelectInput from './multiStaticSelectInput';
import * as MultiUsersSelectInput from './multiUserSelectInput';
import * as PlainText from './plainText';
import * as PlainTextInput from './plainTextInput';

export {
    view,
    callbackId,
    nameInputBlockId,
    nameInputActionId,
    passwordInputBlockId,
    passwordInputActionId,
    playersSelectBlockId,
    playersSelectActionId,
    mapsSelectBlockId,
    mapsSelectActionId,
};

const callbackId = 'modal-ServerConfig';
const nameInputBlockId = 'block-ServerConfigModal_Name_Input';
const nameInputActionId = 'input-ServerConfigModal_Name';
const passwordInputBlockId = 'block-ServerConfigModal_Password_Input';
const passwordInputActionId = 'input-ServerConfigModal_Password';
const playersSelectBlockId = 'block-Players_Select';
const playersSelectActionId = 'select-Players';
const mapsSelectBlockId = 'block-Maps_Select';
const mapsSelectActionId = 'select-Maps';

const dummyMaps: MultiStaticSelectInput.Option[] = ['de_dust2', 'de_aztec', 'de_inferno', 'de_nuke', 'de_tuscan'].map(
    (mp) => {
        return {
            text: PlainText.buildView({ text: mp }),
            value: mp,
        };
    },
);

const view: View = {
    type: 'modal' as const,
    callback_id: callbackId,
    title: PlainText.buildView({ text: 'Start a CS:CZ Server' }),
    blocks: [
        PlainTextInput.buildView({
            block_id: nameInputBlockId,
            action_id: nameInputActionId,
            label: 'Name',
            placeholder: 'e.g. my-ctrike-server',
            initial_value: 'momoyama-south-gate',
        }),
        PlainTextInput.buildView({
            block_id: passwordInputBlockId,
            action_id: passwordInputActionId,
            label: 'Password',
            placeholder: 'e.g. my-password',
            initial_value: 'haskellrocks',
        }),
        MultiUsersSelectInput.buildView({
            block_id: playersSelectBlockId,
            action_id: playersSelectActionId,
            label: 'Players',
            placeholder: 'Select players from user list.',
        }),
        MultiStaticSelectInput.buildView({
            block_id: mapsSelectBlockId,
            action_id: mapsSelectActionId,
            label: 'Maps',
            placeholder: 'Select maps from list',
            options: dummyMaps,
        }),
    ],
    submit: PlainText.buildView({ text: 'Go! Go! Go!' }),
};
