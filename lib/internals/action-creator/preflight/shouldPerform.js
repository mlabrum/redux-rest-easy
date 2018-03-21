var shouldPerform = function shouldPerform(state, normalizedURL) {
  return !state || !normalizedURL || !state.requests || !state.requests[normalizedURL] || !!state.requests[normalizedURL].endedAt;
};

export default shouldPerform;