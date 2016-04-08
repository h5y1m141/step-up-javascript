## fetch()メソッドが定義されてるというテストを書く

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
