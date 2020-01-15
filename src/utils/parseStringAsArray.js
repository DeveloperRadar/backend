module.exports = function parseArrayAsString(arrayAsString, sep=",") {
  return arrayAsString.split(sep).map(item => item.trim());
};
