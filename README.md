# Contain Element

A JavaScript plugin to contain an element within its parent element.

## Features

* Pure JavaScript with no dependencies
* Configures the horizontal and vertical alignment of the contained element
* Can detect the native size or have it specified at runtime

## Usage

```
window.onload = function() {
    containElement({
        id: 'element', // the id of the element to be contained
        width: '100', // (optional) element width in pixels (unset: element width)
        height: '100', // (optional) element height in pixels (unset: element height)
        valign: 'top', // (optional) vertical alignment: top|bottom (unset: middle)
        halign: 'left' // (optional) horizontal alignment: left|right (unset: middle)
    });
};
```

## Credits

Written by [Williams New York](http://williamsnewyork.com)

### Authors

* Kevin MacMartin

## LICENSE

Licensed under the [MIT license](http://opensource.org/licenses/MIT).

