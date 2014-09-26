;(function(undefined) {
    'use strict';

    var swipeArea = function( selector ) {
		this.s = selector; // adjust stuff here for other selectors etc.

	};

	swipeArea.prototype.swipe = function( options ){
		//merge function
		var params = {
            swipe: function(){},
			swipe_r: function(){},
			swipe_l: function(){},
			swipe_u: function(){},
			swipe_d: function(){},
			tap: function(){},
			doubletap: function(){}, //how to do?
			longtap: function(){},
			times: [150, 75], //longtouch, doubletap
			threshold: 200,
            refresh: 15, //refresh rate in ms
            ratio: 1 // is this even working?
        };
		
		console.log( this.s );
		
		
		this.s.addEventListener('mousedown', swipe_start)
		this.s.addEventListener('mouseup', swipe_end);

		
		function swipe_start(){
			console.log("hey");
		//remove listener?
		
		}
		
		function swipe_move(){
		
		}
		
		function swipe_end(){
		
			console.log("bai");
		//remove listener?
		
		}
		
		
	}
	
	

	
	// Attach to window
    if (this.swipeAea)
        throw 'noob';

    this.swipeArea = swipeArea;
	
}).call(this);