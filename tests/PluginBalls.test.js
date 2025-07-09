const path = require('path');
const fs = require('fs').promises;
const PluginBalls = require('../src/PluginBalls');

describe('PluginBalls', () => {
  const emptyDir = path.join(__dirname, 'emptyPlugins');

  beforeAll(async () => {
    await fs.mkdir(emptyDir, { recursive: true });
    const files = await fs.readdir(emptyDir);
    for (const file of files) {
      await fs.unlink(path.join(emptyDir, file));
    }
  });

  it('loads no plugins if directory is empty', async () => {
    const pluginBalls = new PluginBalls(emptyDir);
    await pluginBalls.loadPlugins();
    expect(pluginBalls.plugins.size).toBe(0);
  });

  it('errors on missing plugin', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const pluginBalls = new PluginBalls(); // uses default /plugins
    await pluginBalls.loadPlugins();
    await pluginBalls.runPlugin('NoFucker');
    expect(consoleSpy).toHaveBeenCalledWith('No plugin named NoFucker, you teasing fuck!');
    consoleSpy.mockRestore();
  });
});
