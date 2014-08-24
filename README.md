# Simple-Swipe
Lightweight jQuery plugin for multidevice touch support.

## Features
 - user definable refresh rate 
  - allows large functions to run without bogging the system

## Usage

```javascript
   $().swipe(
      function(direction, action, time, dx, dy, xinit, yinit){
      }
      ,{threshold: 200, refresh: 15}
   );
```  
 - ```threshold```: minimum distance from start point to return a swipe
 - ```refresh```: how often ```function``` is run (in ms)

## Todo
 - add JavaScript only version
