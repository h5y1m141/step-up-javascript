var globalString,
    sample,
    SampleClass,
    ActivationObj,
    activationObj,
    ConstructorSample,
    belongTo,
    replaceAnotherObject,
    replaceAnotherObjects;
globalString = 'this is a global';

console.log(this.globalString);
console.log(window.globalString);
SampleClass = function(){
  var globalString;
  globalString = 'this is not a global';
  this.show = function(){
    console.log(globalString);
  };
  // var globalString;
  // globalString = 'this is not global';
  // this.correctGlobalString = 'this is not global';
  // this.checkPrivate = function(){
  //   console.log(globalString);
  // };
  // this.checkGlobalString = function(){
  //   console.log(this.globalString);
  // };
  // this.checkCorrectGlobalString = function(){
  //   console.log(this.correctGlobalString);
  // };  
};
sample = new SampleClass();
// sample.checkGlobalString();
// sample.checkPrivate();
// sample.checkCorrectGlobalString();
sample.show();

ActivationObj = function(str){
  var innerString = 'inner';
  this.show = function(){
    console.log(innerString);
  };
};

activationObj = new ActivationObj();
activationObj.show();


;
ConstructorSample = function(){
  this.str = 'this is a sample';
  this.show = function(){
    console.log(this.str);
  };
};

sample = new ConstructorSample();
console.log(sample.str);
sample.show();



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

function PersonApply() {
  // 受け取る配列はオブジェクトなので配列に変換
  var args = Array.prototype.slice.apply(arguments, [0, 2]);
  this.name = args[0];
  this.age = args[1];
  return this;
}

function Gender(args) {
  PersonApply.apply(this, args); // apply の第2引数は配列
  this.sex = args[2];
}


var fArray = ['Taro',45,'male'];
var mArray = ['Hanako',35,'female'];

var father = new Gender(fArray);
var mother = new Gender(mArray);

console.log(father.name);
console.log(father.age);
console.log(father.sex);

console.log(mother.name);
console.log(mother.age);
console.log(mother.sex);
