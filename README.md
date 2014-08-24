# Simple-Swipe
Lightweight jQuery plugin for multidevice touch support.

## Features
 - user definable refresh rate 
  - allows large functions to run without bogging the system

## Usage

```JavaScript
$().swipe(function, options);
```  
 - `function` is a function with the following format
  - `function(direction, action, time, dx, dy, xinit, yinit){}`
 - `options` is an object with the following properties and default values
  - `{threshold: 200, refresh: 15}`
    - `threshold`: minimum distance (in px) from start point to return a swipe
    - `refresh`: how often `function` is run (in ms)


## Todo
 - add JavaScript only version
