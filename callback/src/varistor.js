var Varistor = (function(){
  function Varistor(){
    this.brendCoffee = 'ブレンドコーヒー';
  };

  Varistor.prototype.operation = function(callback){
    setTimeout(function(_callback, data){
      $('.operation').append(data);
      $('.operation').append('<br />');
      _callback();
    }, 1000, callback, this.brendCoffee + '完成');
  };
  Varistor.prototype.callCustomer = function(){
    $('.operation').append(this.brendCoffee + 'ご注文のお客様、おまちどうさまでした！');
    $('.operation').append('<br />');
  };
  return Varistor;
})();
