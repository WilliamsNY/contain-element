# Contain Element

A JavaScript plugin to contain an element within its parent element.

## Description

The plugin scales an element to the minimum size required for it to be completely contained within its parent, and retains its original aspect ratio by cropping portions that don't fit based on its vertical and horizontal alignment (by default both are set to: `middle`).

## Features

* Pure JavaScript with no dependencies
* Configures the horizontal and vertical alignment of the contained element
* Can detect the native size or have it specified at runtime
* Includes function to update the size and position

## Usage

```javascript
window.onload = function() {
    var contain = new ContainElement({
        id: 'element', // the id of the element to be contained
        width: '100', // (optional) element width in pixels (unset: element width)
        height: '100', // (optional) element height in pixels (unset: element height)
        valign: 'top', // (optional) vertical alignment: top|bottom (unset: middle)
        halign: 'left' // (optional) horizontal alignment: left|right (unset: middle)
    });

    // (example) update the size and positioning on window resize
    window.onresize = contain.update;

    // (example) update the size and positioning on orientation change
    screen.addEventListener('orientationchange', contain.update);
};
```

## Credits

Written by [Williams New York](http://williamsnewyork.com)

### Authors

* [Kevin MacMartin](https://github.com/prurigro/)
* [Luke Evers](https://github.com/lukevers/)

## LICENSE

Licensed under the [MIT license](http://opensource.org/licenses/MIT).

