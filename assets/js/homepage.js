var slideshow = false;
var htmlNOTjs = true;


if (slideshow && !htmlNOTjs) {
// Slideshow
$(function() {

	console.log("Slideshow");
	var settings = {
		// Images (in the format of 'url': 'alignment').
			images: {
				'images/me/me.jpg': 'center',
				'images/me/pensive.jpg': 'center',
				'images/me/boat.jpg': 'center'
			},
		// Delay.
			delay: 6000
	};

	$("#meme").remove();

	// TODO better fix than this.
	$(section1).append(`<div class=\"image\" onmousedown=\"return false\" id=\"meme\">
		<div>
			<img src=\"images/me/pensive.jpg\">
		</div>
		<div>
			<img src=\"images/me/me.jpg\">
		</div>
		<div>
			<img src=\"images/me/boat.jpg\">
		</div>
		<div>
			<img src="images/me/IMG_0081.jpg">
		</div>
		<div>
			<img src="images/me/100_49772.jpg">
		</div>
		<div>
			<img src="images/me/IMG_1270.jpg">
		</div>
	</div>`);

	$("#meme > div:gt(0)").hide();

	setInterval(function() {
	  $('#meme > div:first')
	    .fadeOut(2500)
	    .next()
	    .fadeIn(2500)
	    .end()
	    .appendTo('#meme');
	}, 9000);


});
} else if (!htmlNOTjs){

	$("#meme").remove();

	console.log("Time of day");
// Time-of-day based. Will show different photos during different times of day.
(function () {

$(section1).append(`<div class="image" onmousedown="return false">
	<div>
		<img src="images/me/pensive.jpg" id="meme">
	</div>
</div-->`);


	var pictures = [
		"images/me/pensive.jpg",
		"images/me/me.jpg",
		"images/me/boat.jpg",
		"images/me/IMG_0081.jpg",
		"images/me/100_49772.jpg",
		"images/me/IMG_1270.jpg"
	];
	var time = new Date().getHours();
	var time_interval = Math.max(1, Math.floor(24/pictures.length));
	time = (Math.floor(time/time_interval)) % pictures.length;
	console.log(time);
	document.getElementById("meme").src = pictures[time];

})();
}


var color = 0;
//	<section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="first">
function changeColor() {
	var x = document.getElementById("home");
	console.log(x);
	color = !color
	if (color){
		x.className = "banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right color1";
	} else {
		x.className = "banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right";
	}

	return true;
}
