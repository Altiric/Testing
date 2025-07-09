const fs = require('fs').promises;
const path = require('path');

/**
 * Loads and registers plugins from a plugin directory.
 */
class PluginBalls {
  /**
   * @param {string} pluginDirectory Optional custom path to plugin folder
   */
  constructor(pluginDirectory = path.join(__dirname, '../plugins')) {
    this.pluginDirectory = pluginDirectory;
    this.plugins = new Map();
  }

  async loadPlugins() {
    try {
      const files = await fs.readdir(this.pluginDirectory);
      for (const file of files) {
        if (file.endsWith('.js')) {
          const plugin = require(path.join(this.pluginDirectory, file));
          this.plugins.set(plugin.name, plugin);
          console.log(`Loaded plugin ${plugin.name}, ready to fuck shit up!`);
        }
      }
    } catch (err) {
      console.error(`PluginBalls choked on loading: ${err.message}`);
    }
  }

  async runPlugin(name) {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      console.error(`No plugin named ${name}, you teasing fuck!`);
      return;
    }
    try {
      await plugin.run();
    } catch (err) {
      console.error(`Plugin ${name} fucked up: ${err.message}`);
    }
  }
}

module.exports = PluginBalls;
