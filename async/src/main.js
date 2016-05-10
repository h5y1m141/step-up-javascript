var customerRequestTotal,
    customerOrderRequest = {
      food:  { jp: 'ミラノサンドA', en: 'milanoA'},
      drink: { jp: 'ブレンドコーヒー', en: 'brendCoffee' }
    },
    messages = {
      confirm: '<ul><h3>ご注文内容を確認させていただきます</h3>' +
        '<li>' + customerOrderRequest.food.jp + '</li>' +
        '<li>' + customerOrderRequest.drink.jp + '</li>' +
        '</ul><hr />',
      callCustomer: 'ご注文のお客様、おまちどうさまでした！<hr />',
      cookingDone: '----------調理完了！----------<hr />',
      dringDone: '----------飲み物の準備完了！----------<hr />'
    };
var calculate = function(){
  var priceList = {
    food:  { milanoA: 400 },
    drink: { brendCoffee: 200 }
  };
  customerRequestTotal = priceList.food[customerOrderRequest.food.en] +
    priceList.drink[customerOrderRequest.drink.en];
};
var sayTotalPrice = function(){
  $('.operation').append('お会計は' + customerRequestTotal + '円です');
  $('.operation').append('<hr />');
};

var confirmOrderRequest = function(){
  $('.customerRrequest').append(messages.confirm);
};
var cookingStaffCallCustomer = function(){
  $('.operation').append(messages.callCustomer);
};

var cookingStaffOperation = function(){
  setTimeout(function(){
    $('.operation').append(messages.cookingDone);
  }, 3000);
};
var cookingStaffAsyncCallCustomer = function(){
  $('.operation').append(messages.callCustomer);
};
var cookingStaffAsyncOperation = function(callback){
  setTimeout(function(_callback){
    $('.operation').append(messages.cookingDone);
    // 調理完了の後にお客さんを呼び出すために以下コールバック関数を呼ぶ
    _callback();
  }, 3000, callback);
};

var storeOperation = function(){
  calculate(customerOrderRequest);
  confirmOrderRequest();
  sayTotalPrice();
  cookingStaffOperation();
  cookingStaffCallCustomer();
};
var storeAsyncOperation = function(){
  calculate(customerOrderRequest);
  confirmOrderRequest();
  sayTotalPrice();
  cookingStaffAsyncOperation(function(){
    cookingStaffAsyncCallCustomer();
  });
};

var cookingStaffDeferredOperation = function(){
  var deferred = new $.Deferred;
  setTimeout(function(){
    $('.operation').append(messages.cookingDone);
    deferred.resolve();
  }, 3000);
  return deferred.promise();
};

var dringStaffDeferredOperation = function(){
  var deferred = new $.Deferred;
  setTimeout(function(){
    $('.operation').append(messages.dringDone);
    deferred.resolve();
  }, 1000);
  return deferred.promise();
};


var storeDeferredOperation = function(){
  calculate(customerOrderRequest);
  confirmOrderRequest();
  sayTotalPrice();
  cookingStaffDeferredOperation()
    .done(dringStaffDeferredOperation)
    .done(cookingStaffAsyncCallCustomer);  
};

$('#storeOperation').on('click',storeOperation);
$('#storeAsyncOperation').on('click',storeAsyncOperation);
$('#storeDeferredOperation').on('click',storeDeferredOperation);
