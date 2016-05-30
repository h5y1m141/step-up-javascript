## beforeEachとspyOnについて

beforeEachとspyOnは慣れないうちは処理内容がイメージしづらいかもしれないので順番に説明していきます。

### beforeEachについて

テストを書く時に以下の様なことを行う必要が比較的多くあるのですが、そのような時にはbeforeEachの処理を利用することで対処できます

- 評価対象のクラスを初期化する
- （今回のように）WebAPIの振る舞いを擬似的に行うようなモックとなるオブジェクトを定義したい

使い方としては以下の様な形になります。

```javascript
describe('対象のクラス名などを記述', function() {
  beforeEach(function() {
    // 事前に行いたい処理を記述
    // 以下の様な場合には評価対象のメソッド１、評価対象のメソッド2
    // それぞれのdescribe句で処理が行われます
  });
  describe('評価対象のメソッド１', function() {
    it('実際の評価内容を記述', function(){
    });
  });
  describe('評価対象のメソッド２', function() {
    it('実際の評価内容を記述', function(){
    });
  });
});
```

### 参考：beforeEachと似た処理のbeforeAll

beforeEachと似た処理として、beforeAllがあるのですがこちらの場合には一度だけ実施されます。

以下はJasmineの公式ドキュメントから引用してます。

```javascript
describe("A spec using beforeAll and afterAll", function() {
  var foo;

  beforeAll(function() {
    foo = 1;
  });

  afterAll(function() {
    foo = 0;
  });

  it("sets the initial value of foo before specs run", function() {
    expect(foo).toEqual(1);
    foo += 1;
  });

  it("does not reset foo between specs", function() {
    expect(foo).toEqual(2);
  });
});
```
  
### spyOnについて

Jasmineでは、Spyという機能で単体テストで必要となるパーツを擬似的に再現することが出来ます。

Spyの機能は豊富なので今回使ったspyOn機能についてのみ説明していきます


```javascript
spyOn(this.gist, 'fetch')
```

上記のように記述することで

- beforeEach内で初期化されてたthis.gistオブジェクトが持つfetchメソッドがJasmineのSpy管理下に置かれます
- JasmineのSpy管理下に置かれたメソッドは**本来の実装内容は実施されずspyOnの定義内容に沿った処理**がされます

という形になります。

今回は、this.gistのfetch()が呼ばれた時に、callFake以降で定義されてる以下処理を行うように定義してます。

```javascript
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
```

上記のようにしたことで、実際のWebAPIにアクセスしたかのように振る舞ってくれます。

なお、上記のDeferredとPromiseについては、爆速でわかるjQuery.Deferred超入門という以下URLの記事がとてもわかりやすいので、詳しいことはこちらを御覧ください

http://techblog.yahoo.co.jp/programming/jquery-deferred/
