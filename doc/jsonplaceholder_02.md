## 投稿情報一覧を取得する処理を実装する

テストを書きながら投稿情報一覧を取得する処理を順番に実装します


### まずはindexメソッドが定義されてるテストを書く

少し周りくどいかもしれませんが、まずはindexメソッドが定義されてるテストを書くことにします。

specディレクトリのjsonPlaceHolder_spec.jsを以下のように修正します

```javascript
describe('JsonPlaceHolder', function() {
  //中略
  describe('rootURLについて', function() {
    //中略
  });
  // 以下追加内容
  describe('Postについて', function() {
    describe('indexについて', function() {
      it('定義されてる', function(){
        expect(jsonPlaceHolder.post.index()).toBeDefined();
      });
    });
  });
});
```

これを追加してテスト結果を見ると、indexについては何も実装してないので以下のようにテストは失敗します。

```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
    Postについて
      indexについて
        ✗ 定義されてる
        TypeError: Cannot read property 'index' of undefined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:17:37)

Chrome 49.0.2623 (Mac OS X 10.10.5) JsonPlaceHolder Postについて indexについて 定義されてる FAILED
        TypeError: Cannot read property 'index' of undefined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:17:37)

Chrome 49.0.2623 (Mac OS X 10.10.5): Executed 5 of 5 (1 FAILED) (0.608 secs / 0.008 secs)
TOTAL: 1 FAILED, 4 SUCCESS
```

<div style="page-break-before: always"></div>

### テストに通るようにindexメソッドを仮実装する

ひとまずindexメソッドが定義されてるというテストが通ればOKなのでロジックは気にせずひとまず以下のように実装します

```javascript
var JsonPlaceHolder = (function(){
  function Post(){}; // (1)
  Post.prototype.index = function(){
    return true;     // (2)
  };
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);  // (3)
  };
  return JsonPlaceHolder;
})();
```

#### indexの実装上のポイント

上記コードのポイントになる箇所を順番に説明します。

1. JsonPlaceHolderの子となるオブジェクトがindex()などのメソッドを持つような構造にしたいので、JsonPlaceHolder内部で新たにPostというクラスを定義するためにこのように書きます。
2. ひとまずこの段階ではindex()の細かいロジックは無視して仮にtrueを返すようにします。
3. JsonPlaceHolderのpostに Postクラスをインスタンス化したオブジェクトを代入することで以下のようにした時に、実際にはPostクラスのindex()が呼びだされるようになります

```javascript
var jsonPlaceHolder = new JsonPlaceHolder();
// 実際にはPost.prototype.indexの箇所が実行される
jsonPlaceHolder.post.index();
```

上記のように実装するとテスト結果は以下のようにパスします

```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
    Postについて
      indexについて
        ✓ 定義されてる
```

### indexを実装する

先ほどの段階ではメソッドが定義されてるというテストが通る仮の実装だったので、実際のindex()を実装していきます。

specディレクトリのjsonPlaceHolder_spec.jsを以下のように修正します

```javascript
describe('JsonPlaceHolder', function() {
  var jsonPlaceHolder;
  beforeEach(function() {
    jsonPlaceHolder = new JsonPlaceHolder();
  });
  //中略
  describe('Postについて', function() {
    beforeEach(function () {
      spyOn(jsonPlaceHolder.post, 'index').and
        .callFake(function(){
        var fakeResult = [
          { id: 1, title: 'title1', body: 'body1'},
          { id: 2, title: 'title2', body: 'body2'}
        ];
        var deferred = $.Deferred();
        deferred.resolve(fakeResult);
        return deferred.promise();
      });
    });
    describe('indexについて', function() {
      it('定義されてる', function(){
        expect(jsonPlaceHolder.post.index()).toBeDefined();
      });
      it('一覧を取得できる', function(){
        var result,
            promise;
        promise = jsonPlaceHolder.post.index();
        promise.done(function(response){
          result = response;
        });
        expect(result[0].id).toEqual(1);
      });
    });
  });
});
```

テストを追加した箇所に対してまだ実装が何もされてないので、再びテストに失敗するかと思います。

```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
    Postについて
      indexについて
        ✓ 定義されてる
        ✗ 一覧を取得できる
        TypeError: promise.done is not a function
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:23:17)

Chrome 49.0.2623 (Mac OS X 10.10.5) JsonPlaceHolder Postについて indexについて 一覧を取得できる FAILED
        TypeError: promise.done is not a function
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:23:17)

Chrome 49.0.2623 (Mac OS X 10.10.5): Executed 6 of 6 (1 FAILED) (0.326 secs / 0.007 secs)
```

今追加したテストに通るように、src/jsonPlaceHolder.jsを修正します

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
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);
  };
  return JsonPlaceHolder;
})();
```

上記のように修正してテストを再度実行すると以下のようにパスします。

```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
    Postについて
      indexについて
        ✓ 定義されてる
        ✓ 一覧を取得できる
```


### この段階でのそれぞれの実装内容

この段階でのそれぞれのソースコードの全体を以下まとめておきます。

#### spec/jsonPlaceHolder_spec.js

```javascript
describe('JsonPlaceHolder', function() {
  var jsonPlaceHolder;
  beforeEach(function() {
    jsonPlaceHolder = new JsonPlaceHolder();
  });
  describe('rootURLについて', function() {
    it('定義されてる', function(){
      expect(jsonPlaceHolder.rootURL).toBeDefined();
    });
    it('値が確認できる', function(){
      expect(jsonPlaceHolder.rootURL).toBe('http://jsonplaceholder.typicode.com');
    });
  });
  describe('Postについて', function() {
    beforeEach(function () {      
      spyOn(jsonPlaceHolder.post, 'index').and
        .callFake(function(){
        var fakeResult = [
          {id: 1, title: 'title1', body: 'body1' },
          {id: 2, title: 'title2', body: 'body2' }
        ];
        var deferred = $.Deferred();
        deferred.resolve(fakeResult);
        return deferred.promise();
      });
    });
    describe('indexについて', function() {
      it('定義されてる', function(){
        expect(jsonPlaceHolder.post.index()).toBeDefined();
      });
      it('一覧を取得できる', function(){
        var result,
            promise;
        promise = jsonPlaceHolder.post.index();
        promise.done(function(response){
          result = response;
        });
        expect(result[0].id).toEqual(1);
      });
    });
  });
});
```

#### src/jsonPlaceHolder.js

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
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);
  };  
  return JsonPlaceHolder;
})();
```

ここまでで投稿情報一覧を取得する処理は一通り完成したので、次は投稿情報に対する別の処理を追加していきます。
