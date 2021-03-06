# Selectors

To access state data and metadata, `redux-rest-easy` provides useful selectors. Creating a resource with [createResource](../createResource.md) will return an object containing a `selectors` key, containing the following selectors:

```js
const resource = {
  selectors: {
    resource: {
      getResource: func,
      getResourceById: func,
    },
    actionName1: {
      resource: {
        couldPerform: func,
        isPerforming: func,
        hasSucceeded: func,
        hasFailed: func,
        couldPerformOnId: func,
        isPerformingOnId: func,
        hasSucceededOnId: func,
        hasFailedOnId: func,
      },
      request: {
        getResource: func,
        couldPerform: func,
        isPerforming: func,
        hasSucceeded: func,
        hasFailed: func,
      },
    },
    ...,
  },
};
```

## Resource

_Available to any connected component._

### `getResource(state, applyDenormalizer = true)`: `array<object>`

Will return the whole resource (or an empty array). Will be denormalized by default, but can be overridden.

### `getResourceById(state, id, applyDenormalizer = true)`: `object`

Will return the object corresponding to the id passed as a parameter (or null). Will be denormalized by default, but can be overridden.

## Action.resource

_Available to any connected component._

### `couldPerform(state)`: `bool`

### `isPerforming(state)`: `bool`

### `hasSucceeded(state)`: `bool`

### `hasFailed(state)`: `bool`

Will return `true` if the action could perform / is performing / has succeeded / has failed on this resource.

### `couldPerformOnId(state, id)`: `bool`

### `isPerformingOnId(state, id)`: `bool`

### `hasSucceededOnId(state, id)`: `bool`

### `hasFailedOnId(state, id)`: `bool`

Will return `true` if the action could perform / is performing / has succeeded / has failed on this resource id.

## Action.request

_Only available to connected components which specifically requested a resource (via dispatch). They will need to pass ownProps as an argument, on top of state._

### `getResource(state, ownProps, applyDenormalizer = true)`: `array<object>`

Will return the resource corresponding to the payload of the request (or an empty array). Will be denormalized by default, but can be overridden.

### `couldPerform(state, ownProps)`: `bool`

### `isPerforming(state, ownProps)`: `bool`

### `hasSucceeded(state, ownProps)`: `bool`

### `hasFailed(state, ownProps)`: `bool`

Will return `true` if the request (dispatched by the component) could perform / is performing / has succeeded / has failed.
