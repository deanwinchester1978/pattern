console.log("-------------------------------");
console.log("SERVICE LOCATOR PATTERN example");
console.log("-------------------------------");

// define service
var IService = Interface.define({
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
console.log( service.call("methodA", {p1: 1}) );
console.log( service.call("methodA", {p1: 1}) );
console.log();

// change service target
targetService = "service2";
service = serviceLocator.locateService();
console.log( service.call("methodA", {p1: 1}) );
console.log( service.call("methodA", {p1: 1}) );
