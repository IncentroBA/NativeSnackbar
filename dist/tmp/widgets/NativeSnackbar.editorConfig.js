'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function getProperties(values, defaultProperties) {
  // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.

  /* Example
  if (values.myProperty === "custom") {
      delete defaultProperties.properties.myOtherProperty;
  }
  */
  return defaultProperties;
}

function check(values) {
  var errors = []; // Add errors to the above array to throw errors in Studio and Studio Pro.

  /* Example
  if (values.myProperty !== "custom") {
      errors.push({
          property: `myProperty`,
          message: `The value of 'myProperty' is different of 'custom'.`,
          url: "https://github.com/myrepo/mywidget"
      });
  }
  */

  return errors;
}

exports.check = check;
exports.getProperties = getProperties;
