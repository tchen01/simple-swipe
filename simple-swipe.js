;(function(undefined) {
    'use strict';

    var swipeArea = function( selector ) {
        if( typeof selector === "string"){
            var t = selector.slice(0,1);
            switch (t){
                case "#": {
                    this.type = 1 // id 
                    this.elements = [document.getElementById( selector.slice(1) )];
                    break;}
                case ".": {
                    this.type = 2 // css class
                    this.elements = document.getElementsByClassName( selector.slice(1) );
                    break;}
                default: this.elements = document.getElementsByTagName( selector ); 
            }
        }
        
    }

    swipeArea.prototype.swipe = function( options ){
        //some values and stuff
        //there is probably a better way to do this?
        var elements = this.elements;
        var s = this.s;
        var type = this.type;
        var xinit;
        var yinit;
        var tinit; 
        var dt;
        var tfin;
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

        
        function swipe_start(e){
            action = e.type;

            if (action == 'mousedown') {
                xinit = e.clientX;
                yinit = e.clientY;
            } else if (action == 'touchstart') {
                xinit = e.targetTouches[0].clientX;
                yinit = e.targetTouches[0].clientY;
            }
            tinit = getms();

            action = "start";

            addListener('mousemove touchmove', swipe_move);
            //addListener('touchmove', swipe_move);

            document.addEventListener('mousedown', escape);
            document.addEventListener('touchstart', escape);

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
                    dx = e.targetTouches[0].clientX - xinit;
                    dy = e.targetTouches[0].clientY - yinit;
                    
                }
            }
            console.log(dx);
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
            removeListener('mousemove touchmove', swipe_move);
            //removeListener('touchmove', swipe_move);

            action = "end";
            param.swipe(direction, action, dt, dx, dy, xinit, yinit);

            addListener('mousedown touchstart', swipe_start);
            //addListener('touchstart', swipe_start);

            document.removeEventListener('mousedown', escape);
            document.removeEventListener('touchstart', escape);

            escape();
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
