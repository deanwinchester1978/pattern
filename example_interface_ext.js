console.log("--------------------");
console.log("INTERFACE(2) example");
console.log("--------------------");

var spec = Interface.define(
   {
      methodA : Interface.METHOD({a: 0, b: 0}),
      methodB : Interface.METHOD({a: 0, b: 0})
   }
);

spec.appliedTo( {
   methodA : function(args) {
      param1 = args['a'];
      param2 = args['b'];
      return param1 + param2;
   },
   methodB : function(args) {
      param1 = args['a'];
      param2 = args['b'];
      return param1 * param2;
   }
} );

console.log("methodA = " + spec.call('methodA', 2, 3));
console.log("methodB = " + spec.call('methodB', 2, 3));
console.log("methodC = " + spec.call('methodC', 2, 3));

var instance = spec.appliedTo( {
   methodA : function(args) {
      param1 = args['a'];
      param2 = args['b'];
      return param1 + param2;
   },
   methodB : function(args) {
      param1 = args['a'];
      param2 = args['b'];
      return param1 * param2;
   }
} );

console.log("methodA = " + instance.call('methodA', 2, 3));
console.log("methodB = " + instance.call('methodB', 2, 3));
console.log("methodC = " + instance.call('methodC', 2, 3));
