import { Option } from '@slack/bolt';
import { Do } from 'fp-ts-contrib/Do';
import * as Console from 'fp-ts/Console';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { App } from '../app';
import { ServerConfig } from '../domain';
import * as ErrorMessageBlocks from '../views/errorMessageBlocks';
import * as ServerConfigModal from '../views/serverConfigModal';

export { handle };

function handle(app: App): void {
    const { slackApp, grpcClient, config } = app;
    const { cstrikeChannel } = config;

    slackApp.view(ServerConfigModal.callbackId, async ({ ack, body, client }) => {
        await ack();
        const { values } = body.view.state;

        try {
            const config = pipe(values, parseServerConfig, getOrThrow);

            const response = await grpcClient.servantService.startServer(config);
            const res = getOrThrow(response);

            if (res.success) {
                Console.log('Success!')();
            } else {
                await client.chat.postMessage({
                    channel: cstrikeChannel,
                    blocks: ErrorMessageBlocks.buildView({ why: res.errorMessage }),
                });
            }
        } catch (e) {
            Console.log(e)();
        }
    });
}

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Values {
    [block_id: string]: {
        [action_id: string]: any;
    };
}

/* eslint-enable @typescript-eslint/no-explicit-any */

function parseServerConfig(values: Values): E.Either<Error, ServerConfig> {
    function buildParserError(field: string): Error {
        return new Error(`Unable to parse ${field}`);
    }

    function parseText(block_id: string, action_id: string, field: string): E.Either<Error, string> {
        const err = buildParserError(field);
        const fromNullable = E.fromNullable(err);

        return Do(E.Monad)
            .bind('block', fromNullable(values[block_id]))
            .bindL('action', ({ block }) => fromNullable(block[action_id]))
            .bindL('value', ({ action }) => fromNullable((action as { value: string }).value))
            .return(({ value }) => value);
    }

    function parsePlayers(block_id: string, action_id: string): E.Either<Error, string[]> {
        const err = buildParserError('players');
        const fromNullable = E.fromNullable(err);

        return Do(E.Monad)
            .bind('block', fromNullable(values[block_id]))
            .bindL('action', ({ block }) => fromNullable(block[action_id]))
            .bindL('players', ({ action }) => fromNullable((action as { selected_users: string[] }).selected_users))
            .return(({ players }) => players);
    }

    function parseMaps(block_id: string, action_id: string): E.Either<Error, string[]> {
        const err = buildParserError('maps');
        const fromNullable = E.fromNullable(err);

        return Do(E.Monad)
            .bind('block', fromNullable(values[block_id]))
            .bindL('action', ({ block }) => fromNullable(block[action_id]))
            .bindL('options', ({ action }) => fromNullable((action as { selected_options: Option[] }).selected_options))
            .return(({ options }) => options.map((option) => option.value as string));
    }

    const {
        nameInputActionId,
        nameInputBlockId,
        passwordInputActionId,
        passwordInputBlockId,
        playersSelectActionId,
        playersSelectBlockId,
        mapsSelectActionId,
        mapsSelectBlockId,
    } = ServerConfigModal;

    return Do(E.Monad)
        .bind('name', parseText(nameInputBlockId, nameInputActionId, 'name'))
        .bind('password', parseText(passwordInputBlockId, passwordInputActionId, 'password'))
        .bind('players', parsePlayers(playersSelectBlockId, playersSelectActionId))
        .bind('maps', parseMaps(mapsSelectBlockId, mapsSelectActionId))
        .return(({ name, password, players, maps }) => {
            return {
                name,
                password,
                players,
                maps,
            };
        });
}

function getOrThrow<A>(x: E.Either<Error, A>): A {
    return pipe(
        x,
        E.match(
            (e) => {
                throw e;
            },
            (a) => a,
        ),
    );
}
