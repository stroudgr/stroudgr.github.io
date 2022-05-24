
// Scroll nav bar
/*var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
                                        // Decrease 100 if I want header to appear when going up fast 
  if (prevScrollpos >= currentScrollPos + 100 || prevScrollpos <= 20) {
    document.getElementById("navbar").style.top = "0";
  } else if (prevScrollpos < currentScrollPos) {
    document.getElementById("navbar").style.top = "-60px";
  }
  prevScrollpos = currentScrollPos;
}
*/


$(document).ready(function(){
  
var prevScrollpos = window.pageYOffset;
  $(window).scroll( () => {
  //window.onscroll = function() {  
    var currentScrollPos = window.pageYOffset;
                                          // Decrease 100 if I want header to appear when going up fast 
    if (prevScrollpos >= currentScrollPos + 100 || prevScrollpos <= 20) {
      //document.getElementById("navbar").style.top = "0";
      $("#navbar").css("top", "0");
    } else if (prevScrollpos < currentScrollPos) {
      //document.getElementById("navbar").style.top = "-60px";
      $("#navbar").css("top", "-60px");
    }
    prevScrollpos = currentScrollPos;
  })

});