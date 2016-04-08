## プライベートな変数とその変数を得るためのメソッドを定義

最後に**msg**というプライベートな変数を定義しつつ、その変数を得るためのメソッドを定義してみましょう。

### PHPの場合

まず、プライベート変数だけ定義してみます

```php
class SimpleClass {
  public $message = 'Public';
  private $msg = 'Private';
  public function printHello(){
    print("newしたオブジェクトからは呼び出せる");
  }
}
```

上記定義した後に

```php
$obj = new SimpleClass();
print $obj->msg;

```

とすると**Cannot access private property SimpleClass::$msg** というメッセージが表示されるかと思います。

名前の通りプライベートな変数なので外部からは直接呼び出せません。
そこで、このプライベートな変数にアクセスできる**getMsg**というパブリックなメソッドを定義します。

```php
class SimpleClass {
  public $message = 'Public';
  private $msg = 'Private';
  function printHello(){
    print("newしたオブジェクトからは呼び出せる");
  }
  public function getMsg(){
      print($this->msg);
  }
  
}
```

上記のようにした上で、以下のようにgetMsg()を通じて、SimpleClassクラスの中で定義されてるプライベートな変数にアクセスして画面表示されます

```php
$obj = new SimpleClass();
$obj->getMsg();
```


### JavaScriptの場合

以下のようにすることで、プライベートな**msg**変数を定義できます。パブリックな変数を定義した際には、this.xxxとしましたが、プライベートな変数の場合には、JavaScriptの変数スコープが関数単位である特徴を活かして以下のようにしてあげればプライベートなものとして利用できます。

```javascript
var SimpleClass;
SimpleClass = (function(){
  var msg = 'Private';
  function SimpleClass() {
    this.message = 'Public';
  }
  SimpleClass.prototype.printHello = function () {
    console.log("newしたオブジェクトからは呼び出せる");
  };
  return SimpleClass;
})();
```

上記定義したものに対して

```javascript
var obj = new SimpleClass();
console.log(obj.msg());
```
とすると、以下のようにエラーになります。

```sh
console.log(obj.msg());
                ^
TypeError: Object #<SimpleClass> has no method 'msg'
```

プライベートな**msg**にアクセスするために、getMsg()メソッドを定義するには以下のようにします。

```javascript
var SimpleClass;
SimpleClass = (function(){
  var msg = 'Private';
  function SimpleClass() {
    this.message = 'Public';
  }
  SimpleClass.prototype.printHello = function () {
    console.log("newしたオブジェクトからは呼び出せる");
  };
  SimpleClass.prototype.getMsg = function () {
    console.log(msg);
  };  
  return SimpleClass;
})();
```

上記定義したものに対して以下のようにすると、画面上に**Private**という文字が表示されます

```javascript
var obj = new SimpleClass();
console.log(obj.msg());
```
