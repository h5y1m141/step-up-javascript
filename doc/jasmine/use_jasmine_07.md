## APIからJSONが得られる記述の説明

spyOnの機能を活用してthis.gistのfetch()が呼ばれた時に、callFake以降で定義されてる以下処理を行うように定義してます

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

また、APIからJSONが得られる記述を以下のようにして


```javascript
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
```

上記でdeferred.resolve()にてJSONを文字列化した値が返るように定義しているのでここの流れは以下のようになっていきます

1. this.gist.fetch()が実施される
2. fetch()はbeforeEach内のspyOnの処理内容が評価されるため、deferred.promise()が返る
3. deferred.promise()の場合にはそれに紐づくコールバック関数はpromiseオブジェクトのdone()を通じて実行される
4. done()コールバック関数のdataは、dummyResponseの値が返ってくるようにspyOnにて定義しており、JSON.parse()処理でJSON化する
5. JSON化されたresultオブジェクトは配列になっており、銭湯のauthorプロパティの値が期待されたものであることを評価します
