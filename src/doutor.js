var MilanoSandwichA = 'ミラノサンドA',
    brendCoffee = 'ブレンドコーヒー',
    cashier,
    cookingStaff,
    varistor,
    customer1,
    customer2;

function Cashier(){
  this.customerRequestTotal = 0;
};

Cashier.prototype.calculate = function(customerRequest){
  var foodRequest,
      drinkRequest,
      priceList = {
        foods: {
          milanoA: 400
        },
        drinks: {
          brendCoffee: 200
        }
      };
  foodRequest = priceList.foods[customerRequest.foods.en];
  drinkRequest = priceList.drinks[customerRequest.drinks.en];
  this.customerRequestTotal = foodRequest + drinkRequest;
};

Cashier.prototype.sayTotalPrice = function(){
  console.log('お会計は' + this.customerRequestTotal + '円です');
};

function CookingStaff(){};

CookingStaff.prototype.operation = function(callback){
  setTimeout(function(_callback, data){
    console.log(data);
    _callback();
  }, 3000, callback, MilanoSandwichA + '完成');
};
CookingStaff.prototype.callCustomer = function(){
  console.log(MilanoSandwichA + 'ご注文のお客様、おまちどうさまでした！');
};

function Varistor(){};

Varistor.prototype.operation = function(callback){
  setTimeout(function(_callback, data){
    console.log(data);
    _callback();
  }, 1000, callback, brendCoffee + '完成');
};
Varistor.prototype.callCustomer = function(){
  console.log(brendCoffee + 'ご注文のお客様、おまちどうさまでした！');
};

function Customer(){};

Customer.prototype.request = function(){
  return {
    foods: { jp: 'ミラノサンドA', en: 'milanoA'},
    drinks: { jp: 'ブレンドコーヒー', en: 'brendCoffee' }
  };
};

function JuniorCookingStaff(){};

JuniorCookingStaff.prototype.operation = function(){
  setTimeout(function(data){
    console.log(data);
  }, 3000, MilanoSandwichA + '完成');
};
JuniorCookingStaff.prototype.callCustomer = function(){
  console.log(MilanoSandwichA + 'ご注文のお客様、おまちどうさまでした！');
};


cashier = new Cashier();
customer1 = new Customer();
cookingStaff = new CookingStaff();
varistor = new Varistor();

cashier.calculate(customer1.request());
cashier.sayTotalPrice();


cookingStaff.operation(function(){
  cookingStaff.callCustomer();  
});

varistor.operation(function(){
  varistor.callCustomer();  
});
