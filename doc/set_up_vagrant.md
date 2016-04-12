## Vagrant環境を利用して環境を構築する

Vagrant環境を利用して環境を構築する方法について解説します。


なお、検証してる環境は以下のとおりです

### ホストマシン

- Mac OS X Yosemite（10.10.5）
- Mac OS X El Capitan（10.11.4）

### Vagrant＆VirtulBox

- Vagrant 1.8.1
- VirtualBox 5.0.10

## 

ホストマシン上で

```sh
vagrant up; vagrant provision
```

をしてください。

- 仮想マシン内にAnsibleがインストールされる
- インストールされたAnsibleがvagrant.ymlを読み込み、そこの設定によりNode.js環境を構築

という構成を取ってます。

いくつかのツールやミドルウェアのインストールが以下のようにされていきます


```sh
==> default: Running provisioner: ansible_local...
    default: Running ansible-playbook...
cd /vagrant && PYTHONUNBUFFERED=1 ANSIBLE_FORCE_COLOR=true ansible-playbook --limit='default' --inventory-file=/tmp/vagrant-ansible/inventory -v vagrant.yml

PLAY [vagrant] ****************************************************************

GATHERING FACTS ***************************************************************
ok: [default]

TASK: [common | install basic packages] ***************************************
```

インストールがすべて終わってターミナルの最後が

```sh
PLAY RECAP ********************************************************************
default                    : ok=9    changed=3    unreachable=0    failed=0
```

という表示になれば、Node.jsが利用できる環境が整います。


## 必要なnpmモジュールをインストールする

### ホストマシンでの作業

```sh
vagrant ssh
```

### SSHした後の仮想マシン上での作業

sshした後は

```sh
Last login: Mon Apr  4 20:00:06 2016 from 10.0.2.2
[vagrant@localhost ~]$ cd /vagrant; npm install
```

という表示になってるかと思いますので、以下コマンドを実行して

- /vagrantディレクトリに移動
- npmモジュールをインストールするためした上でインストール作業を

```sh
cd /vagrant
npm install
```

という作業をしてください

### gulpの起動

gulp-webserverを利用したWebサーバー機能を利用して作業を進めていきます

現在の作業ディレクトリが/vagrantであることを念のため確認してください。

```sh
pwd
=> /vagrant
```

上記確認が出来たら以下コマンドを入力してください

```sh
./node_modules/gulp/bin/gulp.js
```


