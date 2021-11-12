import { App } from "../app";
import { stopContainer } from "../docker";

export { stopHLDS };

async function stopHLDS(app: App): Promise<void> {
    const { containerID, dockerClient } = app;
    await stopContainer(dockerClient, containerID);
}
