class: middle, center

# ES6 实战

.fit[
  贺师俊 - @hax<br>
  百姓网 - baixing.com
]

---

## ES6 进展
--

 - 2个月后正式发布！
--

 - 浏览器已经支持[许多 ES6 特性](http://kangax.github.io/compat-table/es6/)
--

 - Node.js 可通过 `--harmony` 开启 ES6 特性
--

 - io.js [更好的 ES6 支持](https://iojs.org/en/es6.html)
--

 - [多种 ES6 到 ES5 的编译器](https://github.com/addyosmani/es6-tools)，涵盖了几乎所有特性
--

 - ES6 => ES7 => ES8
 - ES6 = ES 2015

---

## Web 新标准已经全面转向 ES6
--

  - [Service Workers](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/)、
    [Fetch](https://fetch.spec.whatwg.org/)、
    [Streams](https://streams.spec.whatwg.org/)、
    [Loader](https://whatwg.github.io/loader/)
    等全部基于 Promise
--

  - 将来所有标准凡涉及异步必然基于 Promise，参见 TAG 的 [Promise 使用指南](http://www.w3.org/2001/tag/doc/promises-guide)
--

  - Fetch、Streams 等标准的[示例代码](https://streams.spec.whatwg.org/#creating-examples)直接是用 ES6 写的

  - Streams、Promise 等标准的参考实现本身是用 ES6 写的

---

## 组件框架已经全面转向 ES6

  - Angular

  - React

  - Aurelia

  - ……

---

## Angular 2<small>（AtScript，ES6 的扩展）</small>

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

## React<small>（0.13.x 加入了 class 支持）</small>

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

## Aurelia<small>（ES7 示例代码）</small>

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

## 实际开发的现状
--

  - 写 Node.js 应用的可能已经开始用[个别 ES6 特性](https://github.com/tj/co)！
--


  - 无线前端应该可以全部用 ES5 了！
--


  - 还有许多前端还在 ES3 时代……

---


## 为什么要用 ES5
--
/6
--
/7
--
/... ？
--

  - [透过ES6看JS未来](http://johnhax.net/2014/es6-js-future/)（D2 2014）
--

    - 我们为什么需要 module / class
    - XXX 特性为什么不仅仅是语法糖
    - script => 真正的通用编程语言
    - PITL (programming-in-the-large)

--

  - 上代码 [hax/es6-in-action](https://github.com/hax/es6-in-action)

---

## 工欲善其事 必先利其器
--

 * 编译器
--


 * 自动构建
--


 * 代码质量工具
--


 * 编辑器/IDE

---

## 特性总结

  - module
  - class
  - let/const
  - arrow function
  - spread, rest param
  - destructuring, default value
  - for of

---

## 特性总结

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
