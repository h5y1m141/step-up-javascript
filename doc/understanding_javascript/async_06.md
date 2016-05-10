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
こういうコードにならないようにするためのアプローチを、次で説明していきます。
