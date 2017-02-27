# React Thrux Router

[![Travis build](https://img.shields.io/travis/Thram/react-thrux-router.svg?style=flat-square)](https://travis-ci.org/Thram/react-thrux-router)
[![version](https://img.shields.io/npm/v/react-thrux-router.svg?style=flat-square)](https://www.npmjs.com/package/react-thrux-router)
[![downloads](https://img.shields.io/npm/dt/react-thrux-router.svg?style=flat-square)](https://www.npmjs.com/package/react-thrux-router)
[![MIT License](https://img.shields.io/npm/l/react-thrux-router.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Cross Browser router for React using [Thrux](https://github.com/Thram/thrux) state manager.

### TODO Docs, for now just an Example:

`App.js`

```javascript
import React, {Component} from "react";
import Router from "thrux-router";
import Home from "./Home";
import First from "./First";
import Second from "./Second";


const routes = [
  {path: '/', component: Home},
  {path: '/first', component: First},
  {path: '/second', component: Second}
];

class App extends Component {
  render = () => (<Router routes={routes}/>)
}
```


`Home.js`

```javascript
import React, {Component} from "react";
import {setTab, openModal, closeModal} from "thrux-router";

class Home extends Component {
  render   = () => (
      <div>
        <h1>Home</h1>
        <a href="#/first?test=1&test2=2">First</a>
        <a href="#/second">Second</a>

        <button onClick={()=>openModal({component: Home})}>Set Modal</button>
        <button onClick={()=>closeModal()}>UnSet Modal</button>
        <button onClick={()=>setTab('sometab')}>Set Tab</button>
      </div>
  )
}

export default Home;
```

`First.js`

```javascript
import React, {Component} from "react";
import {goRoute} from "thrux-router";

class First extends Component {
  render   = () => (
      <div>
        <h1>First</h1>
        <button onClick={()=>goRoute('/second', {someProp: 1})}>Go Second</button>
      </div>
  )
}

export default First;
```

`Second.js`

```javascript
import React, {Component} from "react";
import {goRoute} from "thrux-router";

class Second extends Component {
  render   = () => (
      <div>
        <h1>Second</h1>
        <button onClick={()=>goRoute()}>Go Home</button>
      </div>
  )
}

export default Second;
```
