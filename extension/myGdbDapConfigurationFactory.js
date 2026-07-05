const vscode = require('vscode');
const cp = require('child_process');
const fs = require('fs');
const os = require('os');
const net = require('net');
const path = require('path');

class MyGdbDapConfigurationFactory {

  constructor(){
    this.ocdProc = null;
  }

  async resolveDebugConfiguration(folder, config, token) {

    if(!config) return undefined;

    if (!this.ocdProc) {
      const ocdPath = config.ocdPath;

      // OpenOCD関連
      const ocdOpts = [
        "-c", "telnet_port disabled",
        "-c", "tcl_port disabled" 
      ];
      if(config.ocdOpts && Array.isArray(config.ocdOpts)){
        config.ocdOpts = ocdOpts.concat(config.ocdOpts);
      }else{
        config.ocdOpts = ocdOpts;
      }

      // GDB関連
      const gdbOpts = [
        '--quiet',
        '--interpreter=dap',
        '-ex', 'set remotetimeout 30',
        '-ex', 'set target-async off',
        '-ex', 'maintenance flush register-cache',
        '-ex', `target remote ${config.ocdAddr}`
      ];
      if(config.gdbOpts && Array.isArray(config.gdbOpts))
      {
        config.gdbOpts = gdbOpts.concat(config.gdbOpts);
      }
      if(config.program)
      {
        config.gdbOpts.push(config.program);
      }

      let bRes = false;
 
      // Check GDB is executable
      bRes = this.run_gdb(config);
      if(!bRes) return undefined;

      // Run OpenOCD
      bRes = await this.run_openocd(config);
      if(!bRes) return undefined;

      // OpenOCD起動後、GDB接続待ちになるまで少し待つ
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機例
    }
    return config;
  }

  run_gdb(config)
  {
    const gdbCheck = cp.spawnSync(config.gdbPath, ['--version']);
    if(gdbCheck.error) {
      vscode.window.showErrorMessage(`GDBの起動チェックに失敗しました。(${gdbCheck.error.message})`);
      return false;
    }
    return true;
  }

  async run_openocd(config)
  {
    this.ocdProc = cp.spawn(config.ocdPath, config.ocdOpts);

    let bSuccess = true;
    this.ocdProc.on('error', (err) => {
      bSuccess = false;
      this.ocdProc = null;
      vscode.window.showErrorMessage(`OpenOCDを起動できませんでした: ${err.message}`);
    })
    this.ocdProc.on('close', (code, signal) => {
      bSuccess = false;
      this.ocdProc = null;
      vscode.window.showErrorMessage(`OpenOCDが終了しました`);
    })

    // OpenOCDの起動を少し待つ
    await new Promise(resolve => setTimeout(resolve, 500)); // 500m秒待機

    return bSuccess;
  }

  kill_openocd()
  {
    if(this.ocdProc){
      this.ocdProc.kill();
      this.ocdProc = null;
    }
  }
}

module.exports = MyGdbDapConfigurationFactory;
