var SampleClass,
    sample;
    
SampleClass = function(str){
  var innerString = 'inner';
  this.show = function(){
    console.log(innerString);
  };
};

sample = new SampleClass();
sample.show();

function showMessage(){
  console.log('メッセージを表示');
};
showMessage();

var constructorSample,
    ConstructorSample;
ConstructorSample = function(){
  this.str = 'this is a sample';
  this.show = function(){
    console.log(this.str);
  };
};
constructorSample = new ConstructorSample();
constructorSample.show();

var belongTo;
belongTo = {
  str: '所属してる'
};
belongTo.show = function() {
  console.log(this.str);
};

belongTo.show();

function Person(name,age) {
  this.name = name;
  this.age = age;
  return this;
}

function Men(name, age) {
  Person.call(this, name, age);
  this.sex = 'male';
}

function Women(name, age) {
  Person.call(this, name, age);
  this.sex = 'female';
}

var father = new Men('Taro', 45);
var mother = new Women('Hanako', 35);

console.log(father.name);
console.log(father.age);
console.log(father.sex);

console.log(mother.name);
console.log(mother.age);
console.log(mother.sex);
