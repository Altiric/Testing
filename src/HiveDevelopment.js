const fs = require('fs').promises;
const path = require('path');

/**
 * Dev sandbox for plugin loading and testing.
 * Loads from plugins-dev/ folder if it exists,
 * else falls back to plugins/
 */
class HiveDevelopment {
  constructor() {
    this.plugins = new Map();
  }

  async loadPlugins() {
    const devDir = path.join(__dirname, '../plugins-dev');
    const prodDir = path.join(__dirname, '../plugins');
    let pluginDir;

    try {
      // Check if dev directory exists, use it if yes
      await fs.access(devDir);
      pluginDir = devDir;
      console.log('HiveDevelopment: loading plugins from plugins-dev/');
    } catch {
      pluginDir = prodDir;
      console.log('HiveDevelopment: loading plugins from plugins/');
    }

    try {
      const files = await fs.readdir(pluginDir);
      for (const file of files) {
        if (file.endsWith('.js')) {
          const plugin = require(path.join(pluginDir, file));
          this.plugins.set(plugin.name, plugin);
          console.log(`HiveDevelopment: Loaded plugin ${plugin.name}`);
        }
      }
    } catch (err) {
      console.error(`HiveDevelopment choked on loading: ${err.message}`);
    }
  }

  overridePlugin(name, plugin) {
    this.plugins.set(name, plugin);
    console.log(`HiveDevelopment: Overridden plugin ${name}`);
  }

  async runPlugin(name) {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      console.error(`HiveDevelopment: No plugin named ${name}`);
      return;
    }
    try {
      await plugin.run();
    } catch (err) {
      console.error(`HiveDevelopment: Plugin ${name} errored: ${err.message}`);
    }
  }
}

module.exports = new HiveDevelopment();
