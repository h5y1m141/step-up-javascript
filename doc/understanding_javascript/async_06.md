## 非同期処理のコードにありがちな問題解決

先ほどコールバックで非同期処理を適切に処理するように以下の様なコードを書きました。

```javascript
var storeAsyncOperation = function(){
  calculate(customerOrderRequest);
  confirmOrderRequest();
  sayTotalPrice();
  cookingStaffAsyncOperation(function(){
    cookingStaffAsyncCallCustomer();
  });
};
```

コールバックで次の処理を呼ぶのが少ない現状は良いかもしれませんが、実際は

```javascript
cookingStaffAsyncOperation(function(){
  cookingStaffAsyncCallCustomer(function(){
    anotherOperation(function(response){
      if(response){
        // 何かの処理
      } else {
        // 何かの処理
      }
    });
  });
});
```

というように処理が入れ子状（ネストの深い）コードになってしまうことが多いかと思います。

こういうコードにならないようにするためのアプローチをここで説明しておきたいと思います。

### jQueryのDeferredを活用する

この機能の説明はYahooデベロッパーネットワークの記事から引用します。

> 非同期処理を連結する際、コールバック地獄から解放される（直列処理、並列処理が可能）
> エラー処理をうまく記述できる
> 一連の非同期処理を関数化して再利用しやすくできる
>
> [爆速でわかるjQuery.Deferred超入門](http://techblog.yahoo.co.jp/programming/jquery-deferred/)より引用

実装した非同期処理をjQueryのDeferredを利用した形に書き換えることで、

```javascript
cookingStaffAsyncOperation()
  .then(cookingStaffAsyncCallCustomer)
  .then(anotherOperation)
```

というような処理が入れ子状にならないような書き方にすることができます。

またA、B、Cという処理があったとして**AとBが完了したらCを実行する**というように、ある処理を連結して、それが完了したら最後の処理を行うというような場合にも比較的見通しの良いコードで書けるようになるので最後にその例についても取り上げます
