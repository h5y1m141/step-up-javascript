## APIアクセス部分をリファクタリングする


### 先程まで実装したコードについて

全体像を改めて以下記載します


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
      var expectURL = 'http://jsonplaceholder.typicode.com';
      expect(jsonPlaceHolder.rootURL).toBe(expectURL);
    });
  });
  describe('Postについて', function() {
    beforeEach(function() {
      var fakeResult = [
        {id: 1, title: 'title1', body: 'body1' },
        {id: 2, title: 'title2', body: 'body2' }
      ];
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
    describe('showについて', function() {
      it('定義されてる', function(){
        expect(jsonPlaceHolder.post.show()).toBeDefined();
      });
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

<div style="page-break-before: always"></div>

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
        deferred = $.ajax(params);  // (*重複)
    return deferred.promise();
  };
  Post.prototype.show = function(id){
    var params = {
      url: this.rootURL + '/posts' + id,
      method: 'GET'
    },
        deferred = $.ajax(params);  // (*重複)
    return deferred.promise();
  };
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);
  };
  return JsonPlaceHolder;
})();
```

<div style="page-break-before: always"></div>

### この段階で気になる箇所

上記コードのコメントの**(*重複)**の箇所が気になるのでここをリファクタリングします。

どのようにするかというと

- パラメーターを引数に渡されてajaxを使ったリクエスト処理を行うだけの_requestというメソッドを新規に実装する
- index,showが実行される時には、_requestというメソッドを呼び出す
  - index,showはそれぞれリクエストのパラメーターの生成だけに専念する
  
ということを考えます。

<div style="page-break-before: always"></div>

### 上記の仕様をふまえてテストを修正


以下のように修正します。

今回の一番のポイントは、以下コードの(1)の箇所のtoHaveBeenCalledです。


1. index/showが実行
2. 上記によって_requestが呼ばれる
3. _requet内で$ajaxが実行される

という流れになるので、index,showの実行時には必ず**_requestが呼ばれる**必要があり、その振る舞いについてしっかりとテストをしておく必要があるかと思います。

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
      var expectURL = 'http://jsonplaceholder.typicode.com';
      expect(jsonPlaceHolder.rootURL).toBe(expectURL);
    });
  });
  describe('Postについて', function() {
    // 以下を追加
    describe('_request()メソッドについて', function() {
      beforeEach(function () {
        spyOn(jsonPlaceHolder.post, '_request').and.callThrough();
      });
      it('WebAPIにアクセスする個々のメソッドが呼ばれる時には通信処理を担う_request()メソッドが呼ばれる', function(){
        jsonPlaceHolder.post.index();
        expect(jsonPlaceHolder.post._request).toHaveBeenCalled();  // (1)
        jsonPlaceHolder.post.show();
      });
    });
    // 説明を追加するためにdescribeを挿入してます
    describe('WebAPIにアクセスするメソッドについて', function() {
      // これ以降は先程の処理をそのまま維持
      beforeEach(function() {
        var fakeResult = [
          {id: 1, title: 'title1', body: 'body1' },
          {id: 2, title: 'title2', body: 'body2' }
        ];
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
      describe('showについて', function() {
        it('定義されてる', function(){
          expect(jsonPlaceHolder.post.show()).toBeDefined();
        });
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
});
```

<div style="page-break-before: always"></div>

#### 参考までにnode-twitterの構造を紹介

今回のようなWebAPIと連携するクラスを作る場合は

- パラメーターを生成する処理
- パラメーターを受け取って実際にWebAPIにリクエストを投げる処理

という設計にすることが多い印象を持ってます。

参考までにGitHub上にあるnode-twitterの[コミットID6833c8a](https://github.com/desmondmorris/node-twitter/commit/6833c8a61e92611b3aec671a61a229ba15d2985d)時点のソースコードの一部を引用します

https://github.com/desmondmorris/node-twitter/blob/master/lib/twitter.js

```javascript
'use strict';

/**
 * Module dependencies
 */

var url = require('url');
var streamparser = require('./parser');
var request = require('request');
var extend = require('deep-extend');

// Package version
var VERSION = require('../package.json').version;

function Twitter (options) {
  // 中略
}
// 中略
Twitter.prototype.__request = function(method, path, params, callback) {
  // 中略
  this.request(options, function(error, response, data){
```

TwitterAPIと連携するような処理の場合には、パラメーターのチェックやエラーハンドリングなど細かい所をしっかり行う必要があるのですが、上記のような設計の場合にしておくことで、どこでその処理を行うのかが決めやすくなると思います。


### 修正したテストにパスするように実装する

以下のように実装します。

```javascript
var JsonPlaceHolder = (function(){
  function Post(rootURL){
    this.rootURL = rootURL;
  };
  Post.prototype._request = function(params){  // (1)
    var deferred = $.ajax(params);
    return deferred.promise();
  };
  Post.prototype.index = function(){
    var params = {
      url: this.rootURL + '/posts',
      method: 'GET'
    };
    return this._request(params);  // (2)
  };
  Post.prototype.show = function(id){
    var params = {
      url: this.rootURL + '/posts' + id,
      method: 'GET'
    };
    return this._request(params);  // (2)
  };
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);
  };
  return JsonPlaceHolder;
})();
```

1. 新規に_requestを実装して、ここで$ajaxを利用
2. これまでindexやshowで$.ajax(params)を呼び出していたが、その代わりに、新規に実装した_requestを呼び出す


上記の変更によって今回新規に追加したテストだけでなく、以前からのテストもすべてパスします。

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
```


今回のようなリファクタリングを行う時に、従来から実装してた処理に影響が生じないか気にするかと思います。

これまでテストを書きながら実装を進めていたことで、今回のような変更をしても、従来の処理に影響が出ないことが確認でき、かつ、コードの見通しもよくなるのでテストを書きながら作業をすすめてきたことの恩恵を実感できるかと思います。

これまでの作業は、HTTPメソッドでGETを使った処理のみだったので次では、HTTPメソッドでPOSTを使う投稿情報を作成する処理を実装します
