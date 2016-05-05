# 講座で利用する環境を構築する

ハンズオン形式で講座を進めていきますので、事前に実行環境の準備をお願いしたいと思います。

やっていただく作業は

1. GitHubから必要なファイル一式をダウンロード
2. Vagrant環境、もしくは普段からNode.js環境を使ってる方はそちらの環境を利用した環境構築

の作業をお願いします


## GitHubから必要なファイル一式を取り込む

ターミナルを起動して開発マシン上の任意のディレクトリで以下コマンドを実行してください。

```sh
git clone git@github.com:h5y1m141/step-up-javascript.git
```

## 個々の環境に合わせた作業

JavaScriptの実行環境としてNode.jsを想定しておりますので、以下いづれかの方法で環境を構築しておいてください
GitHubから必要なファイルをダウンロードしたら、それぞれの環境に応じて以下の作業を事前にしておいてください。

### Node.jsの環境を全く作ったことが無い方

[Vagrant環境を利用して環境を構築する](set_up_vagrant.md)を参考にして、Vagrant環境での構築方法を参考に準備をお願いします。

### 普段からNode.js環境を利用してる方

講座をすすめる上で必要なnpmモジュールがインストールできるようにpackage.jsonを準備してありますので、

```sh
npm install
```

を実施すればOKです。

[Mac/Windows上でNode.jsの環境を利用する](set_up_vagrant.md)参考に準備をお願いします。