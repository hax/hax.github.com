# Myths of CSS Frameworks

贺师俊 - @hax

---

## About me
--

 - Web Developer
--
   @ BaiXing.com
---

### Baixing.com
--
   We just announced **$100 million** D round 3 days ago.

--

   So it's a good time to...

--
   
   **JOIN US**

--

   (http://jobs.baixing.com)
---

## About me

 - Web Developer @ BaiXing.com

--

 - Write first html page in 1998
--
   , for IE 4

 - Love the Web platform
--
   , especially the design of CSS

--

 - Famous as a critic

---
## 情怀

   ![我不是为了输赢，我就是认真](http://mmbiz.qpic.cn/mmbiz/agEQQ7NdJSNsicF1gEy6wJTlLd5COiac9YeOyn6iazca5icBtsWRxrtlwas0cuKCIMLWibHdNuO5w5R3T3plRzG1oKA/0)

---
## 言归正传

So let's talk about CSS Frameworks...

---


## What are CSS Frameworks?
---

### [Wikipedia article](http://en.wikipedia.org/wiki/CSS_frameworks)

 - pre-prepared software frameworks

 - allow for easier, more standards-compliant web design

--

 - CSS, of course

--

 - JavaScript based functions, design oriented and unobtrusive 

---
 
### Consist of...
--

   - Reset-Stylesheet

   - grid especially for responsive web design

   - web typography

   - set of icons in sprites or iconfonts

   - styling for tooltips, buttons, elements of forms

   - parts of graphical user interfaces like Accordion, tabs, slideshow or Modal windows (Lightbox)

   - Equalizer to create equal height content

   - often used css helper classes (left, hide)
---

### Notable examples
--

   - Bootstrap 
--
     (Most stars project on GitHub)

   - Foundation

--

   - Semantic UI

--

   - [More...](http://usablica.github.io/front-end-frameworks/compare.html)

---
###

  No, I don't want to talk about Bootstrap...

---
### The End

  No, I don't want to talk about Bootstrap...

--

  But, something behind it, for example:

---

### Bootstrap sample from Wikipedia

```html
<!DOCTYPE html>
  <body>
    <div class="container">
      <h1>Search</h1>
      <label>Example for a simple search form.</label>
 
      <!-- Search form with input field and button -->
      <form class="well form-search">
        <input type="text" class="input-medium search-query">
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
 
      <h2>Results</h2>
 
      <!-- Table with alternating cell background color and outer frame -->
      <table class="table table-striped table-bordered">
        ...
      </table>
    </div>
```
---

### Why?

--

  [Scope CSS classes with prefixes](http://markdotto.com/2012/02/16/scope-css-classes-with-prefixes/)

--

  [中译 by @cssmagic](https://github.com/cssmagic/blog/issues/45)

--

  Such thought is so called:

---

## CSS Strategy
--
   / Approach
--
   / Best Practices
--
   / Methodologies
--
   / Architecture
--
   / Philosophy

--

 - OOCSS

--

 - SMACSS

--

 - ACSS

--

 - BEM

--- 

## OOCSS

 - Object Oriented CSS

--

 - https://github.com/stubbornella/oocss/wiki

--

 - http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/

--

 - http://www.slideshare.net/stubbornella/object-oriented-css

--

 - http://www.slideshare.net/stubbornella/our-best-practices-are-killing-us

--

 - http://www.slideshare.net/stubbornella/css-bloat

---

### The Principles Of OOCSS

--

 - Separate structure and skin

--

 - Separate container and content

---

### Sample 1 (traditional)

```css
#button {
  width: 200px;
  height: 50px;
  padding: 10px;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}

#box {
  width: 400px;
  overflow: hidden;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}

#widget {
  width: 500px;
  min-height: 200px;
  overflow: auto;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}
```

---

### Sample 1 (OOCSS)

```css

.button {
  width: 200px;
  height: 50px;
}

.box {
  width: 400px;
  overflow: hidden;
}

.widget {
  width: 500px;
  min-height: 200px;
  overflow: auto;
}

.skin {
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
  box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
}
```

---

### Sample 2

```html
<div class="mod simple"> 
  <b class="top"><b class="tl"></b><b class="tr"></b></b> 
  <div class="inner">
    <div class="hd">
      <h3>simple</h3>
    </div>
    <div class="bd">
      <p>Body</p>
    </div>
  </div>
  <b class="bottom"><b class="bl"></b><b class="br"></b></b> 
</div>
```

```css
/* ----- simple (extends mod) ----- */
.simple .inner {border:1px solid #D7D7D7;-moz-border-radius: 7px;-webkit-border-radius: 7px;border-radius: 7px;}
.simple b{*background-image:url(skin/mod/simple_corners.png);}
```

---

### Guidelines

 - Avoid the descendent selector (i.e. don’t use .sidebar h3)
 - Avoid IDs as styling hooks
 - Avoid attaching classes to elements in your stylesheet (i.e. don’t do div.header or h1.title)


---


### Origin

---

#### http://www.slideshare.net/stubbornella/our-best-practices-are-killing-us

![our-best-practices-are-killing-us](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-1-728.jpg?cb=1302790778)

---

#### Three Best Practices Myths
![Three Best Practices Myths](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-29-728.jpg?cb=1302790778)

---

#### H3 in sidebar
![sidebar h3](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-65-728.jpg?cb=1302790778)

---

#### New H3
![new h3 mock](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-68-728.jpg?cb=1302790778)

---

#### Cascading H3s
![cascading h3s](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-69-728.jpg?cb=1302790778)

---

#### More!
![more h3](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-79-728.jpg?cb=1302790778)

---

#### Six months later...
![6 months later](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-80-728.jpg?cb=1302790778)

---

#### Inline style to rescue
![inline style](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-83-728.jpg?cb=1302790778)

---

#### `!important` to rescue
![important](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-88-728.jpg?cb=1302790778)

---

#### Solution
![solve](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-98-728.jpg?cb=1302790778)


---

## SMACSS

 - http://smacss.com/
 - http://www.smashingmagazine.com/2012/04/20/decoupling-html-from-css/

### Categorizing CSS Rules

  0. Base (element only selector)
  0. Layout (id selector + layout class)
  0. Module (class only selector + descendant selector)
  0. State (class selector)
  0. Theme (override below rules)


### Minimizing the Depth

  `body.article > #main > #content > #intro > p > b` => `.article #intro b`

  (Nest structure of CSS preprocessors)


### Selector Performance

  * classes are indexed
  * right to left

  ---

  * Avoid tag selectors for common elements
  * Use class names as the right-most selector

### Increase semantics and decrease reliance on specific HTML

```html
<nav class="l-inline">
    <h1>Primary Navigation</h1>
    <ul>
        <li>About Us
            <ul class="l-stacked">
                <li>Team</li>
                <li>Location</li>
            </ul>
        </li>
    </ul>
</nav>
```

```css
.l-inline li { 
    display: inline-block;
}

.l-stacked li {
    display: block;
}
```

### Decouple HTML from CSS

`.box`, `.box h2`, `.box ul, .box p` =>

`.box`, `.box .hd`, `.box .bd` =>

`.box`, `.box-hd`, `.box-bd`


### Thoughts
  I find that SMACSS is too loose of a convention (that at times contradicts its own advice) 
  --- http://snugug.com/musings/css-strategy


## ACSS
 
 - Atomic CSS
 - http://www.smashingmagazine.com/2013/08/02/other-interface-atomic-design-sass/
 - http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/

### Sample

```css
.mt-20 {
    margin-top: 20px;
}
/* Or */
.fl {
    float: left;
}
```

### Just abbrev of a single css declaration

**WTF?**


### Origin

```html
<div class="media">
  <a href="http://twitter.com/thierrykoblentz" class="img">
        <img src="thierry.jpg" alt="me" width="40" />
  </a>
  <div class="bd">
    @thierrykoblentz 14 minutes ago
  </div>
</div>
```

```css
.media .img {
    float: left;
    margin-right: 10px;
}
```


### New Requirement: display the image on the other side
```html
<a href="http://twitter.com/thierrykoblentz" class="imgExt">
```
```css
.media .imgExt {
    float: right;
    margin-left: 10px;
}
```

### One More Requirement: make the text smaller when this module is inside the right rail of the page
```html
<div id="rightRail">
    <div class="media">
```
```css
.media {
    margin: 10px;
}
.media,
.bd {
    overflow: hidden;
    _overflow: visible;
    zoom: 1;
}
.media .img {
    float: left;
    margin-right: 10px;
}
.media .img img {
    display: block;
}
.media .imgExt {
    float: right;
    margin-left: 10px;
}
#rightRail .bd {
    font-size: smaller;
}
```

### What's Wrong

 - Simple changes to the style of our module have resulted in new rules in the style sheet.
 - We are grouping selectors for common styles (.media,.bd {}).
 - Of our six rules, four are context-based.
 - RTL and LTR interfaces become complicated.

### ACSS version

```html
<div class="Bfc M-10">
    <a href="http://twitter.com/thierrykoblentz" class="Fl-start Mend-10">
        <img src="thierry.jpg" alt="me" width="40" />
    </a>
    <div class="Bfc Fz-s">
        @thierrykoblentz 14 minutes ago
    </div>
</div>
```
```css
.Bfc {
    overflow: hidden;
    zoom: 1;
}
.M-10 {
    margin: 10px;
}
.Fl-start {
    float: left;
}
.Mend-10 {
    margin-right: 10px;
}
.Fz-s {
    font-size: smaller;
}
```

### Styling via markup

 - No contextual styling
 - Directions (left and right) are “abstracted.”

### Why good?

 - Good names don’t change
 - is about *maintenance*, not semantics per se.
 - Specificity (lower than inline script)
 - Verbosity (`M-10` VS `margin: 10px`)
 - Scope
 - Portability

### Large site

 - We leave alone rules that we suspect to be obsolete for fear of breaking something.
 - We create new rules, rather than modify existing ones, because we are not sure the latter is 100% safe.
 - CSS bloat VS HTML bloat: CSS is cachable

### Pollute the markup rather than the style sheet.
 
 - Less bloat

   We can build entire modules without adding a single line to the style sheets.

 - Faster development

   Styles are driven by classes that are not related to content, so we can copy and paste existing modules to get started.

 - RTL interface for free

   Using start and end keywords makes a lot of sense. It saves us from having to write extra rules for RTL context.

 - Better caching

   A huge chunk of CSS can be shared across products and properties.

 - Very little maintenance (on the CSS side)

   Only a small set of rules are meant to change over time.

 - Less abstraction

   There is no need to look for rules in a style sheet to figure out the styling of a template. It’s all in the markup.

 - Third-party development
   
   A third party can hand us a template without having to attach a style sheet (or a style block) to it. No custom rules from third parties means no risk of breakage due to rules that have not been properly namespaced.


### MetaCSS

 - Practice of the Chinese large sites: kaixing001, 163, etc.
 - Just same as ACSS
 - http://www.iteye.com/news/10843-metacss-css-framework


## BEM

 - Block__Element--Modifier
 - http://bem.info
 - http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/
 - http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

### Example

```css
/* This is the Block */
.block {}
/* This is a child of the block that helps to for it */
.block__element {}
/* This modifies the element */
.block--modifier {}
```

### Some variants

#### [Title CSS](http://www.sitepoint.com/title-css-simple-approach-css-class-naming/)

```html
<div class="Title isModified">
    <p class="descendant">
</div>
```
```css
.Title {}
  .Title.isModified {}
  .Title .descendant {}
```

#### Oops, I already found that independently!

https://github.com/cssmagic/blog/issues/45#issuecomment-40124120

 > 所有他操心的其实是使用者如何能清晰快速的在html上挂样式类而不挂错。想明白这点，就会发现所谓前缀式其实并没有什么神秘的力量。假设我们为所谓chained方式引入额外的命名规约，其实也能解决问题。比如所有组件名首字母大写（就好像OO中的klass那样）。
 > `.Btn.success`
 > `.Alert.success`
 > 看上去是不是就突然清晰了？

### More variants...

 - [SUIT CSS](https://suitcss.github.io/)
 - [NORTH](https://github.com/north/north)
 - ...


## Some interesting theories

### Do NOT use HTML5 new semantic tags like header/footer/section/article/nav/aside...

### Style can be semantic

### Semantic classes is meaningless

 > classes are neither semantic or insemantic; they are sensible or insensible! Stop stressing about ‘semantic’ class names and pick something sensible and futureproof
 --- @csswizardry , Author of inuit CSS framework which follow OOCSS and BEM



## Abstraction mechanism in CSS

### Why “variables” in CSS are harmful

 - By Bert Bos
 - 30 June 2008

### Summary

 - External program can replace constant
 - Cost to user-defined names: memory (when writing) and understanding (when reading)
 - Style sheets are short
 - Hard to reuse (c&p)
 - Hard to learn
 - Modular
 - Help for authors, not for the semantic web


### Conclusion
 
 CSS do NOT have any abstraction mechanism itself, up to now ([CSS variables draft](http://dev.w3.org/csswg/css-variables/))

 So the only way to "reuse" style rules is "css class hook"


### My Thoughts

 - [Meta CSS —— Anti Pattern的典型 (MetaCSS/ACSS is anti-pattern)](http://hax.iteye.com/blog/497338)
 - [关于样式类 (Style Class can be avoid)](http://hax.iteye.com/blog/500015)
 - [再谈某些所谓CSS最佳实践 (Recheck "Best Practices" around using class)](http://hax.iteye.com/blog/849826)
 - [My Opinion about so-called "CSS Framework"](http://hax.iteye.com/blog/1706557)
 - [In Defense of Descendant Selectors and ID Elements](http://www.zeldman.com/2012/11/21/in-defense-of-descendant-selectors-and-id-elements/) by Zeldman
   [为后代选择器和ID选择器而辩护](http://hax.iteye.com/blog/1850571)
 - [为什么会产生 .text-size30 {font-size:30px} (Why the smart guys use .text-size30 {font-size:30px})](http://www.zhihu.com/question/20658520/answer/15770608)
 - [如何看待BEM (BEM is not a new thing)](http://www.zhihu.com/question/21935157/answer/19791915)


## Requirements of UI component

 - Not sure what's the best solution
   * HTC, XBL, BECSS, dead `binding` or `behavior` CSS property...
   * Server-side managed components like ASP.NET WebForms, JSF, etc.
   * JavaScript frameworks like Bindows, Ext...too many!
   * CSS frameworks like Bootstrap, Semantic-UI...
   * Recent client-side MV* frameworks like Angular, Ember, React, etc.
   * Polymer

 - But we definitely need it

### How to solve the problem?

 - Workflow: Information/Content/Semantic-driven VS UI-driven

 - Tools: CSS preprocessor

   [Debunking the myths surrounding CSS Pre-Processors](http://www.cyber-duck.co.uk/blog/debunking-the-myths-surrounding-css-pre-processors-at-sxswi-2014-in-austin)

 - Do Components in Right Way

   * [Custom Element]
   * [Shadow DOM]
   * [Scoped Style]
   * [CSS `unset` value]

 - CSS extensions

   We finally will use CSS variables, 

   Sorry Bert.

   [cssnext](https://cssnext.github.io/cssnext-playground/)


### NO semantic CSS

[Semantic CSS With Intelligent Selectors](http://www.smashingmagazine.com/2013/08/20/semantic-css-with-intelligent-selectors/)

[译：结合智能选择器的语义化的CSS](http://www.w3cplus.com/css/semantic-css-with-intelligent-selectors.html)

**There’s no such thing as semantic CSS.*** There’s only semantic HTML and its visible form. 

### FAQ

