
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
                                          // Decrease number after currentScrollPos if I want header to appear when going up fast 
    if (prevScrollpos >= currentScrollPos + 1 || prevScrollpos <= 20) {
      //document.getElementById("navbar").style.top = "0";
      $("#navbar").css("top", "0");
    } else if (prevScrollpos < currentScrollPos) {
      //document.getElementById("navbar").style.top = "-60px";
      $("#navbar").css("top", "-60px");
    }
    //prevScrollpos = currentScrollPos;
  })


$(window).scroll( () => {
  //window.onscroll = function() {  
    var currentScrollPos = window.pageYOffset;
                                          // 
    var emailPos = $('#email').position().top;                                      
    if (currentScrollPos <= prevScrollpos - 1 || currentScrollPos >= emailPos - 1300) {
      //document.getElementById("navbar").style.top = "0";
      $("#bottomNavbar").css("bottom", "0");
    } else if (currentScrollPos > prevScrollpos+20) {
      $("#bottomNavbar").css("bottom", "-40px");

      //console.log($(document).scrollTop());
      
     // console.log(currentScrollPos); 
      //console.log(emailPos - 1000);

      //console.log($(this).scrollTop() >= $('#target_element').position().top);

    }
    prevScrollpos = currentScrollPos;
  })

});