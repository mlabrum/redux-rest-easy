var safeCall = function safeCall(func) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (func && typeof func === 'function') {
    return func.apply(undefined, args);
  }

  return undefined;
};

export default safeCall;