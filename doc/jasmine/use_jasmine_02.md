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

この段階ではまだGistクラスを定義したファイル自体がないので、当然のことながらエラーになるので、この段階では気にしないでください。

ひとまず次でGistクラスを定義していくことにします。
