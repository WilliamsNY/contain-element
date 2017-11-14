# Contain Element

A JavaScript plugin to contain an element within its parent element.

## Description

The plugin scales an element to the minimum size required for it to be completely contained within its parent, and retains its original aspect ratio by cropping portions that don't fit based on its vertical and horizontal alignment (by default both are set to: `center`).

[Demo](http://williamsny.github.io/contain-element)

## Features

* Pure JavaScript with no dependencies
* Configures the horizontal and vertical alignment of the contained element
* Can detect the native size or have it specified at runtime
* Importable javascript module version included as `contain-element-module.js`

## Usage

```javascript
window.onload = function() {
    var contain = new ContainElement({
        element: document.getElementById("element"), // the element to be contained (alternative to 'id')
        id: "element", // the id of the element to be contained (alternative to 'element')
        width: 100, // (optional) native element width in pixels (unset: detected element width)
        height: 100, // (optional) native element height in pixels (unset: detected element height)
        valign: "top", // (optional) vertical alignment: center|top|bottom (unset: center)
        halign: "left", // (optional) horizontal alignment: center|left|right (unset: center)
        fit: "contain", // (optional) object fit: cover|contain (unset: cover)
        scale: true // (optional) use transform scale instead of width and height (unset: false)
    });

    // (example) update the size and positioning on window resize
    window.onresize = contain.update;

    // (example) update the size and positioning on orientation change
    window.addEventListener("orientationchange", contain.update);
};
```

## Functions

* `update()`: Update the size and position of the contained element.
* `setWidth(width)`: Set the width (run `update()` to apply).
* `setHeight(height)`: Set the height (run `update()` to apply).
* `setValign(valign)`: Set the vertical alignment (run `update()` to apply).
* `setHalign(halign)`: Set the horizontal alignment (run `update()` to apply).
* `setFit(fit)`: Set the object fit (run `update()` to apply).
* `getWidth()`: Return the element width.
* `getHeight()`: Return the element height.
* `getCurrentWidth()`: Return the current width.
* `getCurrentHeight()`: Return the current height.
* `getValign()`: Return the current vertical alignment.
* `getHalign()`: Return the current horizontal alignment.
* `getFit()`: Return the current object fit.
* `getScale()`: Return the current scale factor being applied to the contained element.

## Credits

Written by [Williams New York](http://williamsnewyork.com)

### Authors

* [Kevin MacMartin](https://github.com/prurigro/)
* [Luke Evers](https://github.com/lukevers/)

## LICENSE

Licensed under the [MIT license](http://opensource.org/licenses/MIT).
