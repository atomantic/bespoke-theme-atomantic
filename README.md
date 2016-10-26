[![Build Status](https://secure.travis-ci.org/atomantic/bespoke-theme-atomantic.png?branch=master)](https://travis-ci.org/atomantic/bespoke-theme-atomantic)

# bespoke-theme-atomantic

A theme for [Bespoke.js](http://markdalgleish.com/projects/bespoke.js) &mdash; [View demo](http://atomantic.github.io/bespoke-theme-atomantic)

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/atomantic/bespoke-theme-atomantic/master/dist/bespoke-theme-atomantic.min.js
[max]: https://raw.github.com/atomantic/bespoke-theme-atomantic/master/dist/bespoke-theme-atomantic.js

## Usage

### Basic
This theme is shipped in a [UMD format](https://github.com/umdjs/umd), meaning that it is available as a CommonJS/AMD module or browser global.

For example, when using CommonJS modules:

```js
var bespoke = require('bespoke'),
  atomantic = require('bespoke-theme-atomantic');

bespoke.from('#presentation', [
  atomantic()
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.themes.atomantic()
]);
```

### X-Gif
This theme utilizes x-gif for awesome background gif control. If you would like to include gifs and have control over speed, iterations, ping-pong, n-times, and wait-for-gif content, you will need to do the following in your bespoke.js main deck code:

* `npm i -S x-gif`
* in your gulpfile, make sure the x-gif dist from node_modules is in your project dist:
```javascript
gulp.task('x-gif', function() {
  return gulp.src([
    'node_modules/x-gif/dist/*'
  ]).pipe(gulp.dest('dist/x-gif'));
});
```

Then you can use x-gif by simply adding elements like this to your deck:

* simple repeating gif, filling up the background:
```jade
section
  .fullscreen
    x-gif(src="images/perfect_beardscratch.gif" fill)
  .content
    .box
      h2 Awesome Repeating Gif in the background
```
* content that waits for the gif to complete
```
section
  .fullscreen
    x-gif(src="images/perfect_beardscratch.gif" fill n-times=2)
  .content.wait-for-gif
    .box
      h2 The gif stopped!
```
see the x-gif docs for more options on the x-gif element: http://atomantic.github.io/x-gif/

## Package managers

### npm

```bash
$ npm install bespoke-theme-atomantic
```

### Bower

```bash
$ bower install bespoke-theme-atomantic
```

## Credits

This theme was built with [generator-bespoketheme](https://github.com/markdalgleish/generator-bespoketheme).



## Author

Adam Eivy is a software architect by day and a drawing dad by night. Check out his latest project [Beetle Royale](http://beetleroyale.com) or [follow him on the interwebs](http://adameivy.com)

[![gratipay](https://img.shields.io/gratipay/antic.svg?style=flat)](https://gratipay.com/antic)

![follow](https://img.shields.io/twitter/follow/antic.svg?style=social&label=Follow)

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/atomantic/bespoke-theme-atomantic/badge.svg?style=beer-square)](https://beerpay.io/atomantic/bespoke-theme-atomantic)  [![Beerpay](https://beerpay.io/img/badges/make-wish-square.svg)](https://beerpay.io/atomantic/bespoke-theme-atomantic?focus=wish)
