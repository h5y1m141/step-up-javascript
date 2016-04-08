## 基本的なクラス定義の方法

メンバー変数に**message**を持った**SimpleClass**クラスというものを考えてみました。

### PHPの場合

```php
class SimpleClass {
  public $message = 'Public';
}
```
となるかと思います

### JavaScriptの場合

```javascript
var SimpleClass;
SimpleClass = (function(){
  function SimpleClass() {
    this.message = 'Public';
  }
  return SimpleClass;
})();
```

という形になります。

### 参考まで上記のJavaScriptを生成したCoffeeScript

もしかしたらPHPを書き慣れてる方にはCoffeeScriptの方が意図が伝わりそうな気がするのでCoffeeScriptでのコードも書いておきます

```coffee
class SimpleClass
  constructor:() ->
    @messsage = 'Public'
```

