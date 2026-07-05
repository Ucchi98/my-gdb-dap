const vscode = require('vscode');

const MyGdbDapConfigurationFactory = require('./myGdbDapConfigurationFactory');
const MyGdbDapDescriptorFactory = require('./myGdbDapDescriptorFactory');

function activate(context) {

  // 1. DebugConfigurationProviderの登録
  const mgdcf = new MyGdbDapConfigurationFactory();
  context.subscriptions.push(
    vscode.debug.registerDebugConfigurationProvider('my-gdb-dap', mgdcf)
  );

  // 2. DebugAdapterDescriptorFactoryの登録
  const mgddf = new MyGdbDapDescriptorFactory();
  context.subscriptions.push(
    vscode.debug.registerDebugAdapterDescriptorFactory('my-gdb-dap', mgddf)
  );

  // 3. デバッグ終了時にOpenOCDも終了させる
  context.subscriptions.push(
    vscode.debug.onDidTerminateDebugSession((session) => {
      if(session.type === 'my-gdb-dap')
        mgdcf.kill_openocd();
    })
  );
}

function deactivate() {
}

module.exports = {
  activate,
  deactivate
};
