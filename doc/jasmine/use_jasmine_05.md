## 最初に書いたテストを修正する

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

編集箇所のコードの説明について順番に説明します。

### 1についての説明

WebAPIと連携するテストを書く時に毎回アクセスするのは開発効率が悪かったりするので、単体テストで必要となるパーツを擬似的に再現するための仕組みを活用することが多々あり、上記修正した(1)でその処理をしています。

個々の処理でポイントになる箇所を順番に説明していきます。
