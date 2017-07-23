String.prototype.repeat = function(num) {
   return new Array(num + 1).join(this);
}

String.prototype.equalsIgnoreCase = function(s) {
   return (this.toLowerCase() == s.toLowerCase());
}

String.prototype.date = function() {
   // date string format in yyyyMMddHHmmss
   var year = parseInt(this.substring(0, 4));
   var mth = parseInt(this.substring(4, 6));
   var date = parseInt(this.substring(6, 8));
   var hour = parseInt(this.substring(8, 10));
   var minutes = parseInt(this.substring(10, 12));
   var seconds = parseInt(this.substring(12, 14));

   //return new Date(year, mth - 1, date, hour, minutes, seconds);
   return Utils.createDate(year, mth, date, hour, minutes, seconds);
}

Date.prototype.formatString = function() {
   var yyyy = "" + this.getFullYear();
   var MM = "" + (this.getMonth() + 1);
   var dd = "" + this.getDate();
   var HH = "" + this.getHours();
   var mm = "" + this.getMinutes();
   var ss = "" + this.getSeconds();

   var MM2 = Utils.right("0" + MM, 2);
   var dd2 = Utils.right("0" + dd, 2);
   var HH2 = Utils.right("0" + HH, 2);
   var mm2 = Utils.right("0" + mm, 2);
   var ss2 = Utils.right("0" + ss, 2);

   return yyyy + MM2 + dd2 + HH2 + mm2 + ss2;
}

// var sleep = function(ms) {
//    return new Promise(resolve => setTimeout(resolve, ms));
// }

var Utils = {

   createDate: function(y, M, d, h, m, s, S) {
      if (S) {
         return new Date(y, M-1, d, h, m, s, S);
      } else {
         return new Date(y, M-1, d, h, m, s);
      }
   },

   now: function() {
      return new Date();
   },

   isNothing: function(v) {
      return (v == undefined || v == null);
   },

   isArray: function(v) {
      return (v.constructor === Array);
   },

   extend: function() {
      for (var i = 1; i < arguments.length; i++) {
         for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
               arguments[0][key] = arguments[i][key];
            }
         }
      }
      return arguments[0];
   },

   mergeToInstance: function(a, b) {
      var c = {};
      for (var p in a)
         c[p] = (b[p] == null) ? a[p] : b[p];
      for (var p in b)
         if (this.isNothing(a[p]))
            c[p] = b[p];
      return c;
   },

   contains: function(obj, list) {
      var x;
      for (x in list) {
         if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
         }
      }
      return false;
   },

   leftPad: function(string, padding, length) {
      var ol = string.length;
      var ns = string;
      if (ol < length) {
         var p = padding.repeat(length);
         var ss = (p + string);
         ns = ss.substring(ss.length - length, ss.length)
      }
      return ns;
   },

   compareBits: function(source, bitvalue) {
      return ((source & bitvalue) == bitvalue);
   },

   iterator: function(v) {
      if (v.length) {
         return v;
      } else {
         return [v];
      }
   },

   matchRange: function(v, minV, maxV, undefine) {
      if (v) {
         return (minV <= v && v <= maxV);
      } else {
         return undefine;
      }
   },

   matchInList: function(v, list, undefine) {
      if (v) {
         var iter = Utils.iterator(list);
         var match = false;
         for (k in iter) {
            var kv = iter[k];
            if (kv == v || kv.text == v) {
               match = true;
               break;
            }
         }
         return match;
      } else {
         return undefine;
      }
   },

   isMemberOf: function(v, target) {
      var matched = false;
      for (k in target) {
         var vv = target[k];
         if (v == vv || vv.text == v) {
            matched = true;
            break;
         }
      }
      return matched;
   },

   right: function(s, l) {
      var L = Math.min(l, s.length);
      var begin = s.length - L;
      var end = s.length;
      return s.substring(begin, end);
   },

   left: function(s, l) {
      var L = Math.min(l, s.length);
      return s.substring(0, L);
   },

   uuid: function() {
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
         var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
         return v.toString(16);
      });
      return uuid;
   },

}

