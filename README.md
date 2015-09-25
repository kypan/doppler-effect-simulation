#Smart Sparrow Coding Task#

###Author###

Kevin Pan

###Background###

This coding task requires me to build a simulation to help Alice, a lecturer in a cosmology course, explain the effect of the Doppler effect to her students.

###Task Requirements###

1. The star color should change based on the value of the velocity input, where:
    a. 0 = no color change
    b. -100 = blue
    c. 100 = red
2. The velocity input should accept numbers only, which are limited to the range of the slider.
3. The slider should be based on either a log or exponential scale, providing more detail in the low velocity range (blue).

###Instructions###

Simply open up **index.html** in the browser of your choice. All images and libraries are included in the zip file.

###Approach###

* I used **jQuery** for my JavaScript framework, since it's  lightweight while being suitable for the DOM manipulations and event handling in my app. jQuery is also compatible across all browsers.
* I cached the jQuery selectors to prevent rescanning the DOM each time the selector is called. Since the DOM is pretty simple, this may not have a noticeable effect on performance.
* To simulate color change of the star, I added a "filter" div on top of the image and set its color/ opacity/blur dynamically on velocity change via jQuery.
* Since the Doppler effect involves movement of the star towards or away from the observer, I also dynamically set the size of the star image and filter on velocity change to simulate this movement.
* For the slider, I used an external polyfill plugin called [**rangeslider.js**](https://github.com/andreruffert/rangeslider.js). It's mainly for looks, although it does include a callback function for slide events (onSlide).
* The slider is on a logarithmic scale, with values equal to log(velocity + 101) * 100.
* On Set button click, the app converts the input value into its logarithmic equivalent and sets the slider value to that new value. The reverse is done on slide event.
* **Bootstrap** is used for styling of Set button.
* Error message is shown automatically when the input is not a number between -100 and 100.

###Issues & Constraints###

* I wanted to use canvas to render the star at first, but Chrome gives a cross-origin error when calling getImageData for local image files, and it seemed the only way around it was to run a local server or host the image online.
* The CSS filter blur function achieves its desired effect in Chrome 18+ & Firefox 35+. The filter function does not render correctly in IE. An alternate solution for IE would be to use canvas to display the image, iterate through each pixel of the image data, and add/diminish the pixel rgb red or blue as a function of the velocity.