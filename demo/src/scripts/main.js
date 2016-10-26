var bespoke = require('bespoke'),
  atomantic = require('../../../lib/bespoke-theme-atomantic.js'),
  hash = require('bespoke-hash'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale'),
  progress = require('bespoke-progress');
  // backdrop = require('bespoke-backdrop');

// Prism syntax highlighting
// This is actually loaded from "bower_components" thanks to
// debowerify: https://github.com/eugeneware/debowerify
window.$ = window.jQuery = require("jquery");
require('notifyjs-browser')($);
require('prismjs');
require('prismjs/components/prism-jade.min.js');
// require('prism/components/prism-yaml.min.js');
// require('prism/components/prism-bash.js');
// require('prism/components/prism-json.js');
// require('prism/components/prism-css.js');
// require('prism/components/prism-css-extras.js');
// require('prism/plugins/line-highlight/prism-line-highlight.js');
// require('prism/plugins/line-numbers/prism-line-numbers.min.js');

bespoke.from('article', [
  atomantic(),
  hash(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  scale(),
  progress()
]);

$.notify.addStyle("instructions", {
  html: "<div>" +
    "<div class='image' data-notify-html='image'/>" +
    "<div class='text-wrapper'>" +
    "<div class='title' data-notify-html='title'/>" +
    "<div class='text' data-notify-html='text'/>" +
    "</div>" +
    "<div class='clearfix'></div>" +
    "</div>"
});

setTimeout(function() {
    $('.notify').each(function(){
      var $t = $(this);
      $t.notify({
        text: $t.attr('title')
      },{
        style: 'instructions',
        className: $t.data('color') || 'base',
        autoHide: false,
        arrowShow: !$t.data('noarrow'),
        position: $t.data('position') || 'right middle'
      });
    });
}, 2000);

$('.actionable').children().on('click', function(){
  var classList = [];
  var t = $(this),
      s = t.closest('section'),
      a = t.closest('.actionable'),
      e = a.data('elem'),
      w = a.data('with'),
      p = s.find('pre'),
      $e = e === 'section' ? s : s.find(e),
      r = new RegExp(e+'[^\(\n]*'),
      c = t.text().replace('.','');
  if(w){
    // combined with another actionable
    var $w = s.find('.'+w).find('.em-orange');
    if($w.length){
      classList.push($w.text().replace('.',''));
    }
  }
  // first add the element if it's a class
  var elementIsClass = e.indexOf('.') !== -1;
  if(elementIsClass){
    // element is a class
    classList.push(e.replace('.',''));
  }
  // then add the new class from the button
  if(c === '(default)'){
    c = '';
  }else{
    classList.push(c);
  }
  // re-add any exisitng classes
  var existingClasses = a.data('classes');
  if(existingClasses){
    classList = classList.concat(existingClasses.split(' '));
  }
  var classJade = '.' + classList.join('.')

  $e.removeClass().addClass(classList.join(' '));
  p.html(p.html().replace(r, (elementIsClass ? '' : e) + classJade.replace('.bespoke-slide.bespoke-active','')));
  t.siblings()
    .addClass('em-blue').removeClass('em-orange').end()
    .addClass('em-orange').removeClass('em-blue');
});
