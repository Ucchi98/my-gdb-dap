const vscode = require('vscode');
const net = require('net');
const cp = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

class MyGdbDapDescriptorFactory {
  async createDebugAdapterDescriptor(session, executable) {
    const config = session.configuration;
    return new vscode.DebugAdapterExecutable(config.gdbPath, config.gdbOpts);
  }
}

module.exports = MyGdbDapDescriptorFactory;
