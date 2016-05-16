## thisの呼ばれ方その２：コンストラクタ内のthis


```javascript
var sample,
    ConstructorSample;
ConstructorSample = function(){
  this.str = 'this is a sample';
  this.show = function(){
    console.log(this.str);
  };
};
sample = new ConstructorSample();
console.log(sample.str);
sample.show();
```

