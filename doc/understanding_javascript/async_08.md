## jQueryのDeferred応用編

jQueryのDeferredで処理が入れ子状にならないようにすることが出来ることを先ほど説明しましたが、今度は

- A、B、Cという処理がある
- **AとBが完了したらCを実行する**というようにある処理を連結してそれが完了したら最後の処理を行う

というような場合にjQueryのDeferredの機能を利用することで見通しの良いコードで書けるようになるので最後にその例についても取り上げます

最初に飲食店でのオペレーションを例に非同期処理の概念を説明してるので、その例えをふまえて

- 以下２つの作業を同時に行う
  - 食べ物の調理を行う
  - 飲み物の準備を行う
- 上記２つが完了したらお客さんを呼び出す

という状況を表現するサンプルコードを考えてみたいと思います。

## ある処理を連結させてそれが完了したら最後の処理を行うためにjQuery.whenを利用する

ある処理を連結させるという部分でjQueryのwhenを以下のようにして利用します

```javascript
$.when(処理A, 処理B)
  .done(function(){
    処理Aと処理Bが完了したら呼ばれる処理C
  });
```

## 実際のコード

先程実装したコードがそれぞれ以下の様なイメージで実装してます。

- 食べ物の調理を行う
  - cookingStaffDeferredOperation
- 飲み物の準備を行う
  - dringStaffDeferredOperation

cookingStaffDeferredOperation、dringStaffDeferredOperationはそれぞれjQueryのDeferredの機能を利用するように実装してあります。

そのためこちらのコードは修正の必要がありません。

この２つのメソッドを呼び出す時にjQueryのwhenを利用して以下のようにします。

```javascript
var mergeOperations = function(){
  $.when(cookingStaffDeferredOperation(), dringStaffDeferredOperation())
    .done(function(){
      cookingStaffAsyncCallCustomer();
    });
};
```

index.htmlに

```html
<button id="mergeOperations">whenを利用する</button>
```

という内容を追加して画面上で動作確認をしてみてください。

上記修正後に実行すると

- 飲み物の準備完了と調理完了のメッセージが表示される
- 上記２つが完了したらお客さんを呼び出すためのメッセージが表示される

という形になったかと思います。

## ここまでの処理のサンプルコード全体

### index.html

```html
<html>
<head>
</head>
<body>
  <button id="storeOperation">処理の順番が正しくない</button>
  <button id="storeAsyncOperation">コールバックで非同期処理を適切に処理</button>
  <button id="storeDeferredOperation">Deferredを利用する</button>
  <button id="mergeOperations">whenを利用する</button>
  <div class="customerRrequest"></div>

  <div class="operation"></div>
  <script type="text/javascript" src='/node_modules/jquery/dist/jquery.js'></script>
  <script type="text/javascript" src='src/main.js'></script>
</body>
</html>
```

### main.js

```javascript
var customerRequestTotal,
    customerOrderRequest = {
      food:  { jp: 'ミラノサンドA', en: 'milanoA'},
      drink: { jp: 'ブレンドコーヒー', en: 'brendCoffee' }
    },
    messages = {
      confirm: '<ul><h3>ご注文内容を確認させていただきます</h3>' +
        '<li>' + customerOrderRequest.food.jp + '</li>' +
        '<li>' + customerOrderRequest.drink.jp + '</li>' +
        '</ul><hr />',
      callCustomer: 'ご注文のお客様、おまちどうさまでした！<hr />',
      cookingDone: '----------調理完了！----------<hr />',
      dringDone: '----------飲み物の準備完了！----------<hr />'
    };
var calculate = function(){
  var priceList = {
    food:  { milanoA: 400 },
    drink: { brendCoffee: 200 }
  };
  customerRequestTotal = priceList.food[customerOrderRequest.food.en] +
    priceList.drink[customerOrderRequest.drink.en];
};
var sayTotalPrice = function(){
  $('.operation').append('お会計は' + customerRequestTotal + '円です');
  $('.operation').append('<hr />');
};
var confirmOrderRequest = function(){
  $('.customerRrequest').append(messages.confirm);
};
var cookingStaffCallCustomer = function(){
  $('.operation').append(messages.callCustomer);
};
var cookingStaffOperation = function(){
  setTimeout(function(){
    $('.operation').append(messages.cookingDone);
  }, 3000);
};
var cookingStaffAsyncCallCustomer = function(){
  $('.operation').append(messages.callCustomer);
};
var cookingStaffAsyncOperation = function(callback){
  setTimeout(function(_callback){
    $('.operation').append(messages.cookingDone);
    // 調理完了の後にお客さんを呼び出すために以下コールバック関数を呼ぶ
    _callback();
  }, 3000, callback);
};
var storeOperation = function(){
  calculate(customerOrderRequest);
  confirmOrderRequest();
  sayTotalPrice();
  cookingStaffOperation();
  cookingStaffCallCustomer();
};
var storeAsyncOperation = function(){
  calculate(customerOrderRequest);
  confirmOrderRequest();
  sayTotalPrice();
  cookingStaffAsyncOperation(function(){
    cookingStaffAsyncCallCustomer();
  });
};
var cookingStaffDeferredOperation = function(){
  var deferred = new $.Deferred;
  setTimeout(function(){
    $('.operation').append(messages.cookingDone);
    deferred.resolve();
  }, 3000);
  return deferred.promise();
};
var dringStaffDeferredOperation = function(){
  var deferred = new $.Deferred;
  setTimeout(function(){
    $('.operation').append(messages.dringDone);
    deferred.resolve();
  }, 1000);
  return deferred.promise();
};
var storeDeferredOperation = function(){
  calculate(customerOrderRequest);
  confirmOrderRequest();
  sayTotalPrice();
  cookingStaffDeferredOperation()
    .done(dringStaffDeferredOperation)
    .done(cookingStaffAsyncCallCustomer);
};
var mergeOperations = function(){
  $.when(cookingStaffDeferredOperation(), dringStaffDeferredOperation())
    .done(function(){
      cookingStaffAsyncCallCustomer();
    });
};
$('#storeOperation').on('click',storeOperation);
$('#storeAsyncOperation').on('click',storeAsyncOperation);
$('#storeDeferredOperation').on('click',storeDeferredOperation);
$('#mergeOperations').on('click',mergeOperations);
```
