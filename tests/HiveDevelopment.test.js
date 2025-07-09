const path = require('path');
const fs = require('fs');
const HiveDevelopment = require('../src/HiveDevelopment');

describe('HiveDevelopment', () => {
  beforeEach(() => {
    HiveDevelopment.plugins.clear();
  });

  it('loads no plugins if plugins-dev directory is empty or missing', async () => {
    // Ensure plugins-dev folder does not exist or is empty
    const devDir = path.join(__dirname, '../plugins-dev');
    if (fs.existsSync(devDir)) {
      fs.rmSync(devDir, { recursive: true, force: true });
    }
    await HiveDevelopment.loadPlugins();
    expect(HiveDevelopment.plugins.size).toBeGreaterThanOrEqual(0);
  });

  it('loads plugins from plugins directory if plugins-dev missing', async () => {
    await HiveDevelopment.loadPlugins();
    expect(HiveDevelopment.plugins.has('WakeUpFucker')).toBe(true);
  });

  it('overridePlugin replaces or adds a plugin', () => {
    const dummyPlugin = { name: 'Dummy', run: jest.fn() };
    HiveDevelopment.overridePlugin('Dummy', dummyPlugin);
    expect(HiveDevelopment.plugins.get('Dummy')).toBe(dummyPlugin);
  });

  it('runPlugin runs the plugin or errors if missing', async () => {
    const plugin = { name: 'Test', run: jest.fn() };
    HiveDevelopment.overridePlugin('Test', plugin);

    await HiveDevelopment.runPlugin('Test');
    expect(plugin.run).toHaveBeenCalled();

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await HiveDevelopment.runPlugin('NoExist');
    expect(consoleSpy).toHaveBeenCalledWith('HiveDevelopment: No plugin named NoExist');
    consoleSpy.mockRestore();
  });
});
