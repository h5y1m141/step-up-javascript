var Customer = (function(){
  function Customer(){
  };
  Customer.prototype.request = function(){
    return {
      foods: { jp: 'ミラノサンドA', en: 'milanoA'},
      drinks: { jp: 'ブレンドコーヒー', en: 'brendCoffee' }
    };
  };
  return Customer;
})();
