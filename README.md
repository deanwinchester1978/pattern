# patterns
PATTERNS is a JS utility library to implement common design pattern for speeding up the development process. The below are the examples for using.

## Example 1 - Interface
```javascript
var spec = Interface.define({
   methodA: Interface.METHOD,
   < br / >
   methodB: Interface.METHOD < br / >
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
})); // a + b = 5<br/>
console.log("methodB = " + spec.call('methodB', {
   a: 2,
   b: 3
})); // null <-- no implementation<br/>
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
// define Interface<br/>
var IProcess = Interface.define( {<br/>
step1 : Interface.METHOD,<br/>
setp2 : Interface.METHOD,<br/>
step3 : Interface.METHOD<br/>
});<br/>
<br/>
// define builder class<br/>
var Process = Class.define(<br/>
{<br/>
sum : 0,<br/>
step1 : function() {<br/>
this.sum = this.sum + 1<br/>
},<br/>
step2 : function() {<br/>
this.sum = this.sum + 2<br/>
},<br/>
step3 : function() {<br/>
this.sum = this.sum + 3<br/>
}<br/>
}<br/>
);<br/>
// define a child class from builder class Process<br/>
var Process2 = Process.extend({<br/>
step2: function() {<br/>
this.sum = this.sum + 200;<br/>
}<br/>
});<br/>

//define director class (buildProcess)<br/>
var buildProcess = BuilderPattern.define(IProcess, ['step1', 'step2', 'step3'] );<br/>
<br/>
// run Process class with director<br/>
var result = buildProcess.build( Process.create(null) );<br/>
console.log("result = " + result.sum); // result = 6<br/>
<br/>
// run Process2 class with the same director<br/>
var result2 = buildProcess.build( Process2.create(null) );<br/>
console.log("result2 = " + result2.sum);  // result = 204<br/>
<br/>
Example 4 - Service Locator Pattern
-----------------------------------
// define service<br/>var IService = Interface.define({<br>
 methodA: Interface.METHOD<br>
});<br>
<br>
// define locators<br>
var targetService = "service1";<br>var serviceLocator = ServiceLocatorPattern.define(IService,<br>
 function() {<br>
  var serviceId = null;<br>
  switch (targetService) {<br>
case "service1":<br>
 serviceId = "serviceA";<br>
 break;<br>
case "service2":<br>
 serviceId = "serviceB";<br>
 break;<br>
default:<br>
 serviceId = "serviceA";<br>
<br>
  }<br>
  return serviceId;<br>
 }<br>
);<br>
<br>
// define actual services<br>
var ServiceClassA = Class.define({<br>
 sum: 0,<br>
 methodA: function(args) {<br>
  var p1 = args['p1'];<br>
  this.sum = this.sum + p1;<br>
  return this.sum;<br>
 }<br>
});<br>
<br>
var ServiceClassB = Class.define({<br>
 sum: 0,<br>
 methodA: function(args) {<br>
  var p1 = args['p1'];<br>
  this.sum = this.sum + p1 * 2;<br>
  return this.sum;<br>
 }<br>
});<br>
<br>
// register services<br>
serviceLocator.register("serviceA", ServiceClassA.create(null));<br>
serviceLocator.register("serviceB", ServiceClassB.create(null));<br>
<br>
var service = null;<br>
service = serviceLocator.locateService();<br>
console.log( service.call("methodA", {p1: 1}) );<br>
console.log( service.call("methodA", {p1: 1}) );<br>
console.log();<br>
<br>
// change service target<br>
targetService = "service2";<br>
service = serviceLocator.locateService();<br>
console.log( service.call("methodA", {p1: 1}) );<br>
console.log( service.call("methodA", {p1: 1}) );<br>
