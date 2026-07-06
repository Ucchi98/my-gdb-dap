# my-gdb-dap
VSCode(OSS版)でOpenOCDとGDB（要DAP対応版）を使用して
デバッグを行えるようにする拡張機能です。

本来の目的は、ESP32のデバッグをVSCodeで行えるようにすることです。
ESP32開発用のVSCode拡張機能は公式に配布されていますが、
残念ながらGhostBSDのVSCodeでは使用できません。

そこで、ESP-IDFのopenocdとgdbのデバッガーフロントエンドとして
VSCodeを使用できるように拡張機能を作成しました。

## ビルド方法
以下のコマンドを実行すると、my-gdb-dap.vsixというファイルが生成されます。
```
% git clone https://github.com/Ucchi98/my-gdb-dap.git
% cd my-gdb-dap
% make
```

## インストール
生成されたmy-gdb-dap.vsixファイルを、vscodeの拡張機能としてインストールします。

## 使い方
1. プロジェクトの.vscodeフォルダにlaunch.jsonを作成
   - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> でコマンドパレットを開き、"Template"と入力する
   - 「Template: launch.jsonを作成」という項目が表示されるのでクリックする

2. launch.jsonを編集
以下は必ず設定が必要です。
   - program: デバッグ対象のプログラムのバイナリ(.elf)ファイルへの絶対パス
   - gdbPath: gdbコマンドへの絶対パス
   - gdbOpts: gdbコマンドへ与えるオプション
   - ocdPath: openocdコマンドへの絶対パス
   - ocdOpts: openocdコマンドへ与えるオプション
## その他
そのうち、YouTubeに使い方動画をアップします。

## Authors
- **Ucchi98** [GitHub](https://github.com/Ucchi98)
