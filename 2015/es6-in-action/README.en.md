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

 - Browsers already supported [many features](http://kangax.github.io/compat-table/es6/)
--

 - Node.js: use `--harmony` to enable ES6
--

 - io.js: [ES6 enabled by default](https://iojs.org/en/es6.html)
--

 - [Many ES6+ to ES5 transpilers](https://github.com/addyosmani/es6-tools),
   supported even stage 0 features
--

 - ES6 => ES7 => ES8
 - ES6 = ES 2015

---

## Web standards already adopted ES6
--

  - [Service Workers](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/),
    [Fetch](https://fetch.spec.whatwg.org/),
    [Streams](https://streams.spec.whatwg.org/),
    [Loader](https://whatwg.github.io/loader/), etc...
    — Promise-based APIs
--

  - All async APIs will based on Promise, See [Promises Guide](http://www.w3.org/2001/tag/doc/promises-guide) by TAG
--

  - The [sample codes](https://streams.spec.whatwg.org/#creating-examples) of Fetch, Streams  specs are written in ES6

  - The reference implementations of new specs are written in ES6

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

## React<small> (0.13.x class syntax) </small>

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

  - [ES6 — The future of JS](http://johnhax.net/2014/es6-js-future/) (D2 2014)
--

    - Why we need module / class
    - Why feature X is not only syntax sugar
    - script language (toy for amateurs) => real GENERAL programming language (tool for professionals)
    - PITL (programming-in-the-large)

---


## BB is easy, Show me the CODE

--
  - [hax/es6-in-action](https://github.com/hax/es6-in-action)

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
  - New methods of built-in Objects
  - …

---

class: center, middle

## FAQ
