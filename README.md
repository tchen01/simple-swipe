# Simple-Swipe
Lightweight jQuery (1.7) plugin for cross-platform touch support.

## Features
 - indicates the state of the user's action
 - returns the direction of the swipe
 - user definable refresh rate 
  - allows large functions to run without bogging the system
 - options are easily adjustable

## Usage

```JavaScript
$( selector ).swipe(options);
```  
 - `function` is a function with the following format:
 

 - `options` is an object with the following properties and default values:
  - `{      swipe: function(){},
            swipe_r: function(){},
			swipe_l: function(){},
			swipw_u: function(){},
			swipe_d: function(){},
			tap: function(){},
			doubletap: function(){},
			longtouch: function(){},
			threshold: 200,
            refresh: 15,
            ratio: 1
        }`
    - `swipe`: is a function in the following format:
        - `function(direction, action, time, dx, dy, xinit, yinit){}`
            - `direction` will return `"left"`, `"right"`, `"up"`, `"down"` or `"cancel"`
            - `action` will return `start`, `move` or `end`
            - `time` will return the time of the swipe in ms
            - `dx` and `dy` will return the change in x or y from the initial position
            - `xinit` and `yinit` are the coordinates of the initial position
        - `swipe` is run while a motion is ocurring
~~    - all directional swipes are executed when a swipe is registered in the given direction.
    - `tap`: 
    - `doubletap`:
    - `longtouch`:~~
    - `threshold`: minimum distance (in px) from start point to return a swipe
    - `refresh`: how often `swipe` is run (in ms)
    - `ratio`: ratio of x to y seperating vertical swipes from horizontal


## Todo
 - improve documentation
 - add JavaScript only version
 - add support for previous versions of jQuery
