'use strict';

/////////////////////////
/// Private Variables ///
/////////////////////////

var newInputValue = 0;
var settingVelocity = false;

//cache jQuery selectors
var $velocityInput = $('#velocity-input');
var $velocitySetButton = $('#velocity-set-button');
var $velocitySlider = $('#velocity-slider');
var $starImage = $('#star-image');
var $colorFilter = $('#color-filter');
var $inputMessage = $('#input-message');
var $errorMessage = $('#error-message');



////////////////////////
/// Helper Functions ///
////////////////////////

//checks to see if velocity input is valid, toggles error message
var validateInput = function(value) {
	if($velocityInput.val().length && isNaN(value) || value > 100 || value < -100) {
		$inputMessage.hide();
		$errorMessage.show();
		return false;
	}
	else {
		$inputMessage.show();
		$errorMessage.hide();
		return true;
	}
};

//returns corresponding position/value on slider given a velocity value
var getSliderValueFromVelocity = function(velocity) {
	return Math.log(velocity + 101) * 100 / Math.log(10);
};

//updates image size & filter size/color on velocity change
var updateImage = function() {
	var velocity = Number(newInputValue);
	var newImageWidth = 420 + 2 * velocity;
	var newImageHeight = newImageWidth;
	var newFilterWidth = 210 + velocity;
	var newFilterHeight = newFilterWidth;
	var newBlur = 'blur(' + Math.floor(50 + velocity / 4) + 'px)';
	var newOpacity = Math.abs(velocity / 125);
	var newRGB;

	if(velocity > 0)
		newRGB = 'rgb(255, 0, 0)';
	else
		newRGB = 'rgb(0, 0, 255)';

	//update image
	$starImage.css({
		width: newImageWidth,
		height: newImageHeight,
		marginTop: -velocity,
		marginBottom: -velocity
	});

	//update filter
	$colorFilter.css({
		width: newFilterWidth,
		height: newFilterHeight,
		backgroundColor: newRGB,
		opacity: newOpacity,
		filter: newBlur,
		webkitFilter: newBlur,
		mozFilter: newBlur,
		msFilter: newBlur,
		oFilter: newBlur
	});
};


//////////////////////
/// Event Handlers ///
//////////////////////

//on button click, update velocity slider position and update image
$velocitySetButton.click(function(e) {
	e.stopPropagation();
	newInputValue = Number($velocityInput.val());
	if(validateInput(newInputValue)) {
		settingVelocity = true;
		var newSliderValue = getSliderValueFromVelocity(newInputValue);
		if(newSliderValue !== Number($velocitySlider.val())) {
			$velocitySlider.val(newSliderValue).change();
			updateImage();
		}
		else {
			settingVelocity = false;
		}
	}
});

//pressing Enter also activates set button
$(document).keydown(function(e) {
	if(e.which === 13) {
		e.preventDefault();
		$velocitySetButton.click();
	}
});

//input validation bound to change in input field
$velocityInput.bind('input change', function() {
	validateInput(Number($velocityInput.val()));
});



////////////
/// Init ///
////////////

//initialize velocity slider current and max value
$velocitySlider.attr('max', getSliderValueFromVelocity(100));
$velocitySlider.val(200);

//initialize rangeslider plugin instance for velocity slider
$velocitySlider.rangeslider({
	polyfill: false,	//disabled for browsers that support native <input type="range"> element
	fillClass: 'no-color',	//remove default color

	//on slide event, update velocity input and update image
	onSlide: function(position, value) {
		if(settingVelocity) {
			settingVelocity = false;
			return;
		}
		newInputValue = (Math.pow(10, Number(value) / 100) - 101).toFixed(2);
		if(newInputValue !== Number($velocityInput.val())) {
			$velocityInput.val(newInputValue).change();
			updateImage();
		}
	}
});

//hide error message on init
$errorMessage.hide();