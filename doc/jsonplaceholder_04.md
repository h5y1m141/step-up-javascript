## 投稿を作成する処理を実装する

これまでは、HTTPメソッドのGETのみでしたが、最後にGET以外の処理についても簡単に説明しておきます。

### まずはcreateメソッドが定義されてるテストを書く

specディレクトリのjsonPlaceHolder_spec.jsを以下のように修正します

```javascript
describe('JsonPlaceHolder', function() {
  var jsonPlaceHolder;
  beforeEach(function() {
    jsonPlaceHolder = new JsonPlaceHolder();
  });
  describe('rootURLについて', function() {
    // 省略
  });
  describe('Postについて', function() {
    // 省略
    describe('WebAPIにアクセスするメソッドについて', function() {
      describe('indexについて', function() {
        // 省略
      });
      describe('showについて', function() {
        // 省略
      });
      // 追加箇所
      describe('createについて', function() {
        it('定義されてる', function(){
          expect(jsonPlaceHolder.post.create()).toBeDefined();
        });
      });
    });
  });
});
```

これまでの作業と同様に上記追加したことで、1つテストが失敗してるかと思います。

```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
    Postについて
      _request()メソッドについて
        ✓ WebAPIにアクセスする個々のメソッドが呼ばれる時には通信処理を担う_request()メソッドが呼ばれる
      WebAPIにアクセスするメソッドについて
        indexについて
          ✓ 定義されてる
          ✓ 一覧を取得できる
        showについて
          ✓ 定義されてる
          ✓ 指定された投稿情報が取得できる
        createについて
          ✗ 定義されてる
        TypeError: jsonPlaceHolder.post.create is not a function
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:75:39)

Chrome 49.0.2623 (Mac OS X 10.10.5) JsonPlaceHolder Postについて WebAPIにアクセスするメソッドについて createについて 定義されてる FAILED
        TypeError: jsonPlaceHolder.post.create is not a function
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:75:39)

Chrome 49.0.2623 (Mac OS X 10.10.5): Executed 10 of 10 (1 FAILED) (0.343 secs / 0.014 secs)
TOTAL: 1 FAILED, 9 SUCCESS
```

### テストに通るようにcreateをまずは仮実装する

ひとまずテストが通ればOKなのでロジックは気にせずひとまず以下のように実装します。

```javascript
var JsonPlaceHolder = (function(){
  // 中略
  Post.prototype.show = function(id){
    // 中略
  };
  // 以下追加箇所
  Post.prototype.create = function(){
    var params;
    return this._request(params);  // (2)
  };
  // 以下省略
})();

```

上記の実装により、先ほどまで失敗していたテストが以下のようにパスします。

```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
    Postについて
      _request()メソッドについて
        ✓ WebAPIにアクセスする個々のメソッドが呼ばれる時には通信処理を担う_request()メソッドが呼ばれる
      WebAPIにアクセスするメソッドについて
        indexについて
          ✓ 定義されてる
          ✓ 一覧を取得できる
        showについて
          ✓ 定義されてる
          ✓ 指定された投稿情報が取得できる
        createについて
          ✓ 定義されてる
```


### createのテストを1つ追加してそのテストに通るように実装する

先程はcreateが定義されてるというテストのみだったので、実際の振る舞いについてテストを1つ追加して、それに通るように作業を進めていきます。


```javascript
describe('JsonPlaceHolder', function() {
  var jsonPlaceHolder;
  beforeEach(function() {
    jsonPlaceHolder = new JsonPlaceHolder();
  });
  // 中略
  describe('Postについて', function() {
    // 中略
    describe('WebAPIにアクセスするメソッドについて', function() {
      beforeEach(function() {
        var fakeResult = [
          {id: 1, title: 'title1', body: 'body1' },
          {id: 2, title: 'title2', body: 'body2' }
        ];
        spyOn(jsonPlaceHolder.post, 'index').and.callFake(function(){
          var deferred = $.Deferred();
          deferred.resolve(fakeResult);
          return deferred.promise();
        });
        spyOn(jsonPlaceHolder.post, 'show').and.callFake(function(){
          var deferred = $.Deferred();
          deferred.resolve(fakeResult[0]);
          return deferred.promise();
        });
        // 以下を追加
        spyOn(jsonPlaceHolder.post, 'create').and.callFake(function(param){
          var deferred = $.Deferred();
          // 基本的には引数に渡したparamオブジェクトがそのまま返ってくる仕様のようなので
          // resolveにはparamオブジェクトをひとまずそのまま指定します
          deferred.resolve(param);
          return deferred.promise();
        });
        describe('indexについて', function() {
          // 省略
        });
        describe('showについて', function() {
          // 省略
        });
        describe('createについて', function() {
          it('定義されてる', function(){
            expect(jsonPlaceHolder.post.create()).toBeDefined();
          });
          // 以下を追加
          it('投稿を作成できる', function(){
            var result,
                promise,
                data = {
                  id: 1,
                  title: '投稿情報のタイトル',
                  body: '投稿情報の本文です'
                };
            promise = jsonPlaceHolder.post.create(data);
            promise.done(function(response){
              result = response;
            });
            expect(result.title).toEqual('投稿情報のタイトル');
          });
        });
      });
    });
  });
});
```


投稿情報を作成するときには、

- HTTPメソッドをPOSTにする
- これまでの投稿情報を取得する処理では必要としてなかったdataプロパティを準備する
  - このプロパティにJsonPlaceHolderのAPIに対して作成する投稿情報の値をセットする
  
という処理を行い、実装は以下のようになります。

```javascript
var JsonPlaceHolder = (function(){
  function Post(rootURL){
    this.rootURL = rootURL;
  };
  Post.prototype._request = function(params){
    var deferred = $.ajax(params);
    return deferred.promise();
  };
  Post.prototype.index = function(){
    var params = {
      url: this.rootURL + '/posts',
      method: 'GET'
    };
    return this._request(params);
  };
  Post.prototype.show = function(id){
    var params = {
      url: this.rootURL + '/posts' + id,
      method: 'GET'
    };
    return this._request(params);
  };
  Post.prototype.create = function(_params){
    var params = {
      url: this.rootURL + '/posts',
      method: 'POST',
      data: _params
    };
    return this._request(params);
  };
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);
  };
  return JsonPlaceHolder;
})();
```

先ほどリファクタリングしておいたことで、今回のcreateの実装は比較的容易に済むことが実感できたかと思います。

### 最後に

投稿情報の取得、作成の処理を実装してもらいましたが、残りの処理（特定の投稿情報の更新処理や、特定の更新処理の削除）も

- HTTPメソッドをそれぞれの処理に合わせた形のものを指定
- 必要に応じてパラメータを設定

するだけで処理が行えるかと思いますので残りの処理はご自身で考えながら作業してみてください。

なお、これまでの処理を含めて残りの処理の回答は以下ディレクトリにまとめてあります。

https://github.com/h5y1m141/step-up-javascript/tree/develop/unit_test
