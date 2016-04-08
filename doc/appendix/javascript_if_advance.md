- [Airbnb JavaScript スタイルガイド](http://mitsuruog.github.io/javacript-style-guide/)
- [Truth, Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)

で条件判定について詳しく解説されてるので、そちらを参考にif についてより深く知るための情報をまとめました

### true/falseを判定するメソッド

[Truth, Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)の中にあったコードを参考にまずは以下の様なメソッドを定義します

```javascript
var trutheyTester = function(expr) {
    return expr ? "trueです" : "falseです"; 
}
```

このメソッドにいくつかの引数を設定して実際にどうなるかをChromeのConsoleの機能で確認してみます

![2016-04-07 18 24 51](https://cloud.githubusercontent.com/assets/950924/14346647/10801dde-fcee-11e5-8e8d-fe4c9af6463f.png)


### オブジェクト は trueと評価される

```javascript
trutheyTester({});
// "trueです"
```


### 配列はオブジェクトなのでtrueと評価される

```javascript
trutheyTester([]);
// "trueです"
```

### undefined は false と評価される

```javascript
var notDefinedVariable;
// undefined
trutheyTester(notDefinedVariable);
// "falseです"
```

### null は false と評価されます。

```javascript
trutheyTester(null);
// "falseです"
```

### 真偽値 は boolean型の値 として評価されます。


```javascript
trutheyTester(false);
// "falseです"
```

以下は実際にこういうコードを見たり書いたりすることがないと思うのですが、サンプルに乗っていたので記載しておきます。

```javascript
trutheyTester(new Boolean(false));
// "trueです"
```

ちなみにtrueになる理由ですが

- new Boolean(false)という記述は以下のようにオブジェクト型になる
- オブジェクトは前述したように常にtrueになる

というためです
```javascript
typeof(new Boolean(false));
// "object"
```


### 数値 は true と評価されます。


```javascript
trutheyTester(1);
// "trueです"
```


しかし、 +0, -0, or NaN の場合は false です。

```javascript
trutheyTester(NaN);
// "falseです"
```

### 文字列 は true と評価されます

```javascript
trutheyTester('文字列の確認');
// "trueです"
```

しかし、空文字 '' の場合は false です。

```javascript
trutheyTester('');
// "falseです"
```
