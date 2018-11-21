/**
 * console.log 这是用来保证PC上有个 console.log 方法.
 */

if (!window.console) {
  window.console = {};
  window.console.log = function () {}
}