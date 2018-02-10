# ⛳ @brigad/redux-rest-easy

Redux/React/React Native framework generating actions, reducers and selectors to perform network requests

[![version][version-badge]][package]
[![MIT License][license-badge]][license]
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
[![Star on GitHub][github-star-badge]][github-star]

## Installation

```bash
yarn add @brigad/redux-rest-easy
```

Or, if you are using npm:

```bash
npm install --save @brigad/redux-rest-easy
```

## Problem

At Brigad, we have been extensively using redux and redux-thunk to perform network requests, and store/access the resulting data, and we always felt some pain points, or at least like there were things we could do better:

* We were often **copying/pasting a lot of code** (along with some logic regarding caching, hooks, etc) from one file to another each time we would create a new resource or action
* Our state was **not organized at all**, and accessing it was messy and error-prone
* We had a huge **caching problem**: sometimes performing unnecessary requests, sometimes not performing requests which should have been
* We had no way to know if **a given component was performing an action**, we only knew if an action was being performed on a given resource

## Solution

To solve the problems listed above, `redux-rest-easy` **generates actions, reducers, and selectors**, and also **manages the state's data and metadata** for your **network requests**. It is easy to use, and to observe via the Redux Devtools.

It also provides **sensible defaults**, allowing you to use it with **almost no configuration**, but also to **customize** anything you would like.

[Scroll down](#minimal-example) for a small example, or [browse the documentation](#api) to get started!

## API

```js
import {
  createResource,
  reducer,
  connect,
  reset,
  initializeNetwork,
} from '@brigad/redux-rest-easy';
```

* [createResource](./docs/api/createResource.md) - easily generate then export your actions and selectors from one file
* [reducer](./docs/api/reducer.md) - plug a single reducer to your state, we handle the rest
* [connect](./docs/api/connect.md) - connect your components to the state so the magic can happen
* [reset](./docs/api/reset.md) - reset `redux-rest-easy`'s whole state (you can reset parts of the state with actions generated by `createResource`)
* [initializeNetwork](./docs/api/initializeNetwork.md) - provide your own network handling functions (optional, fallback to included defaults)

## Internals

* [Actions configuration](./docs/api/createResource/actionsConfig.md) - defining your actions with `createResource`
* [Actions](./docs/api/createResource/actions.md) - actions generated by `createResource`
* [Selectors](./docs/api/createResource/selectors.md) - selectors generated by `createResource`

## Core principles

1. [Preflight checks](./docs/principles/preflight.md)
2. [Actions](./docs/principles/actions.md)
3. [Reducers](./docs/principles/reducers.md)
4. [Selectors](./docs/principles/selectors.md)

## Minimal Example

```js
// users.js

import { createResource } from '@brigad/redux-rest-easy';

const users = createResource('users')({
  retrieve: {
    method: 'GET',
    url: 'https://my-api.com/users',
    afterHook: () => console.log('Users retrieved successfuly'),
  },
});

const {
  actions: { retrieve: retrieveUsers },
  selectors: {
    resource: { getResource: getUsers },
    retrieve: { request: { isPerforming: isRetrievingUsers } },
  },
} = users;

export { retrieveUsers, getUsers, isRetrievingUsers };
```

```js
// reducers.js

import { reducer } from '@brigad/redux-rest-easy';

const reducers = combineReducers({
  restEasy: reducer,
});
```

```js
// UsersList.js

import React, { Component } from 'react';
import { connect } from '@brigad/redux-rest-easy';
import {
  retrieveUsers,
  getUsers,
  isRetrievingUsers,
} from './redux-rest-easy/users';

class UsersList extends Component {
  state = {
    error: false,
  };

  componentDidMount() {
    this.props.retrieveUsers(this.onSuccess, this.onError);
  }

  onSuccess = () => {
    this.setState({ error: false });
  };

  onError = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.props.isRetrievingUsers) {
      return <div>{'Loading...'}</div>;
    }

    if (this.state.error) {
      return (
        <div>{'There seems to be a problem... A network error occured.'}</div>
      );
    }

    return <Users items={this.props.users} />;
  }
}

const mapStateToProps = state => ({
  users: getUsers(state),
  isRetrievingUsers: isRetrievingUsers(state),
});

const mapDispatchToProps = dispatch => ({
  retrieveUsers: (onSuccess, onError) =>
    dispatch(retrieveUsers({ onSuccess, onError })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);
```

## Peer dependencies

Redux-rest-easy assumes you are using [react][react] (or [react-native][react-native]) and [react-redux][react-redux].

Redux-rest-easy also uses [redux-thunk][redux-thunk] to handle async actions, and therefore requires you to use redux-thunk's middleware in your store. If you are already using redux-thunk, then you have nothing more to do. Else, follow [redux-thunk's docs][redux-thunk-installation] for a quick setup.

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/15089053?v=4" width="100px;"/><br /><sub><b>Adrien HARNAY</b></sub>](https://adrien.harnay.me)<br />[📝](#blog-Zephir77167 "Blogposts") [💻](https://github.com/Brigad/@brigad/redux-rest-easy/commits?author=Zephir77167 "Code") [📖](https://github.com/Brigad/@brigad/redux-rest-easy/commits?author=Zephir77167 "Documentation") [🤔](#ideas-Zephir77167 "Ideas, Planning, & Feedback") [🚇](#infra-Zephir77167 "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-Zephir77167 "Reviewed Pull Requests") [⚠️](https://github.com/Brigad/@brigad/redux-rest-easy/commits?author=Zephir77167 "Tests") | [<img src="https://avatars1.githubusercontent.com/u/6181446?v=4" width="100px;"/><br /><sub><b>Thibault Malbranche</b></sub>](https://github.com/Titozzz)<br />[🐛](https://github.com/Brigad/@brigad/redux-rest-easy/issues?q=author%3ATitozzz "Bug reports") [💻](https://github.com/Brigad/@brigad/redux-rest-easy/commits?author=Titozzz "Code") [🤔](#ideas-Titozzz "Ideas, Planning, & Feedback") [👀](#review-Titozzz "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/11462388?v=4" width="100px;"/><br /><sub><b>Grisha Ghukasyan</b></sub>](https://github.com/eole1712)<br />[🤔](#ideas-eole1712 "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/569243?v=4" width="100px;"/><br /><sub><b>Aymeric Beaumet</b></sub>](https://aymericbeaumet.com)<br />[🤔](#ideas-aymericbeaumet "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

[version-badge]: https://img.shields.io/npm/v/@brigad/redux-rest-easy.svg?style=flat-square
[package]: https://www.npmjs.com/package/@brigad/redux-rest-easy
[license-badge]: https://img.shields.io/npm/l/@brigad/redux-rest-easy.svg?style=flat-square
[license]: https://github.com/Brigad/redux-rest-easy/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/Brigad/redux-rest-easy/blob/master/other/CODE_OF_CONDUCT.md
[github-star-badge]: https://img.shields.io/github/stars/Brigad/redux-rest-easy.svg?style=social
[github-star]: https://github.com/Brigad/redux-rest-easy/stargazers
[react]: https://github.com/facebook/react
[react-native]: https://github.com/facebook/react-native
[react-redux]: https://github.com/reactjs/react-redux
[redux-thunk]: https://github.com/gaearon/redux-thunk
[redux-thunk-installation]: https://github.com/gaearon/redux-thunk#installation
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
