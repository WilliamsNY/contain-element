module.exports = function(options) {
    var scaleFactor = 1,
        element = options.element || document.getElementById(options.id),
        elementWidth = Number(options.width) || element.offsetWidth,
        elementHeight = Number(options.height) || element.offsetHeight,
        valign = options.valign || "center",
        halign = options.halign || "center",
        fit = options.fit || "cover",
        scale = options.scale;

    // Apply required attributes to the element
    element.style.position = "absolute";
    element.parentElement.style.overflow = "hidden";

    // Apply required transform-origin if the scale option is set to true
    if (scale) {
        element.style.transformOrigin = "left top";
    }

    // Apply relative position to the parent if it doesn't already have relative, absolute or fixed positioning
    if ([ "relative", "absolute", "fixed" ].indexOf(window.getComputedStyle(element.parentElement, null).getPropertyValue("position")) === -1) {
        element.parentElement.style.position = "relative";
    }

    function parseAlignment() {
        // Convert halign to decimal percent
        switch (halign) {
            case "left":
                halign = 0;
                break;

            case "center":
                halign = 0.5;
                break;

            case "right":
                halign = 1;
                break;

            default:
                halign = Number(halign) / 100;
        }

        // Convert valign to decimal percent
        switch (valign) {
            case "top":
                valign = 0;
                break;

            case "center":
                valign = 0.5;
                break;

            case "bottom":
                valign = 1;
                break;

            default:
                valign = Number(valign) / 100;
        }
    }

    function updateContain() {
        var parentWidth = element.parentElement.offsetWidth,
            parentHeight = element.parentElement.offsetHeight,
            rightAlignment = 0 - (elementWidth * scaleFactor - parentWidth),
            bottomAlignment = 0 - (elementHeight * scaleFactor - parentHeight);

        // Run the scale/position functionality if able to determine the parent element's width and height
        if (parentWidth && parentHeight) {
            // Calculate the scale factor
            if (fit === "cover") {
                if (parentWidth > parentHeight / elementHeight * elementWidth) {
                    scaleFactor = parentWidth / elementWidth;
                } else {
                    scaleFactor = parentHeight / elementHeight;
                }
            } else if (fit === "contain") {
                if (parentHeight > parentWidth / elementWidth * elementHeight) {
                    scaleFactor = parentWidth / elementWidth;
                } else {
                    scaleFactor = parentHeight / elementHeight;
                }
            } else {
                scaleFactor = 1;
            }

            // Scale the element using the scale factor
            if (scale) {
                element.style.transform = "scale(" + scaleFactor + ")";
            } else {
                element.style.width = elementWidth * scaleFactor + "px";
                element.style.height = elementHeight * scaleFactor + "px";
            }

            // Align the element horizontally
            if (parentWidth !== elementWidth * scaleFactor) {
                // Align horizontally by percent
                element.style.left = rightAlignment * halign + "px";
            } else {
                // Align the element against the left if the width of the parent and element are the same
                element.style.left = "0px";
            }

            // Align the element vertically
            if (parentHeight !== elementHeight * scaleFactor) {
                // Align vertically by percent
                element.style.top = bottomAlignment * valign + "px";
            } else {
                // Align the element against the top if the height of the parent and element are the same
                element.style.top = "0px";
            }
        } else {
            // Try again in 30ms if the document didn't load enough to determine the parent element's width and height yet
            setTimeout(updateContain, 30);
        }
    }

    // Parse the valign and halign options
    parseAlignment();

    // Run the function to scale and anchor the element
    updateContain();

    // External scale and anchor update function
    this.update = updateContain;

    // External function to set elementWidth
    this.setWidth = function(newWidth) {
        elementWidth = newWidth;
    };

    // External function to set elementHeight
    this.setHeight = function(newHeight) {
        elementHeight = newHeight;
    };

    // External function to set valign
    this.setValign = function(newValign) {
        valign = newValign;
        parseAlignment();
    };

    // External function to set halign
    this.setHalign = function(newHalign) {
        halign = newHalign;
        parseAlignment();
    };

    // External function to set fit
    this.setFit = function(newFit) {
        fit = newFit;
    };

    // External function to return the elementWidth
    this.getWidth = function() {
        return Number(elementWidth);
    };

    // External function to return the elementHeight
    this.getHeight = function() {
        return Number(elementHeight);
    };

    // External function to return the current width
    this.getCurrentWidth = function() {
        return scaleFactor * elementWidth;
    };

    // External function to return the current height
    this.getCurrentHeight = function() {
        return scaleFactor * elementHeight;
    };

    // External function to return the current valign
    this.getValign = function() {
        return valign;
    };

    // External function to return the current halign
    this.getHalign = function() {
        return halign;
    };

    // External function to return the current fit
    this.getFit = function() {
        return fit;
    };

    // External function to return the current scale factor
    this.getScale = function() {
        return scaleFactor;
    };
};
