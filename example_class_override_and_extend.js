console.log("-------------------------------");
console.log("CLASS OVERRIDE & EXTEND example");
console.log("-------------------------------");

var calculator = Interface.define(
   {
      methodA : Interface.METHOD,
      methodB : Interface.METHOD,
      increase: Interface.METHOD,
      result  : Interface.METHOD
   }
);

var Class1 = Class.define({
   sum: 0,
   increase: function(args) {
      this.self.sum = this.self.sum + 1;
      return this.self.sum;
   },
   methodA: function(args) {
      var a = args['a'];
      var b = args['b'];
      return a * b;
   },
   result: function() {
      return this.self.sum;
   }
});

// override A and add B method
var Class2 = Class1.extend({
   increase: function(args) {
      this.self.sum = this.self.sum + 2;
      return this.self.sum;
   },
   methodA: function(args) {
      var r = this.parent.methodA(args);
      var a = args['a'];
      var b = args['b'];

      return (a + b) + r;
   },
   methodB: function(args) {
      var a = args['a'];
      var b = args['b'];
      return a - b;
   }
});

var Class3 = Class2.extend({
   increase: function(args) {
      this.self.sum = this.self.sum + 3;
      return this.self.sum;
   },
   methodA: function(args) {
      var r = this.self.parent.parent.methodA(args);
      var r1 = this.self.parent.methodA(args);

      var a = args['a'];
      var b = args['b'];

      return (a + b * 10) + r + r1;
   }
});

console.log("---------- Class 1 -----------");
calculator.appliedTo(Class1.create(null));
console.log("methodA = " + calculator.call('methodA', {
   a: 2,
   b: 3
}));
console.log("increase = " + calculator.call('increase', {}));
console.log("result = " + calculator.call('result', {}));

console.log("---------- Class 2 -----------");
calculator.appliedTo(Class2.create(null));
console.log("methodA = " + calculator.call('methodA', {
   a: 2,
   b: 3
}));
console.log("methodB = " + calculator.call('methodB', {
   a: 2,
   b: 3
})); // a - b = -1
console.log("increase = " + calculator.call('result', {}));

console.log("---------- Class 3 -----------");
calculator.appliedTo(Class3.create(null));
console.log("methodA = " + calculator.call('methodA', {
   a: 2,
   b: 3
})); // (2 + 3 * 10) + 6 + 11 = 49;
console.log("increase = " + calculator.call('increase', {}));
console.log("result = " + calculator.call('result', {}));
