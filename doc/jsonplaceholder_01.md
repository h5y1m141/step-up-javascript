## クラスを定義して最初のテストを書く

先ほど想定する仕様を考えたので、ここから実際にJasmineでテストを書き上ながら作業を進めていきます。

### WebAPIにアクセスする時のURL一覧

JSONPlaceholderのWebAPIを通じて投稿情報のリソースに対して処理をする場合のHTTPメソッドと エンドポイントの対応関係は以下のようになります。

|HTTPメソッド | エンドポイント |
|---------|---------|
| GET | http://jsonplaceholder.typicode.com/posts |
| GET | http://jsonplaceholder.typicode.com/posts/1 |
| POST | http://jsonplaceholder.typicode.com/posts |
| PUT | http://jsonplaceholder.typicode.com/posts/1 |
| PATCH | http://jsonplaceholder.typicode.com/posts/1 |
| DELETE | http://jsonplaceholder.typicode.com/posts/1 |

### エンドポイントのURLの一部を共通化

それぞれのリソースに対する操作を考える時に、エンドポイントのURLの、http://jsonplaceholder.typicode.com の箇所はすべて同じになるのでこの部分は共通化したほうがコードの見通しが良いかと思います。

具体的には

```javascript
var jsonPlaceHolder = new JsonPlaceHolder();
console.log(jsonPlaceHolder.rootURL)
```

というコードがあった場合に、console.logの出力結果として**http://jsonplaceholder.typicode.comが返る**ようなイメージです。

まずはこの部分の振る舞いについて、Jasmineでテストを書きながら作業を進めてみたいと思います。

### 最初のテストを書く

specディレクトリに、jsonPlaceHolder_spec.jsというファイルを作成して以下内容を書きます


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
});
```

Vagrantの環境にsshしてから

```sh
cd /vagrant/
./node_modules/karma/bin/karma start ./karma.conf.js
```

として、Karmaを起動させてから

http://192.168.33.39:9877/

にアクセスしてみてください。

テストを書いただけで、実際にクラスの実装が終わってないので、当然のことながら、ターミナル上ではテストが失敗してるかと思います。

```sh
  JsonPlaceHolder
    rootURLについて
      ✗ 定義されてる
        ReferenceError: JsonPlaceHolder is not defined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:4:27)

        TypeError: Cannot read property 'rootURL' of undefined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:8:29)

Chrome 49.0.2623 (Mac OS X 10.11.4) JsonPlaceHolder rootURLについて 定義されてる FAILED
        ReferenceError: JsonPlaceHolder is not defined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:4:27)
        TypeError: Cannot read property 'rootURL' of undefined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:8:29)
      ✗ 値が確認できる
        ReferenceError: JsonPlaceHolder is not defined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:4:27)

        TypeError: Cannot read property 'rootURL' of undefined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:11:29)

Chrome 49.0.2623 (Mac OS X 10.11.4) JsonPlaceHolder rootURLについて 値が確認できる FAILED
        ReferenceError: JsonPlaceHolder is not defined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:4:27)
        TypeError: Cannot read property 'rootURL' of undefined
            at Object.<anonymous> (/vagrant/spec/jsonPlaceHolder_spec.js:11:29)
```

### テストが通るようにJsonPlaceHolderクラスを実装する

srcディレクトリ直下にjsonPlaceHolder.jsという名前のファイルを作成して以下内容を記述します。

```javascript
var JsonPlaceHolder = (function(){
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
  };  
  return JsonPlaceHolder;
})();
```

上記内容を記述すると、Karmaが自動的に内容を読みこんでテストが実行され以下のように今度はテストがパスするかと思います。

```sh
  JsonPlaceHolder
    rootURLについて
      ✓ 定義されてる
      ✓ 値が確認できる
```


最初のテストが書けたので、次ではWebAPIに対する処理を充実させていきます。
