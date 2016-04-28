var CookingStaff = (function(){
  function CookingStaff(){
    this.MilanoSandwichA = 'ミラノサンドA';
  };

  CookingStaff.prototype.operation = function(callback){
    setTimeout(function(_callback, data){
      $('.operation').append(data);
      $('.operation').append('<br />');
      _callback();
    }, 3000, callback, this.MilanoSandwichA + '完成');
  };
  CookingStaff.prototype.callCustomer = function(){
    $('.operation').append(this.MilanoSandwichA + 'ご注文のお客様、おまちどうさまでした！');
    $('.operation').append('<hr />');
  };
  return CookingStaff;
})();
