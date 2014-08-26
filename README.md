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
$( selector ).swipe(function, options);
```  
 - `function` is a function with the following format:
  - `function(direction, action, time, dx, dy, xinit, yinit){}`
    - `direction` will return `"left"`, `"right"`, `"up"`, `"down"` or `"cancel"`
    - `action` will return `start`, `move` or `end`
    - `time` will return the time of the swipe in ms
    - `dx` and `dy` will return the change in x or y from the initial position
    - `xinit` and `yinit` are the coordinates of the initial position

 - `options` is an object with the following properties and default values:
  - `{threshold: 200, refresh: 15, ratio: 1}`
    - `threshold`: minimum distance (in px) from start point to return a swipe
    - `refresh`: how often `function` is run (in ms)
    - `ratio`: ratio of x to y seperating vertical swipes from horizontal


## Todo
 - improve documentation
 - add JavaScript only version
 - add support for previous versions of jQuery
