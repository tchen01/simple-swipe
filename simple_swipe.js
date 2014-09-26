;(function(undefined) {
    'use strict';

    var swipeArea = function( selector ) {
		this.s = selector; // adjust stuff here for other selectors etc.

	};

	swipeArea.prototype.swipe = function( options ){
		//some values and stuff
        //there is probably a better way to do this?
        var element = this.s;
		var xinit;
		var yinit;
        var tinit; 
		var dt;
		var	tfin;
        var dx;
		var dy;
        var distance;
        var direction;
		var action;
		var interval;
		
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
		
		element.addEventListener('mousedown', swipe_start);
		//this sometimes doesn't go?
		window.addEventListener('mouseup', swipe_end);

		
		function swipe_start(e){
			action = e.type;

            if (action == 'mousedown') {
                xinit = e.clientX;
                yinit = e.clientY;
            } else if (action == 'touchstart') {
                xinit = e.originalEvent.targetTouches[0].clientX;
                yinit = e.originalEvent.targetTouches[0].clientY;
                el = document.elementFromPoint(xinit, yinit);
            }
            tinit = getms();

            action = "start";

			//$(this).on('mousemove touchmove', move);
			element.addEventListener('mousemove', swipe_move);

            //$(document).one('keydown', escape);
			document.addEventListener('mousedown', escape);

            escape();
			interval = setInterval(function() {
                dt = getms() - tinit;
				direction = dir(dx, dy);
                param.swipe(direction, action, dt, dx, dy, xinit, yinit);
            }, param.refresh);
		
		}
		
		function swipe_move(e){
			action = e.type;

            if (xinit !== 0) {

                if (action == 'mousemove') {
                    dx = e.clientX - xinit;
                    dy = e.clientY - yinit;
                } else if (action == 'touchmove') {
                    dx = e.originalEvent.targetTouches[0].clientX - xinit;
                    dy = e.originalEvent.targetTouches[0].clientY - yinit;
                }
            }

            action = "move";
			
		}
		
		function swipe_end(e){
	
			action = e.type;
				
			
			//trade ease of use for size of program?
			if (direction == "right") param.swipe_r();
			else if (direction == "left") param.swipe_l();
			else if (direction == "up") param.swipe_u();
			else if (direction == "down") param.swipe_d();
			
			if (direction == "cancel"){//best way to check no move??
				if ( tinit - tfin < param.times[1]){
					console.log("doubletap");
					param.doubletap();
				}
				
				// longtap
				else if ( dt > param.times[0]) {
					console.log("longtap");
					param.longtap();
				}
			
				else  { //avoid tap on first click of doubletap?
					console.log("tap");
					param.tap();
				}
				
				
			}
			
			
			tfin = getms();
            xinit = yinit = 0;
            dx = dy = 0;
	
            //this prevents mousemove from always happening
            element.removeEventListener('mousemove', swipe_move);

            action = "end";
            

            param.swipe(direction, action, dt, dx, dy, xinit, yinit);
            //$(this).one('mousedown touchstart', touchstart);
			element.addEventListener('mousedown', swipe_start);

			document.removeEventListener('mousedown', escape);
			escape();
		}
		
		function escape() {
			document.removeEventListener('mousedown', escape);
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
	
	

	
	// Attach to window
    if (this.swipeAea)
        throw 'noob';
    this.swipeArea = swipeArea;
	
}).call(this);
