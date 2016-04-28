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
  cashier.calculate(customer1.request());
  cashier.sayTotalPrice();

  cookingStaff.operation(function(){
    cookingStaff.callCustomer();  
  });

  varistor.operation(function(){
    varistor.callCustomer();  
  });

  // juniorCookingStaff.operation(); 
  // juniorCookingStaff.callCustomer();

}

init();
$('#storeOperation').on('click',storeOperation);
