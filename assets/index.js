parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"VXSo":[function(require,module,exports) {
"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(){e=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(A){s=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),c=new T(n||[]);return a(i,"_invoke",{value:x(t,r,c)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(A){return{type:"throw",arg:A}}}r.wrap=f;var d={};function p(){}function v(){}function m(){}var y={};s(y,c,function(){return this});var g=Object.getPrototypeOf,w=g&&g(g(j([])));w&&w!==n&&o.call(w,c)&&(y=w);var b=m.prototype=p.prototype=Object.create(y);function E(t){["next","throw","return"].forEach(function(e){s(t,e,function(t){return this._invoke(e,t)})})}function L(e,r){var n;a(this,"_invoke",{value:function(a,i){function c(){return new r(function(n,c){!function n(a,i,c,u){var l=h(e[a],e,i);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==t(f)&&o.call(f,"__await")?r.resolve(f.__await).then(function(t){n("next",t,c,u)},function(t){n("throw",t,c,u)}):r.resolve(f).then(function(t){s.value=t,c(s)},function(t){return n("throw",t,c,u)})}u(l.arg)}(a,i,n,c)})}return n=n?n.then(c,c):c()}})}function x(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return O()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=k(i,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=h(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function k(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,k(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),d;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function j(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:O}}function O(){return{value:void 0,done:!0}}return v.prototype=m,a(b,"constructor",{value:m,configurable:!0}),a(m,"constructor",{value:v,configurable:!0}),v.displayName=s(m,l,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,s(t,l,"GeneratorFunction")),t.prototype=Object.create(b),t},r.awrap=function(t){return{__await:t}},E(L.prototype),s(L.prototype,u,function(){return this}),r.AsyncIterator=L,r.async=function(t,e,n,o,a){void 0===a&&(a=Promise);var i=new L(f(t,e,n,o),a);return r.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},E(b),s(b,l,"Generator"),s(b,c,function(){return this}),s(b,"toString",function(){return"[object Generator]"}),r.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=j,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(C),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=o.call(a,"catchLoc"),u=o.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,d):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),C(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;C(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:j(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},r}function r(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(l){return void r(l)}c.done?e(u):Promise.resolve(u).then(n,o)}function n(t){return function(){var e=this,n=arguments;return new Promise(function(o,a){var i=t.apply(e,n);function c(t){r(i,o,a,c,u,"next",t)}function u(t){r(i,o,a,c,u,"throw",t)}c(void 0)})}}function o(t,e){return l(t)||u(t,e)||i(t,e)||a()}function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,e){if(t){if("string"==typeof t)return c(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(t,e):void 0}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function u(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(s){l=!0,o=s}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}function l(t){if(Array.isArray(t))return t}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,d(n.key),n)}}function h(t,e,r){return e&&f(t.prototype,e),r&&f(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function d(e){var r=p(e,"string");return"symbol"===t(r)?r:String(r)}function p(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,r||"default");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.TaskList=void 0;var v=function(){function t(e,r,n,o){var a=this;s(this,t),console.log("CREATED TASK LIST 2!"),this.taskData=e,this.rootElement=document.createElement("div"),this.rootElement.classList.add("container","taskListContainer"),this.summaryElement=this.createSummaryRow(r,n,o),this.rootElement.appendChild(this.summaryElement),e.forEach(function(t){a.createCategoryTitle(t.categoryName),console.log(t.score+", "+t.average+", "+t.previousAverage),a.createCategorySummaryRow(t.score,t.average,t.previousAverage),t.taskData.forEach(function(t){a.createRow(t[0],t[1])})}),document.body.appendChild(this.rootElement)}return h(t,[{key:"createCategorySummaryRow",value:function(t,e,r){var n="Score: "+Number(t.toFixed(2))+", AVG: "+Number(e.toFixed(2))+", PV-AVG: "+Number(r.toFixed(2));console.log(n);var o=document.createElement("div");o.classList.add("row");var a=document.createElement("div");a.classList.add("col"),a.innerText=n,o.appendChild(a),this.rootElement.appendChild(o)}},{key:"createSummaryRow",value:function(t,e,r){var n="Score: "+Number(t.toFixed(2))+", AVG: "+Number(e.toFixed(2))+", PV-AVG: "+Number(r.toFixed(2));console.log(n);var o=document.createElement("div");o.classList.add("row");var a=document.createElement("div");return a.classList.add("col"),a.innerText=n,o.appendChild(a),o}},{key:"createCategoryTitle",value:function(t){var e=document.createElement("div");e.classList.add("row");var r=document.createElement("div");r.classList.add("col","categoryTitleFont"),r.innerText=t,e.appendChild(r),this.rootElement.appendChild(e)}},{key:"createRow",value:function(t,e){var r=this,n=document.createElement("div");n.classList.add("row");var o=document.createElement("div");o.classList.add("col");var a=document.createElement("div");a.classList.add("form-check");var i=document.createElement("input");i.classList.add("form-check-input","checkboxSize"),i.type="checkbox",i.value="",i.checked=e,i.id=t;var c=document.createElement("label");c.classList.add("form-check-label","formCheckLabel"),c.setAttribute("for",t),c.innerText=t,a.appendChild(i),a.appendChild(c),o.appendChild(a),n.appendChild(o),this.rootElement.appendChild(n),i.addEventListener("change",function(){r.taskData.forEach(function(e){e.taskData.forEach(function(e){e[0]===t&&(e[1]=i.checked)})}),r.logRows(),r.sendDataToServer()})}},{key:"logRows",value:function(){console.log("Current Task List:"),this.taskData.forEach(function(t){console.log("Category: ".concat(t.categoryName)),t.taskData.forEach(function(t){var e=o(t,2),r=e[0],n=e[1];console.log("Task: ".concat(r,", Completed: ").concat(n))})})}},{key:"sendDataToServer",value:function(){var t=this,e=JSON.stringify(this.taskData);console.log("Sending taskData:",e),fetch("/api/taskdata",{method:"POST",headers:{"Content-Type":"application/json"},body:e}).then(function(e){if(!e.ok)throw new Error("Failed to send data to server");console.log("Data sent to server successfully"),t.getUpdatedScores()}).catch(function(t){console.error("Error sending data to server:",t)})}},{key:"sendGetRequest",value:function(){var t=n(e().mark(function t(){var r,n;return e().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return"http://localhost:3000/api/data",t.prev=1,t.next=4,fetch("http://localhost:3000/api/data",{method:"GET",headers:{"Content-Type":"application/json"}});case 4:if(!(r=t.sent).ok){t.next=12;break}return t.next=8,r.json();case 8:return n=t.sent,t.abrupt("return",n);case 12:throw new Error("Request failed.");case 13:t.next=19;break;case 15:throw t.prev=15,t.t0=t.catch(1),console.error(t.t0),t.t0;case 19:case"end":return t.stop()}},t,null,[[1,15]])}));return function(){return t.apply(this,arguments)}}()},{key:"getUpdatedScores",value:function(){var t=this;this.sendGetRequest().then(function(e){t.rootElement.removeChild(t.summaryElement),document.body.removeChild(t.rootElement),t.taskData=e.categoryData,t.rootElement=document.createElement("div"),t.rootElement.classList.add("container","taskListContainer"),t.summaryElement=t.createSummaryRow(e.scoringData.score,e.scoringData.average,e.scoringData.previousAverage),t.rootElement.appendChild(t.summaryElement),e.categoryData.forEach(function(e){t.createCategoryTitle(e.categoryName),t.createCategorySummaryRow(e.score,e.average,e.previousAverage),e.taskData.forEach(function(e){t.createRow(e[0],e[1])})}),document.body.appendChild(t.rootElement)}).catch(function(t){console.error(t)})}}]),t}();exports.TaskList=v;
},{}],"QCba":[function(require,module,exports) {
"use strict";var t=require("./TaskList");function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function e(){e=function(){return t};var t={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(t,r,e){t[r]=e.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function l(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{l({},"")}catch(P){l=function(t,r,e){return t[r]=e}}function f(t,r,e,n){var o=r&&r.prototype instanceof v?r:v,a=Object.create(o.prototype),c=new k(n||[]);return i(a,"_invoke",{value:L(t,e,c)}),a}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(P){return{type:"throw",arg:P}}}t.wrap=f;var p={};function v(){}function y(){}function d(){}var g={};l(g,c,function(){return this});var m=Object.getPrototypeOf,w=m&&m(m(S([])));w&&w!==n&&o.call(w,c)&&(g=w);var b=d.prototype=v.prototype=Object.create(g);function x(t){["next","throw","return"].forEach(function(r){l(t,r,function(t){return this._invoke(r,t)})})}function E(t,e){var n;i(this,"_invoke",{value:function(i,a){function c(){return new e(function(n,c){!function n(i,a,c,u){var s=h(t[i],t,a);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==r(f)&&o.call(f,"__await")?e.resolve(f.__await).then(function(t){n("next",t,c,u)},function(t){n("throw",t,c,u)}):e.resolve(f).then(function(t){l.value=t,c(l)},function(t){return n("throw",t,c,u)})}u(s.arg)}(i,a,n,c)})}return n=n?n.then(c,c):c()}})}function L(t,r,e){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return G()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=j(a,e);if(c){if(c===p)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var u=h(t,r,e);if("normal"===u.type){if(n=e.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n="completed",e.method="throw",e.arg=u.arg)}}}function j(t,r){var e=r.method,n=t.iterator[e];if(void 0===n)return r.delegate=null,"throw"===e&&t.iterator.return&&(r.method="return",r.arg=void 0,j(t,r),"throw"===r.method)||"return"!==e&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+e+"' method")),p;var o=h(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,p;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,p):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function O(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function _(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function S(t){if(t){var r=t[c];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,n=function r(){for(;++e<t.length;)if(o.call(t,e))return r.value=t[e],r.done=!1,r;return r.value=void 0,r.done=!0,r};return n.next=n}}return{next:G}}function G(){return{value:void 0,done:!0}}return y.prototype=d,i(b,"constructor",{value:d,configurable:!0}),i(d,"constructor",{value:y,configurable:!0}),y.displayName=l(d,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===y||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,l(t,s,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},x(E.prototype),l(E.prototype,u,function(){return this}),t.AsyncIterator=E,t.async=function(r,e,n,o,i){void 0===i&&(i=Promise);var a=new E(f(r,e,n,o),i);return t.isGeneratorFunction(e)?a:a.next().then(function(t){return t.done?t.value:a.next()})},x(b),l(b,s,"Generator"),l(b,c,function(){return this}),l(b,"toString",function(){return"[object Generator]"}),t.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=S,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function e(e,n){return a.type="throw",a.arg=t,r.next=e,n&&(r.method="next",r.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return e("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return e(i.catchLoc,!0);if(this.prev<i.finallyLoc)return e(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return e(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return e(i.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),p},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),_(e),p}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;_(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:S(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=void 0),p}},t}function n(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void e(s)}c.done?r(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var r=this,e=arguments;return new Promise(function(o,i){var a=t.apply(r,e);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)})}}function i(){return a.apply(this,arguments)}function a(){return(a=o(e().mark(function t(){var r,n;return e().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return"http://localhost:3000/api/data",t.prev=1,t.next=4,fetch("http://localhost:3000/api/data",{method:"GET",headers:{"Content-Type":"application/json"}});case 4:if(!(r=t.sent).ok){t.next=12;break}return t.next=8,r.json();case 8:return n=t.sent,t.abrupt("return",n);case 12:throw new Error("Request failed.");case 13:t.next=19;break;case 15:throw t.prev=15,t.t0=t.catch(1),console.error(t.t0),t.t0;case 19:case"end":return t.stop()}},t,null,[[1,15]])}))).apply(this,arguments)}console.log("333"),i().then(function(r){console.log("SCORE: "+r.scoringData.score),console.log("AVERAGE: "+r.scoringData.average),console.log("PREV AVERAGE: "+r.scoringData.previousAverage);new t.TaskList(r.categoryData,r.scoringData.score,r.scoringData.average,r.scoringData.previousAverage);console.log(r)}).catch(function(t){console.error(t)});
},{"./TaskList":"VXSo"}]},{},["QCba"], null)
//# sourceMappingURL=/index.js.map