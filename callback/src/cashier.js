var Cashier = (function(){
  function Cashier(){
    this.customerRequestTotal = 0;
    this.customerOrderRequest = {};
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
    this.orderRequest(customerRequest);
    foodRequest = this.priceList.foods[customerRequest.foods.en];
    drinkRequest = this.priceList.drinks[customerRequest.drinks.en];
    this.customerRequestTotal = foodRequest + drinkRequest;
  };
  Cashier.prototype.orderRequest = function(orderRequest){
    this.customerOrderRequest.foods = orderRequest.foods.jp;
    this.customerOrderRequest.drinks = orderRequest.drinks.jp;

  };
  Cashier.prototype.confirmOrderRequest = function(orderRequest){
    return '<ul><h3>ご注文内容を確認させていただきます</h3>' +
      '<li>' + this.customerOrderRequest.foods + '</li>' +
      '<li>' + this.customerOrderRequest.drinks + '</li>' +
      '</ul><hr />';
  };  
  Cashier.prototype.sayTotalPrice = function(){
    $('.operation').append('お会計は' + this.customerRequestTotal + '円です');
    $('.operation').append('<hr />');
  };
  Cashier.prototype.callCustomer = function(){
    $('.operation').append(
      '<ul>' +
      '<li>' + this.customerOrderRequest.foods + '</li>' +
      '<li>' + this.customerOrderRequest.drinks + '</li>' +
        '</ul>ご注文のお客様おまたせしました<hr />'
    ); 
    $('.operation').append('<hr />');
  };  
  return Cashier;
})();
