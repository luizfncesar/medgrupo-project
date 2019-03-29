var mobileNav = document.querySelector('.header__brand');
var toggle = document.querySelector('.menu--medgrupo');
mobileNav.onclick = function () {
  toggleClass(this, 'menu--disabled');
  toggleClass(toggle, 'menu--active');
};

/*# sourceMappingURL=index.js.map */