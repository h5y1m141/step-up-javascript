## はじめに最初に作るツールの仕様について

簡単に仕様についてまとめておきます

- Gistという名前のクラス
- そのクラスにはfetch()というメソッドが定義されてる
- fetch()メソッドを実行するとあらかじめ設定済のURLからJSONの情報を取得することが出来る

Gistクラスが定義されてるファイル名をひとまずgist.jsとしておきます

### fetch()について補足

- サーバーとの通信になるので非同期での処理を想定しており
- 通信処理が正常に完了した場合にdone()というコールバック関数が呼ばれることを想定してます

### 最終的に実装されるgist.js

gist.jsを利用する側を仮にmain.jsとした場合には

```javascript
var promise,
      gist = new Gist();
promise = gist.fetch();
promise.done(function(response){
  console.log(response)  // gistにアクセスした結果が得られて、JSON.parse(response)してJSONとして扱えるようになる
});
```

という感じにすることで、gistの通信処理機能が利用できるようになります

## 実際にテストを書きながら作業を進めてみる

実際の仕事でメソッドが定義されてることについてテストを書くのは冗長なので実際には無いかと思うのですが、まずはテストを書くことになれるためにこのテストを書いてみます。

specディレクトリを開いて、新規に**gist_spec.js**という名前のファイルを作ります。

ファイルを作ったら、以下の内容を記述します

```javascript
describe('Gist', function() {
  describe('fetchメソッド', function() {
    it('定義されてる', function(){
    });    
  });
});
```

記述が終わったらターミナルを開いて、以下コマンドを入力して仮想マシンにsshします

```sh
vagrant ssh
```

sshが終わったら以下の要領で /vagrantディレクトリに移動した上で、Karmaを起動するコマンドを入力します。

```sh
cd /vagrant/
./node_modules/karma/bin/karma start ./karma.conf.js
```

Karma v0.13.22 server started at http://localhost:9877/ というメッセージが表示されているのを確認したら、

http://192.168.33.39:9877/

にアクセスすると、以下の様な画面が表示されるはずです

![2016-04-08 17 47 16](https://cloud.githubusercontent.com/assets/950924/14378802/0f37f8a6-fdb2-11e5-8921-2d82e66c7a38.png)

### まずはJasmine自体に慣れてみる

この段階ではテスト対象となる記述が全く無い状態なので、本来は意味がないのですが以下の様な内容を書いてみます

```javascript
describe('Gist', function() {
  describe('fetchメソッド', function() {
    it('定義されてる', function(){
      expect(true).toBe(true);
    });
  });
});  
```

上記内容を記述して保存した後にターミナルに戻ってみると自動的にテストが実行されて緑色の文字でTOTAL: 1 SUCCESSという文字が表示されてると思います

![2016-04-08 17 53 31](https://cloud.githubusercontent.com/assets/950924/14379054/1470b686-fdb3-11e5-828d-dd5032cf74ca.png)


また、Webブラウザで

http://192.168.33.39:9877/debug.html

にアクセスすると、Webブラウザ上でもJavaScriptが実行されてその結果が表示されてるかと思います

![2016-04-08 17 56 02](https://cloud.githubusercontent.com/assets/950924/14379075/355cf1f2-fdb3-11e5-993b-10e335de4363.png)

期待される値と実際の値が両方共にtrueなので、当然のことながらこのテストは成功します

### fetch()メソッドが定義されてるというテストを書く

メソッドやプロパティが定義されてるかどうかを評価するために、JasmineにはtoBeDefined()という記法があるのでそれを使ってテストを以下の様に書いてみます

```javascript
describe('Gist', function() {
  beforeEach(function() {
    this.gist = new Gist();
  }); 
  describe('fetchメソッド', function() {
    it('定義されてる', function(){
      expect(this.gist.fetch()).toBeDefined();
    });
  });
});
```

上記内容を記述して保存するとテストが再度自動的に実行されますがGistクラスが定義されてるファイルをまだ実装してないので

```javascript
this.gist = new Gist();
```

とインスタンス化しようとしても以下のようにエラーになります

![2016-04-08 18 03 15](https://cloud.githubusercontent.com/assets/950924/14379264/36dd750a-fdb4-11e5-8814-ec172653953b.png)

### Gistクラスを定義したファイルを作成して仮実装する

srcディレクトリを開いて、新規にgist.js というファイルを作り以下の内容を記述します

```javascript
var Gist = (function() {
  function Gist(){
  }
  Gist.prototype.fetch = function(){
    return true;
  };
  return Gist;
})();
```

上記内容を記述して保存をすると、再度自動的にテストが実行されて、今度はテストが成功してるかと思います
![2016-04-08 18 11 22](https://cloud.githubusercontent.com/assets/950924/14379547/6c66ea02-fdb5-11e5-8550-a2446e108e10.png)


今回は時間の都合でJavaScriptでのクラス定義の細かい説明は割愛しますが、別に資料としてまとめてるので、詳しいことはそちらを参照してください

JavaScriptとPHPでのクラス定義を対比させてみた #12 
https://github.com/h5y1m141/step-up-javascript/issues/12


### fetch()メソッドを仮実装した理由

先ほどのコードで

```javascript
  Gist.prototype.fetch = function(){
    return true;
  };
```

とfetch()の実際の処理は単にtrueを返すだけの処理であまり意味がない状態なのですが、この仮の段階の実装で成功しないテストは、本実装でも成功しない可能性が高くなり、そもそもどこに原因があるのか調査に手間取る可能性があるためにこのようにしてます

テストに書き慣れない最初のうちは面倒かもしれませんが、

- テストを書く
- 仮実装をしてテストにパスすることを確認する
- 最終的な実装をする

という流れで作業していくことをオススメします

### fetch()メソッドを実装する
