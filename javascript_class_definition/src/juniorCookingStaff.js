var JuniorCookingStaff = (function(){
  function JuniorCookingStaff(){
    this.MilanoSandwichA = 'ミラノサンドA';
  };

  JuniorCookingStaff.prototype.operation = function(){
    setTimeout(function(data){
      $('.operation').append(data);
    }, 3000, this.MilanoSandwichA + '完成');
  };
  JuniorCookingStaff.prototype.callCustomer = function(){
    $('.operation').append(this.MilanoSandwichA + 'ご注文のお客様、おまちどうさまでした！');
  };
  return JuniorCookingStaff;
})();
