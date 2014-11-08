# Simple-Swipe
Lightweight JavaScript plugin for cross-platform touch support.

## Features
 - returns the direction of the swipe
 - user definable refresh rate 
  - allows functions to be run less frequently if desired
 - easily adjustable options
 - does not require any external libraries or plugins

## Usage

```JavaScript
var myswipeArea = new swipeArea( selector )
myswipeArea.swipe( options )
```  
 - `selector` is a string in the form `"tag"`, `"#id"` or `".class"`. This works just like a jQuery selector.
 - `options` is an object with the following properties and default values:
  - `{  swipe: function(){},
	swipe_r: function(){},
	swipe_l: function(){},
	swipw_u: function(){},
	swipe_d: function(){},
	tap: function(){},
	doubletap: function(){},
	longtap: function(){},
	times: [150, 75],
	threshold: 200,
	refresh: 15,
	ratio: 1
        }`
    - `swipe`: is a function in the following format:
        - `function(direction, action, time, delta, zoom, touches){}`
            - `direction` will return `"left"`, `"right"`, `"up"`, `"down"` or `"cancel"`
            - `action` will return `start`, `move`, `end` or `exit`
              -`exit` corresponds to a end event that occurs outside the nodes specified by `selector`
            - `time` will return the time of the swipe in ms
            - `delta` is an array of position objects that indicates the difference in initial and current positions of each touch event
              - the key of the coordinates is either `x` or `y`
            - `zoom` is an number corresponding to the percent of the initial distance between the first and second touches.
            - `touches` is an array of position objects giving the current positions of each touch event
        - `swipe` is run while a motion is occurring
    - all directional swipes are executed when a swipe is registered in the given direction.
    - `tap`: 
    - `doubletap`:
    - `longtap`: 
    - `times`: how long (in ms) before tap becomes longtap, time second tap must occur in to be counted as doubletap
    - `threshold`: minimum distance (in px) from start point to return a swipe
    - `refresh`: how often the `swipe` function is run (in ms)
    - `ratio`: ratio of x to y seperating vertical swipes from horizontal


## Todo
 - clean up code
 - improve documentation
