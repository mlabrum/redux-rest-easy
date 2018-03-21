var generateActionCreatorAction = function generateActionCreatorAction(cacheLifetime, actionType) {
  return function (normalizedURL, resourceId, normalizedPayload, principalResourceIds) {
    return {
      type: actionType,
      url: normalizedURL,
      resourceId: resourceId,
      payload: normalizedPayload && Object.keys(normalizedPayload).length ? normalizedPayload : undefined,
      principalResourceIds: typeof principalResourceIds === 'string' ? [principalResourceIds] : principalResourceIds,
      cacheLifetime: cacheLifetime
    };
  };
};

export default generateActionCreatorAction;