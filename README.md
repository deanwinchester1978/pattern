# patterns
PATTERNS is a JS utility library to implement common design pattern for speeding up the development process. The below are the examples for using.

Example 1 - Interface
---------------------
var spec = Interface.define(<br/>
&nbsp;&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodA : Interface.METHOD,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodB : Interface.METHOD<br/>
&nbsp;&nbsp;&nbsp;}<br/>
);<br/>

spec.implementBy( {<br/>
&nbsp;&nbsp;&nbsp;methodA : function(args) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;param1 = args['a'];<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;param2 = args['b'];<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return param1 + param2;<br/>
&nbsp;&nbsp;&nbsp;}<br/>
} );<br/>

console.log("methodA = " + spec.call('methodA', {a: 2, b: 3}));&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// a + b = 5<br/>
console.log("methodB = " + spec.call('methodB', {a: 2, b: 3}));&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// null <-- no implementation<br/>
console.log("methodC = " + spec.call('methodC', {a: 2, b: 3}));&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// null <-- no such methodB<br/>

Example 2 - Class
-----------------
var spec = Interface.define(<br/>
&nbsp;&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodA : Interface.METHOD,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodB : Interface.METHOD<br/>
&nbsp;&nbsp;&nbsp;}<br/>
);<br/>

var Class1 = Class.define(<br/>
&nbsp;&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodA : function(args) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var a = args['a'];<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var b = args['b'];<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return a * b;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;}<br/>
);<br/>

// override A and add B method<br/>
var Class2 = Class1.extend(<br/>
&nbsp;&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodA : function(args) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var a = args['a'];<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var b = args['b'];<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return a + b;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodB : function(args) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var a = args['a'];<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var b = args['b'];<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return a - b;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;}<br/>
)<br/>

spec.implementBy( Class1.create(null) );<br/>
console.log("methodA = " + spec.call('methodA', {a: 2, b: 3}));&nbsp;&nbsp;&nbsp; // a * b = 6<br/>

spec.implementBy( Class2.create(null) );<br/>
console.log("methodA = " + spec.call('methodA', {a: 2, b: 3}));&nbsp;&nbsp;&nbsp; // a + b = 5<br/>
console.log("methodB = " + spec.call('methodA', {a: 2, b: 3}));&nbsp;&nbsp;&nbsp; // a - b = -1<br/>

Example 3 - Builder Pattern
---------------------------
// define Interface<br/>
var IProcess = Interface.define( {<br/>
&nbsp;&nbsp;&nbsp;step1 : Interface.METHOD,<br/>
&nbsp;&nbsp;&nbsp;setp2 : Interface.METHOD,<br/>
&nbsp;&nbsp;&nbsp;step3 : Interface.METHOD<br/>
});<br/>
<br/>
// define builder class<br/>
var Process = Class.define(<br/>
&nbsp;&nbsp;&nbsp;{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sum : 0,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;step1 : function() {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.sum = this.sum + 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;step2 : function() {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.sum = this.sum + 2<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;step3 : function() {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.sum = this.sum + 3<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;}<br/>
);<br/>

// define a child class from builder class Process<br/>
var Process2 = Process.extend({<br/>
&nbsp;&nbsp;&nbsp;step2: function() {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.sum = this.sum + 200;<br/>
&nbsp;&nbsp;&nbsp;}<br/>
});<br/>

// define director class (buildProcess)<br/>
var buildProcess = BuilderPattern.define(IProcess, ['step1', 'step2', 'step3'] );<br/>
<br/>
// run Process class with director<br/>
var result = buildProcess.build( Process.create(null) );<br/>
console.log("result = " + result.sum);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // result = 6<br/>
<br/>
// run Process2 class with the same director<br/>
var result2 = buildProcess.build( Process2.create(null) );<br/>
console.log("result2 = " + result2.sum);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  // result = 204<br/>
<br/>
Example 4 - Service Locator Pattern
-----------------------------------
// define service<br/>var IService = Interface.define({<br>
&nbsp;&nbsp;&nbsp; methodA: Interface.METHOD<br>
});<br>
<br>
// define locators<br>
var targetService = "service1";<br>var serviceLocator = ServiceLocatorPattern.define(IService,<br>
&nbsp;&nbsp;&nbsp; function() {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  var serviceId = null;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  switch (targetService) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case "service1":<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; serviceId = "serviceA";<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; break;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case "service2":<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; serviceId = "serviceB";<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; break;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; serviceId = "serviceA";<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  }<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  return serviceId;<br>
&nbsp;&nbsp;&nbsp; }<br>
);<br>
<br>
// define actual services<br>
var ServiceClassA = Class.define({<br>
&nbsp;&nbsp;&nbsp; sum: 0,<br>
&nbsp;&nbsp;&nbsp; methodA: function(args) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  var p1 = args['p1'];<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  this.sum = this.sum + p1;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  return this.sum;<br>
&nbsp;&nbsp;&nbsp; }<br>
});<br>
<br>
var ServiceClassB = Class.define({<br>
&nbsp;&nbsp;&nbsp; sum: 0,<br>
&nbsp;&nbsp;&nbsp; methodA: function(args) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  var p1 = args['p1'];<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  this.sum = this.sum + p1 * 2;<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  return this.sum;<br>
&nbsp;&nbsp;&nbsp; }<br>
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
