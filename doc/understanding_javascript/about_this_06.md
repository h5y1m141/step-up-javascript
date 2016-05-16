## thisの呼ばれ方その３：何かに所属している時のthis

```javascript
var belongTo;
belongTo = {
  str: '所属してる'
};
belongTo.show = function() {
  console.log(this.str);
};

belongTo.show();
```
