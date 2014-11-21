/**
var myswipeArea = new swipeArea( selector )
myswipeArea.swipe( options )

param.swipe( direction, action, touches, delta, time, zoom, rotation );
 -direction: right, left, up, down
 -action: start, end, move, cancel
 -touches: {id: ## , x: ## , y: ## }
 -delta: {id: ##, x: ##, y: ## }
 -time: {id: ##, time: ## }
 -ended: {id: ##, time: ##, x: ##, y: ##, direction: ##, }
 -zoom: zoom between 1 and 2
 -zoom: rotation between 1 and 2

Mouse actions are ignored for now
 -mouse and touch cannot occur at same time since mouse becomes first touch
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
    Variable setup
    */
    var elements = this.elements;
    var direction = [], action = [], touch = [], delta = [], time =[];
    var ids = [], touch_init = [], time_init = [];
    
    
    function merge(a, b) {
      var m = {};
      for (var attrname in a) m[attrname] = a[attrname];
      for (attrname in b) m[attrname] = b[attrname];
      return m;
    }
    
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
    
    function getms(){
      return new Date().getTime();
    }
    
    addListener('mousedown touchstart', swipe_start);
    addListener('mouseup touchend', swipe_end);
    window.addEventListener('mouseup', swipe_exit); 
    window.addEventListener('touchend', swipe_exit); 
    
    function swipe_start(e){
      console.log("swipe start");
      
      if( e.type == 'mousedown' ){
        var x = e.clientX;
        var y = e.clientY;
        var id = -1;
        
      } else if ( e.type == 'touchstart' ){
        var ct = e.changedTouches;
        var x = ct[0].clientX;
        var y = ct[0].clientY;
        var id = ct[0].identifier;
      }
      
      ids.push( id );
      console.log(ids);
      touch_init.push({
        id: id,
        x: x, 
        y: y,
        time: getms()
      });
      var i;
      for(i=0;i<ids.length;i++){
        console.log(touch_init[i], ids[i]);
      }
      
      addListener('mousemove touchmove', swipe_move);
    }
    
    function swipe_move(e){
      console.log("swipe_move");
      if( e.type == 'mousemove' ){
        
      } else if ( e.type == 'touchmove' ){
        var tt = e.targetTouches;
        for(var i=0; i<tt.length; i++){
          touch[i] = {
            id: tt[i].identifier,
            x: tt[i].clientX, 
            y: tt[i].clientY
          }
        
          delta[i] = {
            id: tt[i].identifier,
            x: touch[i].x - touch_init[i].x,
            y: touch[i].y - touch_init[i].y
          }
        }
        
      }
    }
    
    function swipe_end(){
      console.log("swipe_end");
      
      //remove once all swipes end
      removeListener('mousemove touchmove', swipe_move);
    }
    
    function swipe_exit(e){
      console.log("swipe_exit");
      
      if( e.type == 'mouseup' ){
        var id = -1;
        
      } else if ( e.type == 'touchend' ){
        var ct = e.changedTouches;

        var id = ct[0].identifier;
      }
      var index = ids.indexOf( id );
      ids.splice(index, 1);
      touch_init.splice(index, 1);
      
      /**var i;
      console.log(ids);
      for(i=0;i<ids.length;i++){
        console.log(touch_init[i], ids[i]);
      }*/
      
      
      
    }
    
  }
  if (this.swipeAea)
    throw 'noob';
  this.swipeArea = swipeArea;

}).call(this);
