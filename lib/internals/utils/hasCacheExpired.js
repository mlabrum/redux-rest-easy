var hasCacheExpired = function hasCacheExpired(expireAt) {
  return expireAt !== 'never' && (!expireAt || new Date() > new Date(expireAt));
};

export default hasCacheExpired;