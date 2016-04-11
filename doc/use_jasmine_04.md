## fetch()メソッドを実装する

先ほどの段階ではメソッドが定義されてるというテストにパスした状態で、実際にfetch()自体の中身を実装してなかったのでここでfetch()メソッドを実装していきます

### fetch()の仕様

fetch()メソッドを実行するとあらかじめ設定済のURLからJSONの情報を取得することが出来るという仕様を想定してましたが、実際にサーバー上にあらかじめ準備したJSONがあるのでそれを取得できるように実装を進めていきます

### URLについて

Gist上に、JSONデーターを生成してあり、そのJSONにアクセスするURLは以下になります。

https://gist.githubusercontent.com/h5y1m141/f52eece296999105742c/raw/f3291233f69032a0b168192e11958575836833c2/react.json

上記だと長いので、bit.lyの短縮URLも以下記載しておきます

http://bit.ly/step-up-javascript-01

### 最初に書いたテストを修正する

先ほど書いたテストを以下のように修正します

```javascript
describe('Gist', function() {
  beforeEach(function() {
    this.gist = new Gist();
  }); 
  describe('fetchメソッド', function() {
    // (1) 以下を追加
    beforeEach(function () {
      spyOn(this.gist, 'fetch').and.callFake(function(){
        var deferred = $.Deferred();
        var dummyResponse = [
          {
            'author': 'おやまだひろし',
            'text': 'はじめてのReact.js'
          },
          {
            'author': 'Hiroshi Oyamada',
            'text': 'First Step ReactJS'
          }
        ];
        deferred.resolve(JSON.stringify(dummyResponse));
        return deferred.promise();
      });
    });
    // ここまでが(1)の追加箇所
    it('定義されてる', function(){
      expect(this.gist.fetch()).toBeDefined();
    });
    // (2) 以下を追加
    it('APIからJSONが得られる', function(){
      var promise,
          result;
      promise = this.gist.fetch();
      promise.done(function(data){
        result = JSON.parse(data); 
      });
      expect(result[0].author).toEqual('おやまだひろし');
    });
    // ここまでが(2) の追加箇所
  });
});
```

### 編集箇所のコードの説明

#### 1についての説明

WebAPIと連携するテストを書く時に毎回アクセスするのは開発効率が悪かったりするので、単体テストで必要となるパーツを擬似的に再現するための仕組みを活用することが多々あります。

Jasmineでは、Spyという機能で単体テストで必要となるパーツを擬似的に再現することが出来ます。

#### beforeEachについて

まず

#### spyOnについて
```javascript
spyOn(this.gist, 'fetch')
```

### callFake


今回は返り値を定義していますが、もしも返り値が不要な場合には、別のメソッド（callThrough）というものもあるので、状況によってこの辺りを使い分けていきます

という記述で、this.gist.


テスト対象オブジェクトが持つメソッドの戻り値を固定値に変更したり、そのメソッドが実行されたかどうかを検証したりするために、Spy機能を使用する方法を解説

実際にWebにはアクセスせずに、期待されるJSONをMockのオブジェクトとして定義
