function toggleMenu() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav.style.left === '0px') {
    mobileNav.style.left = '-100%';
  } else {
    mobileNav.style.left = '0px';
  }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const mobileNav = document.getElementById('mobileNav');
  const menuButton = document.querySelector('.mobile-menu-button');
  
  if (!mobileNav.contains(event.target) && event.target !== menuButton && !menuButton.contains(event.target)) {
    mobileNav.style.left = '-100%';
  }
});
