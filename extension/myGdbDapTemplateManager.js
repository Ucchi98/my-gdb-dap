const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

class MyGdbDapTemplateManager {

  constructor(context){
    this.context = context;
  }

  // create launch.json
  createLaunchJson = async () => {

    // 1. ワークスペースの確認
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('プロジェクトフォルダを開いていません。');
      return;
    }
    const projectRootUri = workspaceFolders[0].uri;

    // 2. パスの設定
    const templateUri = vscode.Uri.joinPath(this.context.extensionUri, 'template', 'launch.json');
    const vscodeFolderUri = vscode.Uri.joinPath(projectRootUri, '.vscode');
    const targetLaunchUri = vscode.Uri.joinPath(vscodeFolderUri, 'launch.json');

    try {
      // 3. フォルダ作成とコピー
      await vscode.workspace.fs.createDirectory(vscodeFolderUri);
      await vscode.workspace.fs.copy(templateUri, targetLaunchUri, { overwrite: false });

      // 4. ファイルを開く
      const doc = await vscode.workspace.openTextDocument(targetLaunchUri);
      await vscode.window.showTextDocument(doc);

      vscode.window.showInformationMessage('.vscode/launch.json を作成しました！');

    } catch (error) {
      // エラーハンドリング
      if (error.code === 'FileExists' || error.message.includes('File exists')) {
        vscode.window.showWarningMessage('すでに .vscode/launch.json が存在します。');
      } else {
        vscode.window.showErrorMessage(`作成に失敗しました: ${error.message}`);
      }
    }
  };
}

module.exports = MyGdbDapTemplateManager;
