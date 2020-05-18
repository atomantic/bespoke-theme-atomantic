var fs = require('fs');
var classes = require('bespoke-classes');
var insertCss = require('insert-css');

window.$ = window.jQuery = require("jquery").noConflict(true);

var xgif = function (deck) {
  var gifs = deck.slides.map(function (slide) {
    return [].slice.call(slide.querySelectorAll('x-gif'), 0);
  });

  var setStopped = function (stopped) {
    return function (slide) {
      gifs[slide.index].map(function (gif) {
        stopped ? gif.setAttribute('stopped', '') && slide.slide.classList.add('x-gif-finished') : gif.removeAttribute('stopped');
        slide.slide.classList.remove('x-gif-finished');
        if (!stopped) gif.addEventListener('x-gif-finished', function () {
          slide.slide.classList.add('x-gif-finished');
        })
      });
    }
  };

  deck.on('activate', setStopped(false));
  deck.on('deactivate', setStopped(true));
};
var activeAnimations = function (deck) {
  deck.on('activate', function (e) {
    console.log('acivate slide')
    Array.prototype.forEach.call((e.slide.querySelectorAll('.animated') || []), function (el) {
      el.outerHTML = el.outerHTML.replace('animated', 'animate animated');
    });
    [].forEach.call(document.querySelectorAll('x-gif'), function (elem) {
      elem.removeAttribute('stopped');
    });
  });
};
module.exports = function () {
  var css = fs.readFileSync(__dirname + '/../dist/theme.css', 'utf8');
  insertCss(css, { prepend: true });

  return function (deck) {
    classes()(deck);
    activeAnimations(deck);
    xgif(deck);
  };
};

window.addEventListener('resize', function () {
  [].forEach.call(document.querySelectorAll('x-gif'), function (elem) {
    elem.relayout();
  });
});

// main slide-deck needs to do
// npm i -D x-gif
// and make sure node_modules/x-gif/dist
// makes it into dist/x-gif
// see gulpfile.js
if ('registerElement' in document
  && 'createShadowRoot' in HTMLElement.prototype
  && 'import' in document.createElement('link')
  && 'content' in document.createElement('template')) {
  // We're using a browser with native WC support!
} else {
  // note: currently platform.js is broken in safari and other browsers:
  // https://github.com/geelen/x-gif/issues/33
  // document.write('<script src="x-gif/platform.js"><\/script>');
  // using newer webcomponents library
  var tag = document.createElement('script');
  // tag.src="x-gif/platform.js";
  //https://cdnjs.com/libraries/webcomponentsjs
  tag.src = "https:\/\/cdnjs.cloudflare.com/ajax/libs/polymer/0.3.4/platform.js";
  // tag.src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/webcomponents.js";
  // tag.src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.0/webcomponents-loader.js";
  // tag.src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.0/webcomponents-bundle.js";
  // tag.src = "https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.3/webcomponents-loader.js";
  document.head.appendChild(tag);
  var bs = document.getElementById('browsersupport');
  if (bs) {
    bs.className = bs.className.replace('hide', '');
  }
  // [].slice.call(document.querySelectorAll('.wait-for-gif'), 0).map(function (el) {
  //   el.classList.remove('wait-for-gif');
  //   el.classList.add('wait-for-gif-unsupported');
  // });
}

var brightness = 0;
document.addEventListener('keyup', function (e) {
  var setBrightness = function () {
    document.querySelector('article').style.webkitFilter = "brightness(" + (1 + brightness) + ") contrast(" + (1 + brightness * 0.25) + ")"
  }
  if (e.shiftKey) {
    if (e.keyCode == 38) { // up
      brightness += 0.1;
      setBrightness(brightness);
    } else if (e.keyCode == 40) { // down
      brightness -= 0.1;
      setBrightness(brightness);
    } else if (e.keyCode == 48) { // 0
      brightness = 0;
      setBrightness(brightness);
    }
  }
  // console.log(e.keyCode);
  if (e.keyCode == 82) { // r
    var anims = document.querySelectorAll('.rotate, .spin');
    for (i = 0; i < anims.length; i++) {
      anims[i].classList.toggle('on');
    }
  }
});

// un-animate when we finish, so we can animate again when we toggle back and forth onto this slide
var animations = document.querySelectorAll('.animate');
var onAnimComplete = function (e) {
  e.target.classList.remove('animated');
};
Array.prototype.forEach.call(animations, function (el, i) {
  el.addEventListener('webkitAnimationEnd', onAnimComplete);
  el.addEventListener('mozAnimationEnd', onAnimComplete);
  el.addEventListener('MSAnimationEnd', onAnimComplete);
  el.addEventListener('oanimationend', onAnimComplete);
  el.addEventListener('animationend', onAnimComplete);
});

// drop the x-gif element at the bottom of the page
var link = document.createElement('link');
link.rel = "import";
link.href = "x-gif/x-gif.html";
document.body.appendChild(link);

var fontLink = document.createElement('link');
fontLink.rel = "stylesheet";
fontLink.type = "text/css";
fontLink.href = "//fonts.googleapis.com/css?family=Courgette|Droid+Sans";
document.head.appendChild(fontLink);

$('x-gif').on('x-gif-finished', function () {
  console.log('finished', $(this).closest('.bespoke-slide'))
  $(this).closest('.bespoke-slide').addClass('x-gif-finished');
});


