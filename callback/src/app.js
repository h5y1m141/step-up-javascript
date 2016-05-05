var cashier,
    cookingStaff,
    varistor,
    juniorCookingStaff,
    customer1,
    customer2;

function init(){
  cashier = new Cashier();
  customer1 = new Customer();
  cookingStaff = new CookingStaff();
  varistor = new Varistor();
  juniorCookingStaff = new JuniorCookingStaff();
}

function storeOperation(){
  var orderRequest;
  orderRequest = customer1.request();
  cashier.calculate(orderRequest);
  $('.customerRrequest').append(cashier.confirmOrderRequest());
  cashier.sayTotalPrice();

  cookingStaff.operation(function(){
    cookingStaff.callCustomer();  
  });

  varistor.operation(function(){
    varistor.callCustomer();  
  });
}

function incorrectOperationForTakeout(){
  var orderRequest;
  orderRequest = customer1.request();
  cashier.calculate(orderRequest);
  cashier.sayTotalPrice();
  
  cookingStaff.operation(function(){
    varistor.operation(function(){
      cashier.callCustomer();
    });
  });
}

function cookingDeferredOperation(){
  var deferred = new $.Deferred;
  cookingStaff.operation(function(){
    deferred.resolve();
  });
  return deferred.promise();
};

function varistorDeferredOperation(){
  var deferred = new $.Deferred;
  varistor.operation(function(){
    deferred.resolve();
  });
  return deferred.promise();
};

function correctOperationForTakeout(){
  var orderRequest,
      foodOperationDone,
      drinkOperationDone;
  
  orderRequest = customer1.request();
  cashier.calculate(orderRequest);
  cashier.sayTotalPrice();
  
  foodOperationDone = cookingDeferredOperation();
  drinkOperationDone = varistorDeferredOperation();

  // フードとドリンクの両方が出来たらお客さんを呼ばないといけない
  $.when(foodOperationDone, drinkOperationDone).done(function(){
    cashier.callCustomer();
  });
}


init();
$('#storeOperation').on('click',storeOperation);
$('#incorrectOperationForTakeout').on('click',incorrectOperationForTakeout);
$('#correctOperationForTakeout').on('click',correctOperationForTakeout);
