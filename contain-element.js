function ContainElement(options) {
	var scaleFactor = 1;
	var element = document.getElementById(options.id);
	var elementWidth = options.width || element.offsetWidth;
	var elementHeight = options.height || element.offsetHeight;

	// Apply required attributes to the element and its parents
	element.style.position = 'absolute';
	element.parentElement.style.overflow = 'hidden';
	if (['relative', 'absolute', 'fixed'].indexOf(window.getComputedStyle(element.parentElement, null).getPropertyValue('position')) === -1)
		element.parentElement.style.position = 'relative';

	function updateContain() {
		var parentWidth = element.parentElement.offsetWidth;
		var parentHeight = element.parentElement.offsetHeight;

		// Run the scale/position functionality if able to determine the document width and height
		if ((parentWidth) && (parentHeight)) {
			// Calculate the scale factor
			if (parentWidth > ((parentHeight / (elementHeight * scaleFactor)) * (elementWidth * scaleFactor)))
				scaleFactor = (parentWidth / elementWidth);
			else
				scaleFactor = (parentHeight / elementHeight);

			// Scale the element using the scale factor
			element.style.width = (elementWidth * scaleFactor) + 'px';
			element.style.height = (elementHeight * scaleFactor) + 'px';

			// Anchor the element horizontally to the left/middle/right
			if (parentWidth < (elementWidth * scaleFactor)) {
				switch(options.halign) {
					case 'left':
						// Anchor horizontally to the left of the parent element
						element.style.left = 0 + 'px';
						break;
					case 'right':
						// Anchor horizontally to the right of the parent element
						element.style.left = (0 - ((elementWidth * scaleFactor) - parentWidth)) + 'px';
						break;
					default:
						// Anchor horizontally to the center of the parent element
						element.style.left = (0 - (((elementWidth * scaleFactor) - parentWidth) / 2)) + 'px';
				}
			} else {
				element.style.left = 0 + 'px';
			}

			// Anchor the element vertically to the top/middle/bottom
			if ((elementHeight * scaleFactor) > parentHeight) {
				switch(options.valign) {
					case 'top':
						// Anchor vertically to the top of the parent element
						element.style.top = 0 + 'px';
						break;
					case 'bottom':
						// Anchor veritcally to the bottom of the parent element
						element.style.top = (0 - ((elementHeight * scaleFactor) - parentHeight)) + 'px';
						break;
					default:
						// Anchor vertically to the center of the parent element
						element.style.top = (0 - (((elementHeight * scaleFactor) - parentHeight) / 2)) + 'px';
				}
			} else {
				element.style.top = 0 + 'px';
			}
		} else {
			// Try again in 30ms if the document didn't load enough to determine its width and height yet
			window.setTimeout(updateContain, 30);
		}
	}

	// Run the scale function and bind it to various window-size-changing events
	updateContain();

	// Add scale function to the library
	this.update = updateContain;
}

