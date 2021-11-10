import * as fs from 'fs';
import * as path from 'path';

export { listMaps };

async function listMaps(pathToCstrikeMaps: string, pathToCzeroMaps: string): Promise<string[]> {
    const mapSet: Set<string> = new Set();

    async function fetchMaps(dir: string): Promise<void> {
        await fs.promises
            .readdir(dir)
            .then((files) => {
                files
                    .filter((file) => {
                        const ext = path.parse(file).ext;
                        return ext === '.bsp';
                    })
                    .forEach((file) => {
                        const map = path.parse(file).name;
                        mapSet.add(map);
                    });
            })
            .catch((err) => {
                throw err;
            });
    }

    await fetchMaps(pathToCstrikeMaps);
    await fetchMaps(pathToCzeroMaps);

    return Array.from(mapSet).sort((a, b) => a.localeCompare(b));
}
