class: middle, center

# ES6 in Action

.fit[
  贺师俊 - @hax<br>
  百姓网 - baixing.com
]

---

## ES6 Status
--

 - Will release in next month!
--

 - Browsers have already support [many features](http://kangax.github.io/compat-table/es6/)
--

 - Node.js: use `--harmony` to enable ES6 features
--

 - io.js [ES6 enabled by default](https://iojs.org/en/es6.html)
--

 - [Many ES6+ to ES5 transpilers](https://github.com/addyosmani/es6-tools),
   covered all features even early drafts (stage 0)
--

 - ES6 => ES7 => ES8
 - ES6 = ES 2015

---

## New Web standards already adopted ES6
--

  - [Service Workers](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/),
    [Fetch](https://fetch.spec.whatwg.org/),
    [Streams](https://streams.spec.whatwg.org/),
    [Loader](https://whatwg.github.io/loader/), etc...
    &emdash; Promise-based APIs
--

  - All async APIs will based on Promise in the future, See TAG [Promise Guide](http://www.w3.org/2001/tag/doc/promises-guide)
--

  - The [sample codes](https://streams.spec.whatwg.org/#creating-examples) of Fetch, Streams  specs are written in ES6

  - The reference implementations of Streams, Promise specs are written in ES6

---

## Components Frameworks are adopting ES6

  - Angular

  - React

  - Aurelia

  - …

---

## Angular 2<small> (AtScript, ES6 + decorator) </small>

```js
@Component({selector: 'my-app'})
@Template({inline: '<h1>Hi {{ name }}</h1>'})

// Component controller
class MyAppComponent {
  constructor() {
    this.name = 'Ali';
  }
}
```

---

## React<small> (0.13.x started support class) </small>

```js
export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };
```

---
class: disable-highlight

## Aurelia<small> (ES7)</small>

```js
export class Welcome{
  heading = 'Welcome to the Aurelia Navigation App!';
  firstName = 'John';
  lastName = 'Doe';

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  welcome(){
    alert(`Welcome, ${this.fullName}!`);
  }
}
```

---

## JS Developers status
--

  - Node.js App may already use [some ES6 features like generator](https://github.com/tj/co)!
--


  - Mobile Web front-end should already move to ECMAScript 5!
--


  - Some still live in ancient ES3 age...

---


## Why I should use ES5
--
/6
--
/7
--
/... ？
--

  - [ES6 &emdash; The future of JS](http://johnhax.net/2014/es6-js-future/)(D2 2014)
--

    - Why we need module / class
    - Why XXX feature is not only syntax sugar
    - script language (toy for amateurs) => real GENERAL programming language (tool for professionals)
    - PITL (programming-in-the-large)

--

  - BB is easy, show me the code
--
  [hax/es6-in-action](https://github.com/hax/es6-in-action)

---

## Advance preparation of its profits
--
  (工欲善其事 必先利其器)
--

 * transpilers
--


 * auto build
--


 * code quality
--


 * Editors/IDEs

---

## Features Summary

  - module
  - class
  - let/const
  - arrow function
  - spread, rest param
  - destructuring, default value
  - for of

---

## More Features

  - generator
  - template string
  - Symbol
  - Promise
  - Set/Map
  - 内建对象的扩展
  - ……

---

class: center, middle

## FAQ
