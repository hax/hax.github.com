# Myths of CSS Frameworks

贺师俊 - @hax


## About me

 - Web Developer @ BaiXing.com

   ---
   
   We just announced **$100 million** D round 3 days ago.

   ---
   
   So it's a good time to...
   
   ---

   **JOIN US**

   (http://jobs.baixing.com)

   ---

 - Write first html page in 1998, for IE 4

 - Love the Web platform, especially the design of CSS

 - Famous as a critic

   ---

   ![我不是为了输赢，我就是认真](http://mmbiz.qpic.cn/mmbiz/agEQQ7NdJSNsicF1gEy6wJTlLd5COiac9YeOyn6iazca5icBtsWRxrtlwas0cuKCIMLWibHdNuO5w5R3T3plRzG1oKA/0)

   ---

---

So let's talk about CSS Frameworks...

---


## What are CSS Frameworks?


### [Wikipedia article](http://en.wikipedia.org/wiki/CSS_frameworks)

 - pre-prepared software frameworks

 - allow for easier, more standards-compliant web design

 - CSS, of course

 - JavaScript based functions, design oriented and unobtrusive 

 
### Consist of...

   - Reset-Stylesheet
   - grid especially for responsive web design
   - web typography
   - set of icons in sprites or iconfonts
   - styling for tooltips, buttons, elements of forms
   - parts of graphical user interfaces like Accordion, tabs, slideshow or Modal windows (Lightbox)
   - Equalizer to create equal height content
   - often used css helper classes (left, hide)


### Notable examples

   - Bootstrap (Most stars project on GitHub)
   - Foundation
   - Semantic UI
   - [More...](http://usablica.github.io/front-end-frameworks/compare.html)


### The End

  No, I don't want to talk about Bootstrap...

  But, something behind it, for example:

  [Scope CSS classes with prefixes](http://markdotto.com/2012/02/16/scope-css-classes-with-prefixes/) ([中译 by @cssmagic](https://github.com/cssmagic/blog/issues/45))

  Such thought is so called:


## CSS Strategy/Approach/Best Practices/Methodologies/Architecture/Philosophy

 - OOCSS
 - ACSS
 - BEM
 - SMACSS


## OOCSS

 - Object Oriented CSS
 - https://github.com/stubbornella/oocss/wiki
 - http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/
 - http://www.slideshare.net/stubbornella/object-oriented-css
 - http://www.slideshare.net/stubbornella/our-best-practices-are-killing-us
 - http://www.slideshare.net/stubbornella/css-bloat

### The Principles Of OOCSS

 - Separate structure and skin
 - Separate container and content

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

### Guidelines

 - Avoid the descendent selector (i.e. don’t use .sidebar h3)
 - Avoid IDs as styling hooks
 - Avoid attaching classes to elements in your stylesheet (i.e. don’t do div.header or h1.title)


### Origin

#### http://www.slideshare.net/stubbornella/our-best-practices-are-killing-us

![our-best-practices-are-killing-us](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-1-728.jpg?cb=1302790778)

#### Three Best Practices Myths
![Three Best Practices Myths](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-29-728.jpg?cb=1302790778)

#### H3 in sidebar
![sidebar h3](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-65-728.jpg?cb=1302790778)

#### New H3
![new h3 mock](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-68-728.jpg?cb=1302790778)

#### Cascading H3s
![cascading h3s](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-69-728.jpg?cb=1302790778)

#### More!
![more h3](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-79-728.jpg?cb=1302790778)

#### Six months later...
![6 months later](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-80-728.jpg?cb=1302790778)

#### Inline style to rescue
![inline style](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-83-728.jpg?cb=1302790778)

#### `!important` to rescue
![important](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-88-728.jpg?cb=1302790778)

#### Solution
[solve](http://image.slidesharecdn.com/bestpractices-110330135557-phpapp02/95/our-best-practices-are-killing-us-98-728.jpg?cb=1302790778)


## ACSS
 
 - Atomic CSS

## BEM

 - Block__Element--Modifier
 -

 - http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/


## SMACSS

 - 

## Abstraction mechnism in CSS

### CSS variable is harmful

 - By Bert Bos
 -

### Key points


