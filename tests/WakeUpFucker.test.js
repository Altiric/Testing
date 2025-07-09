describe('WakeUpFucker Plugin', () => {
  it('runs without error', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const plugin = require('../plugins/WakeUpFucker');
    await plugin.run();
    expect(consoleSpy).toHaveBeenCalledWith('Hivemind’s awake, bitches! Ready to think some dank thoughts.');
    consoleSpy.mockRestore();
  });
});