## 特定の投稿情報を取得する処理を実装する

先程は投稿情報一覧を取得する処理について、仕様をふまえて最初にテストを書き、そのテストが通るように実装するという流れで作業をしていきました。

今回も同様の流れで特定の投稿情報を取得する処理を実装していきます。

### まずはshowメソッドが定義されてるテストを書く

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
    describe('indexについて', function() {
      // 省略
    });
    // 以下が追加箇所
    describe('showについて', function() {
      it('定義されてる', function(){
        expect(jsonPlaceHolder.post.show()).toBeDefined();
      });
    });
  });
});
```

上記追加したことで、1つテストが失敗してるかと思います。

```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
    Postについて
      indexについて
        ✓ 定義されてる
        ✓ 一覧を取得できる
      showについて
        ✗ 定義されてる
        TypeError: jsonPlaceHolder.post.show is not a function
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:42:37)

Chrome 49.0.2623 (Mac OS X 10.11.4) JsonPlaceHolder Postについて showについて 定義されてる FAILED
        TypeError: jsonPlaceHolder.post.show is not a function
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:42:37)

Chrome 49.0.2623 (Mac OS X 10.11.4): Executed 6 of 6 (1 FAILED) (0.615 secs / 0.008 secs)
TOTAL: 1 FAILED, 5 SUCCESS
```

### テストに通るようにshowをまずは仮実装する


ひとまずshow()が定義されてるというテストが通ればOKなのでロジックは気にせずひとまず以下のように実装します。

```javascript
var JsonPlaceHolder = (function(){
  function Post(rootURL){
    this.rootURL = rootURL;
  };
  Post.prototype.index = function(){
    var params = {
      url: this.rootURL + '/posts',
      method: 'GET'
    },
        deferred = $.ajax(params);
    return deferred.promise();
  };
  Post.prototype.show = function(){
    return true;
  };
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);
  };
  return JsonPlaceHolder;
})();
```

上記実装したことで、先ほど失敗していたテストが以下のようにパスします。

```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
    Postについて
      indexについて
        ✓ 定義されてる
        ✓ 一覧を取得できる
      showについて
        ✓ 定義されてる
```

### showについてのテストを1つ追加する

先程の段階ではメソッドが定義されてるというテストのみだったので、showで期待される動作について1つテストを追加します。

先ほどまでは投稿情報の仮のデーターをfakeResultという名前で配列で格納していました。
その仮のデーターをindexだけではなくshowでも利用したいので変数宣言箇所を変更することで対応してます。（以下コメントの*1の箇所です）

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
    // 以下のように変更します
    beforeEach(function () {
      var fakeResult = [
        {id: 1, title: 'title1', body: 'body1' },
        {id: 2, title: 'title2', body: 'body2' }
      ];  // （*1）
      spyOn(jsonPlaceHolder.post, 'index').and
        .callFake(function(){
          var deferred = $.Deferred();
          deferred.resolve(fakeResult);
          return deferred.promise();
      });
      spyOn(jsonPlaceHolder.post, 'show').and
        .callFake(function(){
          var deferred = $.Deferred();
          deferred.resolve(fakeResult[0]);
          return deferred.promise();
      });
    });
    describe('indexについて', function() {
      // 省略
    });
    describe('showについて', function() {
      it('定義されてる', function(){
        expect(jsonPlaceHolder.post.show()).toBeDefined();
      });
      // 以下が追加箇所
      it('指定された投稿情報が取得できる', function(){
        var result,
            promise;
        promise = jsonPlaceHolder.post.show(1);
        promise.done(function(response){
          result = response;
        });
        expect(result.id).toEqual(1);
      });
    });
  });
});
```

### 上記テストにパスするように実装する

showメソッドでは

− 投稿情報を特定するためにIDを引数にとる
- エンドポイントとなるURLは、投稿情報一覧を取得する時と異なる

という点を踏まえて、以下のように実装します


```sh
var JsonPlaceHolder = (function(){
  function Post(rootURL){
    this.rootURL = rootURL;
  };
  Post.prototype.index = function(){
    var params = {
      url: this.rootURL + '/posts',
      method: 'GET'
    },
        deferred = $.ajax(params);
    return deferred.promise();
  };
  Post.prototype.show = function(id){
    var params = {
      url: this.rootURL + '/posts' + id,
      method: 'GET'
    },
        deferred = $.ajax(params);
    return deferred.promise();
  };
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);
  };
  return JsonPlaceHolder;
})();
```

上記のように実装することで以下のようにテストにパスします


```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
    Postについて
      indexについて
        ✓ 定義されてる
        ✓ 一覧を取得できる
      showについて
        ✓ 定義されてる
        ✓ 指定された投稿情報が取得できる
```

上記の実装でも問題はないのですが、index,showそれぞれで$.ajaxの記述が重複してる点が少し気になります。

今後、投稿情報を作成したり、更新したりという処理を増やすたびに、$.ajaxの記述が重複してくので次で少しリファクタリングすることにします。
