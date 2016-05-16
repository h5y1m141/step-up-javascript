## thisの呼ばれ方その１：トップレベルのthis

```javascript
var globalString;
globalString = 'this is a global';

console.log(this.globalString);   //(1)
console.log(window.globalString); //(2)
```

1. Webブラウザ上では window はグローバル変数。またはwindowオブジェクトの**プロパティも全てグローバル変数**になる
2. this.globalStringは上記理由のためwindow.globalStringと等価

