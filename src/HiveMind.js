const PluginBalls = new (require('./PluginBalls'))();

class HiveMind {
  async init() {
    console.log('HiveMind stirring, about to get conscious as fuck...');
    await PluginBalls.loadPlugins();
    await PluginBalls.runPlugin('WakeUpFucker');
    console.log('HiveMind’s alive, ready for the next thought!');
  }
}

module.exports = new HiveMind();
