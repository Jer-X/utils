function NewFactory() {
  var Constructor = Array.prototype.shift.call(arguments);
  var obj = Object.create({});
  obj.__proto__ = Constructor.prototype;
  obj.__proto__.constructor = Constructor;
  var result = Constructor.apply(obj, arguments);
  return typeof result === "object" ? result || obj : obj;
}
