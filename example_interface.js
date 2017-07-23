console.log("-----------------");
console.log("INTERFACE example");
console.log("-----------------");

var spec = Interface.define(
   {
      methodA : Interface.METHOD,
      methodB : Interface.METHOD
   }
);

spec.appliedTo( {
   methodA : function(args) {
      param1 = args['a'];
      param2 = args['b'];
      return param1 + param2;
   }
} );

console.log("methodA = " + spec.call('methodA', {a: 2, b: 3}));
console.log("methodB = " + spec.call('methodB', {a: 2, b: 3}));
console.log("methodC = " + spec.call('methodC', {a: 2, b: 3}));

var instance = spec.appliedTo( {
   methodA : function(args) {
      param1 = args['a'];
      param2 = args['b'];
      return param1 + param2;
   }
} );

console.log("methodA = " + instance.call('methodA', {a: 2, b: 3}));
console.log("methodB = " + instance.call('methodB', {a: 2, b: 3}));
console.log("methodC = " + instance.call('methodC', {a: 2, b: 3}));
