var _ = require( 'lodash' );
var async = require( 'async' );
require( 'gsap' );

// lodash code

var a = _.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 });
var b = _.map([1, 2, 3], function(n) { return n * 3; });

document.getElementById( 'lodash-code' ).innerHTML = '<p>' + JSON.stringify( a ) + '<br/>' + JSON.stringify( b ) + '</p>';

// async code

var arr = ['1','2'];
async.map(arr, getInfo, function (e, r) {
	document.getElementById( 'async-code' ).innerHTML =  '<p>async: ' + JSON.stringify( r ) + '</p>';
});

function getInfo(name, callback) {
  setTimeout(function() {
    callback(null, name + 'new');
}, 1000);
}

// gsap - tweenmax code

var box = document.getElementById("greenBox"),
count = 0,
tween;

tween = TweenMax.to(box, 2, {left:"100%", repeat:10, yoyo:true, onRepeat:onRepeat, repeatDelay:0.5, ease:Linear.easeNone});

function onRepeat() {
    count++;
    box.innerHTML = count;
    TweenLite.set(box, {backgroundColor:"hsl(" + Math.random() * 255 + ", 90%, 60%)"});
}