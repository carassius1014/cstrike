import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';

export { ServerConfig };

interface ServerConfig {
    name: string;
    password: string;
    players: string[];
    maps: NonEmptyArray<string>;
}
