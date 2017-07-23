console.log("---------------")
console.log("BUILDER PATTERN");
console.log("---------------")

var IProcess = Interface.define( {
   step1 : Interface.METHOD,
   setp2 : Interface.METHOD,
   step3 : Interface.METHOD
});

var Process = Class.define(
   {
      sum : 0,
      step1 : function() {
         this.sum = this.sum + 1
      },
      step2 : function() {
         this.sum = this.sum + 2
      },
      step3 : function() {
         this.sum = this.sum + 3
      }
   }
);

var Process2 = Process.extend({
   step2: function() {
      this.sum = this.sum + 200;
   }
});

var buildProcess = BuilderPattern.define(IProcess, ['step1', 'step2', 'step3'] );
var result = buildProcess.build( Process.create(null) );

console.log("result = " + result.sum);

var result2 = buildProcess.build( Process2.create(null) );
console.log("result2 = " + result2.sum);
