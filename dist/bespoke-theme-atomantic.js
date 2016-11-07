/*!
 * bespoke-theme-atomantic v2.1.4
 *
 * Copyright 2016, Adam Eivy
 * This content is released under the MIT license
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.bespoke||(g.bespoke = {}));g=(g.themes||(g.themes = {}));g.atomantic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var classes = require('bespoke-classes');
var insertCss = require('insert-css');
var xgif = function(deck) {
    var gifs = deck.slides.map(function(slide) {
      return [].slice.call(slide.querySelectorAll('x-gif'), 0);
    });

    var setStopped = function(stopped) {
      return function(slide) {
        gifs[slide.index].map(function(gif) {
          stopped ? gif.setAttribute('stopped', '') : gif.removeAttribute('stopped');
          slide.slide.classList.remove('x-gif-finished');
          if (!stopped) gif.addEventListener('x-gif-finished', function() {
              slide.slide.classList.add('x-gif-finished');
            })
        });
      }
    };

    deck.on('activate', setStopped(false));
    deck.on('deactivate', setStopped(true));
  };
var activeAnimations = function(deck){
  deck.on('activate', function(e) {
    Array.prototype.forEach.call((e.slide.querySelectorAll('.animated')||[]), function(el){
      el.outerHTML = el.outerHTML.replace('animated', 'animate animated');
    });
  });
};

module.exports = function() {
  var css = "/*! normalize.css v3.0.0 | MIT License | git.io/normalize */\nhtml{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background:0 0}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}legend,td,th{padding:0}\n/*!\n * animate.css -http://daneden.me/animate\n * Version - 3.5.1\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2016 Daniel Eden\n */\n.animated{animation-duration:1s;animation-fill-mode:both}.animated.infinite{animation-iteration-count:infinite}.animated.hinge{animation-duration:2s}.animated.bounceIn,.animated.bounceOut,.animated.flipOutX,.animated.flipOutY{animation-duration:.75s}@keyframes bounce{0%,20%,53%,80%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1);transform:translateZ(0)}40%,43%{transform:translate3d(0,-30px,0)}40%,43%,70%{animation-timing-function:cubic-bezier(.755,.05,.855,.06)}70%{transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}.bounce{animation-name:bounce;transform-origin:center bottom}@keyframes flash{0%,50%,to{opacity:1}25%,75%{opacity:0}}.flash{animation-name:flash}@keyframes pulse{0%,to{transform:scaleX(1)}50%{transform:scale3d(1.05,1.05,1.05)}}.pulse{animation-name:pulse}@keyframes rubberBand{0%,to{transform:scaleX(1)}30%{transform:scale3d(1.25,.75,1)}40%{transform:scale3d(.75,1.25,1)}50%{transform:scale3d(1.15,.85,1)}65%{transform:scale3d(.95,1.05,1)}75%{transform:scale3d(1.05,.95,1)}}.rubberBand{animation-name:rubberBand}@keyframes shake{0%,to{transform:translateZ(0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}.shake{animation-name:shake}@keyframes headShake{0%,50%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}}.headShake{animation-timing-function:ease-in-out;animation-name:headShake}@keyframes swing{20%{transform:rotate(15deg)}40%{transform:rotate(-10deg)}60%{transform:rotate(5deg)}80%{transform:rotate(-5deg)}to{transform:rotate(0deg)}}.swing{transform-origin:top center;animation-name:swing}@keyframes tada{0%,to{transform:scaleX(1)}10%,20%{transform:scale3d(.9,.9,.9) rotate(-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate(3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}}.tada{animation-name:tada}@keyframes wobble{0%,to{transform:none}15%{transform:translate3d(-25%,0,0) rotate(-5deg)}30%{transform:translate3d(20%,0,0) rotate(3deg)}45%{transform:translate3d(-15%,0,0) rotate(-3deg)}60%{transform:translate3d(10%,0,0) rotate(2deg)}75%{transform:translate3d(-5%,0,0) rotate(-1deg)}}.wobble{animation-name:wobble}@keyframes jello{0%,11.1%,to{transform:none}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-.78125deg) skewY(-.78125deg)}77.7%{transform:skewX(.390625deg) skewY(.390625deg)}88.8%{transform:skewX(-.1953125deg) skewY(-.1953125deg)}}.jello{animation-name:jello;transform-origin:center}@keyframes bounceIn{0%,20%,40%,60%,80%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:scale3d(.3,.3,.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(.9,.9,.9)}60%{opacity:1;transform:scale3d(1.03,1.03,1.03)}80%{transform:scale3d(.97,.97,.97)}to{opacity:1;transform:scaleX(1)}}.bounceIn{animation-name:bounceIn}@keyframes bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}.bounceInDown{animation-name:bounceInDown}@keyframes bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}.bounceInLeft{animation-name:bounceInLeft}@keyframes bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}.bounceInRight{animation-name:bounceInRight}@keyframes bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}.bounceInUp{animation-name:bounceInUp}@keyframes bounceOut{20%{transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(.3,.3,.3)}}.bounceOut{animation-name:bounceOut}@keyframes bounceOutDown{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.bounceOutDown{animation-name:bounceOutDown}@keyframes bounceOutLeft{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}.bounceOutLeft{animation-name:bounceOutLeft}@keyframes bounceOutRight{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}.bounceOutRight{animation-name:bounceOutRight}@keyframes bounceOutUp{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}.bounceOutUp{animation-name:bounceOutUp}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.fadeIn{animation-name:fadeIn}@keyframes fadeInDown{0%{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:none}}.fadeInDown{animation-name:fadeInDown}@keyframes fadeInDownBig{0%{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:none}}.fadeInDownBig{animation-name:fadeInDownBig}@keyframes fadeInLeft{0%{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:none}}.fadeInLeft{animation-name:fadeInLeft}@keyframes fadeInLeftBig{0%{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:none}}.fadeInLeftBig{animation-name:fadeInLeftBig}@keyframes fadeInRight{0%{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:none}}.fadeInRight{animation-name:fadeInRight}@keyframes fadeInRightBig{0%{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:none}}.fadeInRightBig{animation-name:fadeInRightBig}@keyframes fadeInUp{0%{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:none}}.fadeInUp{animation-name:fadeInUp}@keyframes fadeInUpBig{0%{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:none}}.fadeInUpBig{animation-name:fadeInUpBig}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.fadeOut{animation-name:fadeOut}@keyframes fadeOutDown{0%{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}.fadeOutDown{animation-name:fadeOutDown}@keyframes fadeOutDownBig{0%{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}.fadeOutDownBig{animation-name:fadeOutDownBig}@keyframes fadeOutLeft{0%{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}.fadeOutLeft{animation-name:fadeOutLeft}@keyframes fadeOutLeftBig{0%{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}.fadeOutLeftBig{animation-name:fadeOutLeftBig}@keyframes fadeOutRight{0%{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}.fadeOutRight{animation-name:fadeOutRight}@keyframes fadeOutRightBig{0%{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}.fadeOutRightBig{animation-name:fadeOutRightBig}@keyframes fadeOutUp{0%{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}.fadeOutUp{animation-name:fadeOutUp}@keyframes fadeOutUpBig{0%{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}.fadeOutUpBig{animation-name:fadeOutUpBig}@keyframes flip{0%{transform:perspective(400px) rotateY(-1turn);animation-timing-function:ease-out}40%{animation-timing-function:ease-out;transform:perspective(400px) translateZ(150px) rotateY(-190deg)}50%{transform:perspective(400px) translateZ(150px) rotateY(-170deg);animation-timing-function:ease-in}80%{animation-timing-function:ease-in;transform:perspective(400px) scale3d(.95,.95,.95)}to{transform:perspective(400px);animation-timing-function:ease-in}}.animated.flip{-webkit-backface-visibility:visible;backface-visibility:visible;animation-name:flip}@keyframes flipInX{0%{transform:perspective(400px) rotateX(90deg);opacity:0;animation-timing-function:ease-in}40%{animation-timing-function:ease-in;transform:perspective(400px) rotateX(-20deg)}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}.flipInX,.flipInY,.flipOutX,.flipOutY{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;animation-name:flipInX}@keyframes flipInY{0%{transform:perspective(400px) rotateY(90deg);opacity:0;animation-timing-function:ease-in}40%{animation-timing-function:ease-in;transform:perspective(400px) rotateY(-20deg)}60%{transform:perspective(400px) rotateY(10deg);opacity:1}80%{transform:perspective(400px) rotateY(-5deg)}to{transform:perspective(400px)}}.flipInY,.flipOutX,.flipOutY{animation-name:flipInY}@keyframes flipOutX{0%{transform:perspective(400px)}30%{transform:perspective(400px) rotateX(-20deg);opacity:1}to{transform:perspective(400px) rotateX(90deg);opacity:0}}.flipOutX,.flipOutY{animation-name:flipOutX}@keyframes flipOutY{0%{transform:perspective(400px)}30%{transform:perspective(400px) rotateY(-15deg);opacity:1}to{transform:perspective(400px) rotateY(90deg);opacity:0}}.flipOutY{animation-name:flipOutY}@keyframes lightSpeedIn{0%{transform:translate3d(100%,0,0) skewX(-30deg);opacity:0}60%{transform:skewX(20deg);opacity:1}80%{opacity:1;transform:skewX(-5deg)}to{transform:none;opacity:1}}.lightSpeedIn{animation-name:lightSpeedIn;animation-timing-function:ease-out}@keyframes lightSpeedOut{0%{opacity:1}to{transform:translate3d(100%,0,0) skewX(30deg);opacity:0}}.lightSpeedOut{animation-name:lightSpeedOut;animation-timing-function:ease-in}@keyframes rotateIn{0%{transform-origin:center;transform:rotate(-200deg);opacity:0;-webkit-transform-origin:center}to{-webkit-transform-origin:center;transform-origin:center;transform:none;opacity:1}}.rotateIn{animation-name:rotateIn}@keyframes rotateInDownLeft{0%{transform-origin:left bottom;transform:rotate(-45deg);opacity:0;-webkit-transform-origin:left bottom}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;transform:none;opacity:1}}.rotateInDownLeft{animation-name:rotateInDownLeft}@keyframes rotateInDownRight{0%{transform-origin:right bottom;transform:rotate(45deg);opacity:0;-webkit-transform-origin:right bottom}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;transform:none;opacity:1}}.rotateInDownRight{animation-name:rotateInDownRight}@keyframes rotateInUpLeft{0%{transform-origin:left bottom;transform:rotate(45deg);opacity:0;-webkit-transform-origin:left bottom}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;transform:none;opacity:1}}.rotateInUpLeft{animation-name:rotateInUpLeft}@keyframes rotateInUpRight{0%{transform-origin:right bottom;transform:rotate(-90deg);opacity:0;-webkit-transform-origin:right bottom}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;transform:none;opacity:1}}.rotateInUpRight{animation-name:rotateInUpRight}@keyframes rotateOut{0%{transform-origin:center;opacity:1;-webkit-transform-origin:center}to{-webkit-transform-origin:center;transform-origin:center;transform:rotate(200deg);opacity:0}}.rotateOut{animation-name:rotateOut}@keyframes rotateOutDownLeft{0%{transform-origin:left bottom;opacity:1;-webkit-transform-origin:left bottom}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;transform:rotate(45deg);opacity:0}}.rotateOutDownLeft{animation-name:rotateOutDownLeft}@keyframes rotateOutDownRight{0%{transform-origin:right bottom;opacity:1;-webkit-transform-origin:right bottom}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;transform:rotate(-45deg);opacity:0}}.rotateOutDownRight{animation-name:rotateOutDownRight}@keyframes rotateOutUpLeft{0%{transform-origin:left bottom;opacity:1;-webkit-transform-origin:left bottom}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;transform:rotate(-45deg);opacity:0}}.rotateOutUpLeft{animation-name:rotateOutUpLeft}@keyframes rotateOutUpRight{0%{transform-origin:right bottom;opacity:1;-webkit-transform-origin:right bottom}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;transform:rotate(90deg);opacity:0}}.rotateOutUpRight{animation-name:rotateOutUpRight}@keyframes hinge{0%{transform-origin:top left;-webkit-transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{-webkit-transform-origin:top left;animation-timing-function:ease-in-out;transform:rotate(80deg);transform-origin:top left}40%,80%{transform:rotate(60deg);transform-origin:top left;animation-timing-function:ease-in-out;opacity:1}to{transform:translate3d(0,700px,0);opacity:0}}.hinge{animation-name:hinge}@keyframes rollIn{0%{opacity:0;transform:translate3d(-100%,0,0) rotate(-120deg)}to{opacity:1;transform:none}}.rollIn{animation-name:rollIn}@keyframes rollOut{0%{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate(120deg)}}.rollOut{animation-name:rollOut}@keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.zoomIn{animation-name:zoomIn}@keyframes zoomInDown{0%{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInDown{animation-name:zoomInDown}@keyframes zoomInLeft{0%{opacity:0;transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInLeft{animation-name:zoomInLeft}@keyframes zoomInRight{0%{opacity:0;transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInRight{animation-name:zoomInRight}@keyframes zoomInUp{0%{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInUp{animation-name:zoomInUp}@keyframes zoomOut{0%{opacity:1}50%{transform:scale3d(.3,.3,.3);opacity:0}to{opacity:0}}.zoomOut{animation-name:zoomOut}@keyframes zoomOutDown{40%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomOutDown{animation-name:zoomOutDown}@keyframes zoomOutLeft{40%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(.1) translate3d(-2000px,0,0);transform-origin:left center}}.zoomOutLeft{animation-name:zoomOutLeft}@keyframes zoomOutRight{40%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(.1) translate3d(2000px,0,0);transform-origin:right center}}.zoomOutRight{animation-name:zoomOutRight}@keyframes zoomOutUp{40%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomOutUp{animation-name:zoomOutUp}@keyframes slideInDown{0%{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translateZ(0)}}.slideInDown{animation-name:slideInDown}@keyframes slideInLeft{0%{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translateZ(0)}}.slideInLeft{animation-name:slideInLeft}@keyframes slideInRight{0%{transform:translate3d(100%,0,0);visibility:visible}to{transform:translateZ(0)}}.slideInRight{animation-name:slideInRight}@keyframes slideInUp{0%{transform:translate3d(0,100%,0);visibility:visible}to{transform:translateZ(0)}}.slideInUp{animation-name:slideInUp}@keyframes slideOutDown{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}.slideOutDown{animation-name:slideOutDown}@keyframes slideOutLeft{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}.slideOutLeft{animation-name:slideOutLeft}@keyframes slideOutRight{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}.slideOutRight{animation-name:slideOutRight}@keyframes slideOutUp{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}.slideOutUp{animation-name:slideOutUp}body{font:18px/1.5 \"Droid Sans\",futura,helvetica,arial,arial,sans-serif;font-weight:100;color:rgba(255,255,255,.95);text-shadow:0 0 2px #000,0 0 40px #000}h1{font-size:50px;font-weight:900;margin:0 auto 10px}h2{font-size:36px;font-weight:300;margin:0 auto 5px}h3,h4,h5{font-size:28px;margin:0 auto;font-weight:200}h4,h5{font-size:22px}h5{font-size:18px}ol,ul{font-size:32px;font-weight:400}ol.noprefix,ul.noprefix{list-style:none}ol.noprefix li,ul.noprefix li{margin-left:0}ol.noprefix li::before,ul.noprefix li::before{content:none}li{margin-bottom:12px;width:100%;margin-left:.5em}ol ol,ol ul,ul ol,ul ul{margin-left:30px}ol ol li,ol ul li,ul ol li,ul ul li{margin-bottom:0;line-height:1.4em}ol ol,ul ol{list-style-type:lower-roman}blockquote,li,pre{text-align:left}td,th{padding:10px;border:1px solid #ccc}th{background-color:#333}td{background-color:#444;text-shadow:none}pre{border-radius:8px;padding:10px}pre .em-blue,pre .em-green,pre .em-red,pre .em-yellow{margin:5px 0}.bespoke-parent,.bespoke-scale-parent{position:absolute;top:0;left:0;right:0;bottom:0}.bespoke-parent{-webkit-text-size-adjust:auto;-ms-text-size-adjust:auto;text-size-adjust:auto;background:#111;overflow:hidden;transition:background 1s ease;background-position:50% 50%}.bespoke-scale-parent{pointer-events:none}.bespoke-scale-parent .bespoke-active{pointer-events:auto}.bespoke-slide{width:100%;height:100%;position:absolute;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.bespoke-slide.x-gif-finished .box.wait-for-gif{opacity:1}.bespoke-bullet-inactive,.bespoke-inactive{opacity:0;pointer-events:none}.bespoke-backdrop{position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1;opacity:0}.bespoke-backdrop-active{opacity:1}.bespoke-progress-parent{position:absolute;top:0;left:0;right:0;height:.3vw}.bespoke-progress-bar{position:absolute;height:100%;background:#ccc;transition:width .6s ease}.carbonfiber{background:radial-gradient(#000 15%,transparent 16%) 0 0,radial-gradient(#000 15%,transparent 16%) 8px 8px,radial-gradient(rgba(255,255,255,.1) 15%,transparent 20%) 0 1px,radial-gradient(rgba(255,255,255,.1) 15%,transparent 20%) 8px 9px;background-color:#282828;background-size:16px 16px}.carbon{background:linear-gradient(27deg,#151515 5px,transparent 5px) 0 5px,linear-gradient(207deg,#151515 5px,transparent 5px) 10px 0,linear-gradient(27deg,#222 5px,transparent 5px) 0 10px,linear-gradient(207deg,#222 5px,transparent 5px) 10px 5px,linear-gradient(90deg,#1b1b1b 10px,transparent 10px),linear-gradient(#1d1d1d 25%,#1a1a1a 25%,#1a1a1a 50%,transparent 50%,transparent 75%,#242424 75%,#242424);background-color:#131313;background-size:20px 20px}.seigaiha{background-color:silver;background-image:radial-gradient(circle at 100% 150%,silver 24%,#fff 25%,#fff 28%,silver 29%,silver 36%,#fff 36%,#fff 40%,transparent 40%,transparent),radial-gradient(circle at 0 150%,silver 24%,#fff 25%,#fff 28%,silver 29%,silver 36%,#fff 36%,#fff 40%,transparent 40%,transparent),radial-gradient(circle at 50% 100%,#fff 10%,silver 11%,silver 23%,#fff 24%,#fff 30%,silver 31%,silver 43%,#fff 44%,#fff 50%,silver 51%,silver 63%,#fff 64%,#fff 71%,transparent 71%,transparent),radial-gradient(circle at 100% 50%,#fff 5%,silver 6%,silver 15%,#fff 16%,#fff 20%,silver 21%,silver 30%,#fff 31%,#fff 35%,silver 36%,silver 45%,#fff 46%,#fff 49%,transparent 50%,transparent),radial-gradient(circle at 0 50%,#fff 5%,silver 6%,silver 15%,#fff 16%,#fff 20%,silver 21%,silver 30%,#fff 31%,#fff 35%,silver 36%,silver 45%,#fff 46%,#fff 49%,transparent 50%,transparent);background-size:100px 50px}.cubes{background-color:#556;background-image:linear-gradient(30deg,#445 12%,transparent 12.5%,transparent 87%,#445 87.5%,#445),linear-gradient(150deg,#445 12%,transparent 12.5%,transparent 87%,#445 87.5%,#445),linear-gradient(30deg,#445 12%,transparent 12.5%,transparent 87%,#445 87.5%,#445),linear-gradient(150deg,#445 12%,transparent 12.5%,transparent 87%,#445 87.5%,#445),linear-gradient(60deg,#99a 25%,transparent 25.5%,transparent 75%,#99a 75%,#99a),linear-gradient(60deg,#99a 25%,transparent 25.5%,transparent 75%,#99a 75%,#99a);background-size:80px 140px;background-position:0 0,0 0,40px 70px,40px 70px,0 0,40px 70px}.paper{background-color:#fff;background-image:linear-gradient(90deg,transparent 79px,#abced4 79px,#abced4 81px,transparent 81px),linear-gradient(#eee .1em,transparent .1em);background-size:100% 1.2em}.honeycomb{background:radial-gradient(circle farthest-side at 0% 50%,#fb1 23.5%,rgba(240,166,17,0) 0) 21px 30px,radial-gradient(circle farthest-side at 0% 50%,#b71 24%,rgba(240,166,17,0) 0) 19px 30px,linear-gradient(#fb1 14%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 85%,#fb1 0) 0 0,linear-gradient(150deg,#fb1 24%,#b71 0,#b71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#b71 0,#b71 76%,#fb1 0) 0 0,linear-gradient(30deg,#fb1 24%,#b71 0,#b71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#b71 0,#b71 76%,#fb1 0) 0 0,linear-gradient(90deg,#b71 2%,#fb1 0,#fb1 98%,#b71 0%) 0 0 #fb1;background-size:40px 60px}.wave{background:linear-gradient(#fff 50%,rgba(255,255,255,0) 0) 0 0,radial-gradient(circle closest-side,#fff 53%,rgba(255,255,255,0) 0) 0 0,radial-gradient(circle closest-side,#fff 50%,rgba(255,255,255,0) 0) 55px 0 #48b;background-size:110px 200px;background-repeat:repeat-x}.blueprint{background-color:#269;background-image:linear-gradient(#fff 2px,transparent 2px),linear-gradient(90deg,#fff 2px,transparent 2px),linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px);background-size:100px 100px,100px 100px,20px 20px,20px 20px;background-position:-2px -2px,-2px -2px,-1px -1px,-1px -1px}.shippo{background-color:#def;background-image:radial-gradient(closest-side,transparent 98%,rgba(0,0,0,.3) 99%),radial-gradient(closest-side,transparent 98%,rgba(0,0,0,.3) 99%);background-size:80px 80px;background-position:0 0,40px 40px}.blackthread{background-image:url(images/patterns/black-thread-light.png)}.brickwalldark{background-image:url(images/patterns/brick-wall-dark.png)}.brickwall{background-image:url(images/patterns/brick-wall.png)}.diagmonds{background-image:url(images/patterns/diagmonds-light.png)}.diamondupholstery{background-image:url(images/patterns/diamond-upholstery.png)}.gplay{background-image:url(images/patterns/gplay.png)}.gravel{background-image:url(images/patterns/gravel.png)}.oldmath{background-image:url(images/patterns/old-mathematics.png)}.purtywood{background-image:url(images/patterns/purty-wood.png)}.bullseyes{background-image:url(images/patterns/strange-bullseyes.png)}.escheresque{background-image:url(images/patterns/escheresque.png)}.straws{background-image:url(images/patterns/straws.png)}.littleboxes{background-image:url(images/patterns/littleboxes.png)}.woodtilecolor{background-image:url(images/patterns/tileable-wood-colored.png)}.woodtile{background-image:url(images/patterns/tileable-wood.png)}.treebark{background-image:url(images/patterns/tree-bark.png)}.washi{background-image:url(images/patterns/washi.png)}.wood-pattern{background-image:url(images/patterns/wood-pattern.png)}.xv{background-image:url(images/patterns/xv.png)}section>img{position:absolute;margin:auto;display:-ms-flexbox;display:flex}.fullscreen{position:absolute;top:0;left:0}.fill,.fullscreen{width:100%;height:100%}.fillh{height:100%;left:-50%;right:-50%;position:absolute;margin:auto}.fillw,.fillwb{width:100%;height:auto}.fillwb{bottom:0}section x-gif{position:absolute;top:0;left:0}.box{position:relative;text-align:center;margin:auto;max-width:100%;border-radius:10px;padding:25px;background-color:rgba(0,0,0,.6)}.box ol,.box ul{margin:12px 20px;padding:0}.box li::before{left:.5em}.box.wait-for-gif{opacity:0}.box.bottom{bottom:5%;margin-bottom:0}.box.top{top:5%;margin-top:0}.box.left{left:5%;margin-left:0}.box.right{right:5%;margin-right:0}.box.transparent pre,span.animate{display:inline-block}.credit{position:absolute;bottom:10px;right:10px}a{color:#9cf;text-decoration:none}a.back:after,a.back:before,a:after{content:'  ➭';font-size:24px;line-height:24px;vertical-align:middle}a.back:after,a.back:before{content:'⬅  '}a.back:after{content:''}.me,.person{height:72px;width:72px;background-repeat:no-repeat;background-size:72px;background-position:50% 50%;border-radius:50%;box-shadow:0 0 0 2px #000,0 0 0 4px #9cf;margin:0 16px}.me.center,.person.center{margin:15px auto}.me{background-image:url(images/me.jpg)}.em{font-weight:300}.em,.em-blue,.em-bold,.em-green,.em-orange,.em-red,.em-yellow{padding:5px 10px;margin:5px 2px;border:1px solid transparent;border-radius:4px;text-shadow:none;display:inline-block;line-height:1.2em;font-family:monospace;font-style:normal}.em-blue,.em-green,.em-orange,.em-red,.em-yellow{font-weight:300}.em-bold{font-weight:700}.em-green{color:#468847;background-color:#dff0d8;border-color:#d6e9c6}.em-yellow{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.em-blue{color:#3a87ad;background-color:#d9edf7;border-color:#bce8f1}.em-orange{color:#f85;background-color:#fcf8e3;border-color:#fbeed5}.em-red{color:#b94a48;background-color:#f2dede;border-color:#eed3d7}.mid{font-size:28px;font-style:italic;display:-ms-flexbox;display:flex;width:100%;margin:10px auto;-ms-flex-align:center;align-items:center}.mid::after,.mid::before{content:'';-ms-flex-positive:1;flex-grow:1;display:block;border-top:dotted 1px rgba(255,255,255,.3)}.mid::before{margin-right:16px}.mid::after{margin-left:16px}.mid.big{font-size:74px}.hide{display:none}.blur1{filter:blur(1px)}.blur2{filter:blur(2px)}.blur3,.blur4{filter:blur(3px)}.opac20{opacity:.2}.opac50{opacity:.5}.opac80{opacity:.8}.transparent{background-color:rgba(0,0,0,0)}.white{background-color:#fff}.white.box{color:#333;text-shadow:none}.red{background-color:#b94a48}.black{background-color:#000}.grey{background-color:#cfcfcf}.grey.box{color:#333}.blue{background-color:#004e8a}.midnight{background-color:#001f3f}.jellybean{background-color:#288895}.cocoa{background-color:#472f00}.nope{text-decoration:line-through;opacity:.7}p.code{margin:0;font-family:prestige elite std,consolas,courier new,monospace}strike code[class*=language-]{text-shadow:0 1px #00f}.rotate,.spin{display:inline-block;transform:none}.rotate.on,.spin.on{transition-delay:.5s;transition-duration:1s;transform:rotate(15deg)}.spin.on{transition-delay:1.5s;transform:rotate(360deg)}.animate.delay1{animation-delay:1s}.animate.delay2{animation-delay:2s}.animate.delay3{animation-delay:3s}.animate.delay4{animation-delay:4s}.animate.delay5{animation-delay:5s}.animate.delay6{animation-delay:6s}.animate.delay7{animation-delay:7s}.animate.delay8{animation-delay:8s}.cursor:after{content:\"_\";opacity:0;animation:cursor 1s infinite}@keyframes cursor{0%,40%,to{opacity:0}50%,90%{opacity:1}}";
  insertCss(css, { prepend: true });

  return function(deck) {
    classes()(deck);
    activeAnimations(deck);
    xgif(deck);
  };
};

window.addEventListener('resize', function() {
  [].forEach.call(document.querySelectorAll('x-gif'), function(elem) {
    elem.relayout();
  });
});

// main slide-deck needs to do
// bower install --save x-gif
// and make sure bower_components/x-gif/dist
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
  //document.write('<script src="x-gif/platform.js"><\/script>');
  // using newer webcomponents library
  var tag = document.createElement('script');
  tag.src = "https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.22/webcomponents.min.js";
  document.head.appendChild(tag);
  var bs = document.getElementById('browsersupport');
  if(bs){
    bs.className = bs.className.replace('hide','')
  }
}

var brightness = 0;
document.addEventListener('keyup', function(e) {
  var setBrightness = function() {
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
  console.log(e.keyCode);
  if (e.keyCode == 82) { // r
    var anims = document.querySelectorAll('.rotate, .spin');
    for(i=0;i<anims.length;i++){
      anims[i].classList.toggle('on');
    }
  }
});

// un-animate when we finish, so we can animate again when we toggle back and forth onto this slide
var animations = document.querySelectorAll('.animate');
var onAnimComplete = function(e){
  e.target.classList.remove('animated');
};
Array.prototype.forEach.call(animations, function(el, i){
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
fontLink.href = "http://fonts.googleapis.com/css?family=Courgette|Droid+Sans";
document.head.appendChild(fontLink);

},{"bespoke-classes":2,"insert-css":3}],2:[function(require,module,exports){
module.exports = function() {
  return function(deck) {
    var addClass = function(el, cls) {
        el.classList.add('bespoke-' + cls);
      },

      removeClass = function(el, cls) {
        el.className = el.className
          .replace(new RegExp('bespoke-' + cls +'(\\s|$)', 'g'), ' ')
          .trim();
      },

      deactivate = function(el, index) {
        var activeSlide = deck.slides[deck.slide()],
          offset = index - deck.slide(),
          offsetClass = offset > 0 ? 'after' : 'before';

        ['before(-\\d+)?', 'after(-\\d+)?', 'active', 'inactive'].map(removeClass.bind(null, el));

        if (el !== activeSlide) {
          ['inactive', offsetClass, offsetClass + '-' + Math.abs(offset)].map(addClass.bind(null, el));
        }
      };

    addClass(deck.parent, 'parent');
    deck.slides.map(function(el) { addClass(el, 'slide'); });

    deck.on('activate', function(e) {
      deck.slides.map(deactivate);
      addClass(e.slide, 'active');
      removeClass(e.slide, 'inactive');
    });
  };
};

},{}],3:[function(require,module,exports){
var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

module.exports = function (css, options) {
    options = options || {};

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

},{}]},{},[1])(1)
});