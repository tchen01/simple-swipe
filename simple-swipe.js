/**
var myswipeArea = new swipeArea( selector )
myswipeArea.swipe( options )

param.swipe( direction, action, touches, delta, time, zoom, rotation );
 -direction: right, left, up, down
 -action: start, end, move, cancel
 -touches: {id: ## , x: ## , y: ## }
 -delta: {id: ##, x: ##, y: ## }
 -time: {id: ##, time: ## }
 -zoom: zoom between 1 and 2
 -zoom: rotation between 1 and 2

*/

;(function(undefined) {
  'use strict';

  var swipeArea = function( selector ) {
    this.elements = document.querySelectorAll( selector );
  }
  
  swipeArea.prototype.swipe = function( options ){
    var defaults = {
      swipe: function(){},
      swipe_r: function(){}, 
      swipe_l: function(){},
      swipe_u: function(){},
      swipe_d: function(){},
    };
    
    /**
    Variable init
    */
    
    function merge(a, b) {
      var m = {};
      for (var attrname in a) m[attrname] = a[attrname];
      for (attrname in b) m[attrname] = b[attrname];
      return m;
    }
    
    /*addListener('mousedown touchstart', swipe_start);*/
    function addListener(e, f){
      var evts = e.split(" "), i, j; //why do i have to put i, j here???
      for(i=0;i<evts.length;i++){
        for(j=0;j<elements.length;j++){
          elements[j].addEventListener(evts[i], f);
        }
      }
    }
    
    function removeListener(e, f){
      var evts = e.split(" "), i, j;
      for(i=0;i<evts.length;i++){
        for(j=0;j<elements.length;j++){
          elements[j].removeEventListener(evts[i], f);
        }
      }
    }
    
    var param = merge(defaults, options);
    
    function getms() {
      return new Date().getTime();
    }
    
    
    
    if (this.swipeAea)
      throw 'noob';
    this.swipeArea = swipeArea;
  
}).call(this);
