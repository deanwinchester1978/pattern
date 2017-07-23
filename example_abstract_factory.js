console.log("-----------------------");
console.log("FACTORY PATTERN example");
console.log("-----------------------");

var ICalculator = Interface.define(
   {
      add : Interface.METHOD({a:0, b:0}),
      minus : Interface.METHOD({a:0, b:0})
   }
);

var Calculator = Class.define(
   {
      add: function(args) {
         var a = args['a'];
         var b = args['b'];
         return a + b;
      },
      minus: function(args) {
         var a = args['a'];
         var b = args['b'];
         return a - b;
      }
   }
);

var Calculator2 = Class.define({
   add: function(args) {
      var a = args['a'];
      var b = args['b'];
      return Math.round((a + b)*100 + 0.5)/100;
   },
   minus: function(args) {
      var a = args['a'];
      var b = args['b'];
      return Math.round((a - b)*100 + 0.5)/100;
   }
});

console.log('<<< EXAMPLE 1 >>>');
var calculatorFactor = Factory.define(ICalculator, Calculator);
var calculator = calculatorFactor.create();
var r = calculator.call("add", 1, 2);
console.log(r);

console.log('<<< EXAMPLE 2 >>>');
var calculatorFactor2 = Factory.define(ICalculator).implementor(function(args) {
   var implemention = args["implemention"];
   if (implemention == "1") {
      return Calculator.create(args);
   }
   if (implemention == "2") {
      return Calculator2.create(args);
   }
});
var calculator21 = calculatorFactor2.create({implemention : "1"});
var r21 = calculator21.call("add", 1.234, 2.345);
console.log(r21);
var calculator22 = calculatorFactor2.create({implemention : "2"});
var r22 = calculator22.call("add", 1.234, 2.345);
console.log(r22);
