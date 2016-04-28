var Cashier = (function(){
  function Cashier(){
    this.customerRequestTotal = 0;
    this.priceList = {
      foods: {
        milanoA: 400
      },
      drinks: {
        brendCoffee: 200
      }
    };
  }; 
  Cashier.prototype.calculate = function(customerRequest){
    var foodRequest,
        drinkRequest;
    foodRequest = this.priceList.foods[customerRequest.foods.en];
    drinkRequest = this.priceList.drinks[customerRequest.drinks.en];
    this.customerRequestTotal = foodRequest + drinkRequest;
  };
  Cashier.prototype.sayTotalPrice = function(){
    $('.operation').append('お会計は' + this.customerRequestTotal + '円です');
    $('.operation').append('<br />');
  };
  return Cashier;
})();
