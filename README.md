# patterns
PATTERNS is a JS utility library to implement common design pattern for speeding up the development process. The below are the examples for using.

## Example 1 - Interface
```javascript
var spec = Interface.define({
   methodA: Interface.METHOD,
   methodB: Interface.METHOD
});

spec.implementBy({
   methodA: function(args) {
      param1 = args['a'];
      param2 = args['b'];
      return param1 + param2;
   }
});

console.log("methodA = " + spec.call('methodA', {
   a: 2,
   b: 3
})); // a + b = 5
console.log("methodB = " + spec.call('methodB', {
   a: 2,
   b: 3
})); // null <-- no implementation
console.log("methodC = " + spec.call('methodC', {
   a: 2,
   b: 3
})); // null <-- no such methodB
```

## Example 2 - Class

``` javascript
var spec = Interface.define({
   methodA: Interface.METHOD,
   methodB: Interface.METHOD
});

var Class1 = Class.define({
   methodA: function(args) {
      var a = args['a'];
      var b = args['b'];
      return a * b;
   }
});

// override A and add B method
var Class2 = Class1.extend({
   methodA: function(args) {
      var a = args['a'];
      var b = args['b'];
      return a + b;
   },
   methodB: function(args) {
      var a = args['a'];
      var b = args['b'];
      return a - b;
   }
})

spec.implementBy(Class1.create(null));
console.log("methodA = " + spec.call('methodA', {
   a: 2,
   b: 3
})); // a * b = 6

spec.implementBy(Class2.create(null));
console.log("methodA = " + spec.call('methodA', {
   a: 2,
   b: 3
})); // a + b = 5
console.log("methodB = " + spec.call('methodA', {
   a: 2,
   b: 3
})); // a - b = -1
```

## Example 3 - Builder Pattern

``` javascript
// define Interface
var IProcess = Interface.define({
   step1: Interface.METHOD,
   setp2: Interface.METHOD,
   step3: Interface.METHOD
});

// define builder class
var Process = Class.define({
   sum: 0,
   step1: function() {
      this.sum = this.sum + 1
   },
   step2: function() {
      this.sum = this.sum + 2
   },
   step3: function() {
      this.sum = this.sum + 3
   }
});
// define a child class from builder class Process
var Process2 = Process.extend({
   step2: function() {
      this.sum = this.sum + 200;
   }
});

//define director class (buildProcess)
var buildProcess = BuilderPattern.define(IProcess, ['step1', 'step2', 'step3']);

// run Process class with director
var result = buildProcess.build(Process.create(null));
console.log("result = " + result.sum); // result = 6

// run Process2 class with the same director
var result2 = buildProcess.build(Process2.create(null));
console.log("result2 = " + result2.sum); // result = 204
```

## Example 4 - Service Locator Pattern

``` javascript
// define servicevar IService = Interface.define({
methodA: Interface.METHOD
});

// define locators
var targetService = "service1";
var serviceLocator = ServiceLocatorPattern.define(IService,
   function() {
      var serviceId = null;
      switch (targetService) {
         case "service1":
            serviceId = "serviceA";
            break;
         case "service2":
            serviceId = "serviceB";
            break;
         default:
            serviceId = "serviceA";

      }
      return serviceId;
   }
);

// define actual services
var ServiceClassA = Class.define({
   sum: 0,
   methodA: function(args) {
      var p1 = args['p1'];
      this.sum = this.sum + p1;
      return this.sum;
   }
});

var ServiceClassB = Class.define({
   sum: 0,
   methodA: function(args) {
      var p1 = args['p1'];
      this.sum = this.sum + p1 * 2;
      return this.sum;
   }
});

// register services
serviceLocator.register("serviceA", ServiceClassA.create(null));
serviceLocator.register("serviceB", ServiceClassB.create(null));

var service = null;
service = serviceLocator.locateService();
console.log(service.call("methodA", {
   p1: 1
}));
console.log(service.call("methodA", {
   p1: 1
}));
console.log();

// change service target
targetService = "service2";
service = serviceLocator.locateService();
console.log(service.call("methodA", {
   p1: 1
}));
console.log(service.call("methodA", {
   p1: 1
}));
```
