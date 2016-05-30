### まずはJasmine自体に慣れてみる

実際の仕事で**メソッドが定義されてる**ことについてテストを書くのは冗長なので実際には無いかと思うのですが、まずはテストを書くことになれるためにこのテストを書いてみます。

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

期待される値と実際の値が両方共にtrueなので、当然のことながらこのテストは成功します。
