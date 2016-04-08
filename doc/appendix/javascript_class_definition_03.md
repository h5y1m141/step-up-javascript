## パブリックなメソッドを定義する

さて今度は**printHello**というパブリックなメソッドを定義してみましょう。

### PHPの場合

PHPの場合には以下のようになるかと思います。

```php
class SimpleClass {
  public $message = 'Public';
  public function printHello(){
    print("newしたオブジェクトからは呼び出せる");
  }
}
$obj = new SimpleClass();
$obj->printHello();
```

### JavaScriptの場合

JavaScriptの場合には、クラス名の**SimpleClass**の後に、ドット（.）と**prototype**を付けて、その後にメソッド名を付けます。prototypeの概念説明はやりだすとキリがない（というかそこまで的確に説明する自信がない）ので[このあたり](http://qiita.com/takeharu/items/809114f943208aaf55b3)を読むのが良いのかなと思います。

```javascript
var SimpleClass;
SimpleClass = (function(){
  function SimpleClass() {
    this.message = 'Public';
  }
  SimpleClass.prototype.printHello = function () {
    console.log("newしたオブジェクトからは呼び出せる");
  };
  return SimpleClass;
})();
var obj = new SimpleClass();
obj.printHello();
```

### 参考まで上記のJavaScriptを生成したCoffeeScript

CoffeeScriptの場合、function **printHello(){}**に相当する記述が **printHello:() ->**という形でメソッドを定義します。

※CoffeeScriptのメソッド定義の記法に最初違和感を感じるかもしれませんね

```coffee
class SimpleClass
  constructor:() ->
    @messsage = 'Public'
  printHello:() ->      
    console.log("newしたオブジェクトからは呼び出せる") 
obj = new SimpleClass()
console.log(obj.message)
```

