// Navbar change
// =======================================

$(window).scroll( () =>
($(document).scrollTop() > 850 ) ? $('navbar').addClass('stretch') : $('navbar').removeClass('stretch')
);


// Mobile Navbar
// =======================================
let show = true;
const menuSection = document.querySelector('.navbar');
const menuButton = document.querySelector('.navbar-mobile-menu-icon');

menuButton.addEventListener("click", () => {
menuSection.classList.toggle("on", show);
show = !show;
});