var Interface = {
   define: function(objInterface) {
      return {
         interfaceSpecification: objInterface,
         implementation: null,
         appliedTo: function(objImplementation) {
            // apply interface and return the static instance
            this.implementation = objImplementation;
            return this;
         },
         implementBy: function(objImplementation) {
            // apply interface and return new instance
            var newInstance = Interface.define(this.interfaceSpecification);
            return newInstance.appliedTo(objImplementation);
            //this.implementation = objImplementation;
            //return Utils.extend(true, {}, this);
         },
         signature: function(args) {
            var methodName = args[0];
            var funcDef = this.interfaceSpecification[methodName];
            if (funcDef == undefined) {
               throw "Pattern Error: method (" + methodName + ") cannot be found in interface.";
               //return null;
            }
            var params = args.length - 1;
            var _args = null;
            if (params > 1) {
               // it is assumed non-json object parameters inputted.
               _args = Utils.extend({}, funcDef.parameters);
               var i = 1;
               for (fi in _args) {
                  _args[fi] = args[i];
                  i++;
               }
            } else {
               _args = args[1];
            }
            return {
               methodName: methodName,
               arguments: _args
            };
         },
         call: function() {
            var signature = this.signature(arguments);
            if (signature == null) {
               //console.log("Pattern Error: signature is expected.");
               throw "Pattern Error: signature is expected.";
               //return null;
            }
            if (this.implementation[signature.methodName] == undefined) {
               // console.log("Pattern Error: " + signature.methodName + " is not defined.");
               throw "Pattern Error: " + signature.methodName + " is not defined.";
               //return null;
            } else {
               return this.implementation[signature.methodName](signature.arguments);
            }
         }
      }
   },
   METHOD: function(args) {
      return {
         parameters: args,
         body: function() {
            return null;
         }
      };
   }
}

var Class = {
   define: function(objClass) {
      var objClassExt = Utils.extend({
         init: function(args) {}
      }, objClass);
      //console.log(objClassExt);
      return {
         classUUID: Utils.uuid(),
         classSpecification: objClassExt,
         create: function(args) {
            var instance = Utils.extend({}, this.classSpecification);

            instance['self'] = instance;

            var _parent = instance.parent;
            while (_parent != undefined) {
               _parent['self'] = instance;
               if (args) {
                  _parent.init(args);
               } else {
                  _parent.init({});
               }
               _parent = _parent.parent;
            }

            if (args) {
               instance.init(args);
            } else {
               instance.init({});
            }
            return instance;
         },
         extend: function(objChildClass) {
            var superPrototype = Utils.extend({}, this.classSpecification);
            var prototype = Utils.extend({}, this.classSpecification);
            Utils.extend(prototype, objChildClass);

            prototype['parent'] = superPrototype;
            return Class.define(prototype);
         }
      }
   }
}

var BuilderPattern = {
   define: function(objInterface, buildProcess) {
      return {
         builderInterface: objInterface,
         builderBody: buildProcess,
         build: function(objBuilder) {
            var builder = this.builderInterface.implementBy(objBuilder);
            for (p in this.builderBody) {
               builder.call(this.builderBody[p], {});
            };
            return builder.implementation;
         }
      };
   }
}

var ServiceLocatorPattern = {
   define: function(objInterface, locatorFunction) {
      return {
         serviceInterface: objInterface,
         serviceLocator: locatorFunction,
         services: [],
         register: function(serviceId, serviceImpl) {
            this.services.push({
               serviceId: serviceId,
               serviceImpl: serviceImpl
            });
         },
         locateService: function() {
            var locatedService = null;
            if (this.serviceLocator) {
               var serviceId = this.serviceLocator();
               for (s in this.services) {
                  var sp = this.services[s];
                  if (serviceId == sp.serviceId) {
                     locatedService = sp.serviceImpl;
                  }
               }
            }
            if (locatedService && locatedService != null) {
               return this.serviceInterface.implementBy(locatedService);
            } else {
               return null;
            }
         }
      };
   }
}

var Factory = {
   define: function(interfaceClass, implementorClass) {
      return {
         interfaceClass: interfaceClass,
         implementorClass: implementorClass,
         implementation: function(args) {
            // default - generate a new instance using implementor defined
            // complicated case should be override this logic
            return implementorClass.create(args);
         },
         implementor: function(implementation) {
            this.implementation = implementation;
            return this;
         },
         create: function(args) {
            return interfaceClass.implementBy(this.implementation(args));
         }
      };
   }
}
