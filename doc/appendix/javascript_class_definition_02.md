## インスタンス化してパブリックな変数をターミナル上に表示する

### PHPの場合

newしてインスタンス化した上で、メンバー変数を以下のようにして呼び出すことが出来ます

```php
class SimpleClass {
  public $message = 'Public';
}
$obj = new SimpleClass();
print $obj->message; 
```

### JavaScriptの場合

クラス定義はちょっと違和感があるかもしれませんが、メンバー変数を呼び出す方法はPHPのそれとあまり大差がないかと思います。

```javascript
var SimpleClass;
SimpleClass = (function(){
  function SimpleClass() {
    this.message = 'Public';
  }
  return SimpleClass;
})();
var obj = new SimpleClass();
console.log(obj.message);
```

### 参考まで上記のJavaScriptを生成したCoffeeScript

CoffeeScriptの場合にも大差がないと思います

```coffee
class SimpleClass
  constructor:() ->
    @messsage = 'Public'
      
obj = new SimpleClass()
console.log(obj.message)
```
