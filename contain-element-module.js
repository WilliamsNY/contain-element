function ContainElement(options) {
    var scaleFactor = 1,
        element = options.element || document.getElementById(options.id),
        elementWidth = options.width || element.offsetWidth,
        elementHeight = options.height || element.offsetHeight,
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

    function updateContain() {
        var parentWidth = element.parentElement.offsetWidth,
            parentHeight = element.parentElement.offsetHeight;

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

            // Anchor the element horizontally to the left/center/right
            if (parentWidth !== elementWidth * scaleFactor) {
                switch (halign) {
                    case "left":
                        // Anchor horizontally to the left of the parent element
                        element.style.left = "0px";
                        break;

                    case "right":
                        // Anchor horizontally to the right of the parent element
                        element.style.left = 0 - (elementWidth * scaleFactor - parentWidth) + "px";
                        break;

                    default:
                        // Anchor horizontally to the center of the parent element
                        element.style.left = 0 - (elementWidth * scaleFactor - parentWidth) / 2 + "px";
                }
            } else {
                element.style.left = "0px";
            }

            // Anchor the element vertically to the top/center/bottom
            if (parentHeight !== elementHeight * scaleFactor) {
                switch (valign) {
                    case "top":
                        // Anchor vertically to the top of the parent element
                        element.style.top = "0px";
                        break;

                    case "bottom":
                        // Anchor veritcally to the bottom of the parent element
                        element.style.top = 0 - (elementHeight * scaleFactor - parentHeight) + "px";
                        break;

                    default:
                        // Anchor vertically to the center of the parent element
                        element.style.top = 0 - (elementHeight * scaleFactor - parentHeight) / 2 + "px";
                }
            } else {
                element.style.top = "0px";
            }
        } else {
            // Try again in 30ms if the document didn't load enough to determine the parent element's width and height yet
            window.setTimeout(updateContain, 30);
        }
    }

    // Run the function to scale and anchor the element
    updateContain();

    // External scale and anchor update function
    this.update = updateContain;

    // External function to set elementWidth
    this.setWidth = function(newWidth) { elementWidth = newWidth; };

    // External function to set elementHeight
    this.setHeight = function(newHeight) { elementHeight = newHeight; };

    // External function to set valign
    this.setValign = function(newValign) { valign = newValign; };

    // External function to set halign
    this.setHalign = function(newHalign) { halign = newHalign; };

    // External function to set fit
    this.setFit = function(newFit) { fit = newFit; };

    // External function to return the elementWidth
    this.getWidth = function() { return elementWidth; };

    // External function to return the elementHeight
    this.getHeight = function() { return elementHeight; };

    // External function to return the current width
    this.getCurrentWidth = function() { return scaleFactor * elementWidth; };

    // External function to return the current height
    this.getCurrentHeight = function() { return scaleFactor * elementHeight; };

    // External function to return the current valign
    this.getValign = function() { return valign; };

    // External function to return the current halign
    this.getHalign = function() { return halign; };

    // External function to return the current fit
    this.getFit = function() { return fit; };

    // External function to return the current scale factor
    this.getScale = function() { return scaleFactor; };
}

export default ContainElement;
