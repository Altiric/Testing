const HiveDevelopment = require('./HiveDevelopment');

(async () => {
  await HiveDevelopment.loadPlugins();
  await HiveDevelopment.runPlugin('WakeUpFucker');
})();
