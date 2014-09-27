;(function(undefined) {
  'use strict';

  var swipeArea = function( selector ) {
    var t = selector.slice(0,1);
    switch (t){
      case "#": {
        this.elements = [document.getElementById( selector.slice(1) )];
        break;}
      case ".": {
        this.elements = document.getElementsByClassName( selector.slice(1) );
        break;}
      default: this.elements = document.getElementsByTagName( selector ); 
    }
  }

  swipeArea.prototype.swipe = function( options ){
    //some values and stuff
    //there is probably a better way to do this?
    var elements = this.elements;
    var s = this.s;
    var type = this.type;
    var x_init;
    var y_init;
    var tinit; 
    var dt;
    var tfin;
    var dx;
    var dy;
    var distance;
    var direction;
    var action;
    var interval;
    var touch_init = [];
    var touches = [];
    var touchcount = 0;

    //merge function
    var defaults = {
      swipe: function(){},
      swipe_r: function(){},
      swipe_l: function(){},
      swipe_u: function(){},
      swipe_d: function(){},
      tap: function(){},
      doubletap: function(){}, //not implemented
      longtap: function(){},
      times: [150, 75], //longtouch, doubletap
      threshold: 200,
      refresh: 100, //refresh rate in ms
      ratio: 1 
    };
    
    
    function merge(a, b) {
      var m = {};
      for (var attrname in a) m[attrname] = a[attrname];
      for (attrname in b) m[attrname] = b[attrname];
      return m;
    }
    
    var param = merge(defaults, options);
    
    function addListener(e, f, i, j){//why do i have to put i, j here???
      var evts = e.split(" ");
      for(i=0;i<evts.length;i++){
        for(j=0;j<elements.length;j++){
          elements[j].addEventListener(evts[i], f);
        }
      }
    }
    
    function removeListener(e, f, i, j){
      var evts = e.split(" ");
      for(i=0;i<evts.length;i++){
        for(j=0;j<elements.length;j++){
          elements[j].removeEventListener(evts[i], f);
        }
      }
    }
    
    addListener('mousedown touchstart', swipe_start);
     //addListener('touchstart', swipe_start);

    window.addEventListener('mouseup', swipe_end);
    window.addEventListener('touchend', swipe_end);

    
    function swipe_start(e, i){
      action = e.type;

      if( action == 'mousedown' ){
        touch_init[0] = {x: e.clientX, y: e.clientY};
      } else if (action == 'touchstart') {
          var tt = e.targetTouches;
          for(i=0; i<tt.length; i++){
            touch_init[i] = {x: tt[i].clientX, 
                             y: tt[i].clientY}
          }
        }
      x_init = touch_init[0].x;
      y_init = touch_init[0].x;
     // console.log(touch_init);
      tinit = getms();
      action = "start";

      addListener('mousemove touchmove', swipe_move);
      document.addEventListener('mousedown', escape);
      document.addEventListener('touchstart', escape);

      escape();
      interval = setInterval(function() {
        dt = getms() - tinit;
        direction = dir(dx, dy);
        param.swipe(direction, action, dt, dx, dy, x_init, y_init);
      }, param.refresh);
    }
    
    function swipe_move(e, i){
      action = e.type;
      touches = [];
      if (x_init !== 0) {
        if (action == 'mousemove') {
          touches[0] = {x: e.clientX, y: e.clientY};
        } else if (action == 'touchmove') {
          var tt = e.targetTouches;//console.log(tt);
          for(i=0; i<tt.length; i++){
            touches[i] = {x: tt[i].clientX, 
                          y: tt[i].clientY}
          } 
          }
        
        touchcount = touches.length;  
        //console.log(touches[0], touch_init[0]);
        dx = touches[0].x - touch_init[0].x;
        dy = touches[0].x - touch_init[0].y;
        console.log(dx)
      }
      action = "move";
      
    }
    
    function swipe_end(e){
      action = e.type;
      if(  touchcount>1 ){ 
        console.log(" keep goin");
      }
      else{
        switch( direction ){
            case "right": param.swipe_r(); break;
            case "left": param.swipe_l(); break;
            case "up": param.swipe_u(); break;
            case "down": param.swipe_d(); break;
          }
          if (direction == "cancel"){
            if ( tinit - tfin < param.times[1]){
              console.log("doubletap");
              param.doubletap();
            } else if ( dt > param.times[0]) {
              console.log("longtap");
              param.longtap();
            } else  { //avoid tap on first click of doubletap?
              console.log("tap");
              param.tap();
            }
          }
          
          tfin = getms();
          x_init = y_init = 0;
          dx = dy = 0;
          touches = [];
          touchcount = 0;
          action = "end";
      
          param.swipe(direction, action, dt, dx, dy, x_init, y_init);

          removeListener('mousemove touchmove', swipe_move);
          addListener('mousedown touchstart', swipe_start);
          document.removeEventListener('mousedown', escape);
          document.removeEventListener('touchstart', escape);

          escape();
        }
    }
    
    function escape() {
      document.removeEventListener('mousedown', escape);
      document.removeEventListener('touchstart', escape);
      clearInterval(interval);
    }

    function getms() {
      return new Date().getTime();
    }

    function dir(dx, dy) {
      distance = dx * dx + dy * dy;
      //theta = Math.atan2(dy, dx);
      var xy = Math.abs(dx / dy);

      if (distance > param.threshold * param.threshold) {
        if (xy > param.ratio) {
          if (dx < 0) return "left";
          else return "right";
        } else {
          if (dy > 0) return "down";
          else return "up";
        }
      } else return "cancel";
    }
  }


  if (this.swipeAea)
    throw 'noob';
  this.swipeArea = swipeArea;
  
}).call(this);
