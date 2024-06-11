/**
* Template Name: Eterna
* Template URL: https://bootstrapmade.com/eterna-free-multipurpose-bootstrap-template/
* Updated: Jun 02 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();


// Initialize the popover when the document is ready
$(document).ready(function() {
  // Initialize popover
  $('#popoverIcon').popover({
      content: function () {
          return $('#popoverContent').html();
      },
      placement: 'right',
      html: true
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.toggle-content');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const expandedContent = button.nextElementSibling;
      expandedContent.classList.toggle('show');
      button.querySelector('i').classList.toggle('fa-plus-circle');
      button.querySelector('i').classList.toggle('fa-minus-circle');
      button.textContent = expandedContent.classList.contains('show') ? 'Show Less' : 'Show More';
    });
  });
});

function toggleContent(contentId, iconId) {
  var content = document.getElementById(contentId);
  var icon = document.getElementById(iconId);

  if (content.classList.contains('active')) {
    content.classList.remove('active');
    icon.classList.remove('fa-circle-minus');
    icon.classList.add('fa-circle-plus');
  } else {
    content.classList.add('active');
    icon.classList.remove('fa-circle-plus');
    icon.classList.add('fa-circle-minus');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
      document.getElementById("hero-heading").classList.add("animate");
  }, 10000); // Show h2 after 10 seconds

  setTimeout(function() {
      document.getElementById("text-1").classList.add("animate");
  }, 15000); // Show first p after 15 seconds (10 + 5)

  setTimeout(function() {
      document.getElementById("text-2").classList.add("animate");
  }, 20000); // Show second p after 20 seconds (10 + 10)

  setTimeout(function() {
      document.getElementById("text-3").classList.add("animate");
  }, 25000); // Show third p after 25 seconds (10 + 15)

  setTimeout(function() {
      document.getElementById("text-4").classList.add("animate");
  }, 30000); // Show fourth p after 30 seconds (10 + 20)
});

function toggleContent(contentId, triggerId) {
  var content = document.getElementById(contentId);
  var trigger = document.getElementById(triggerId);

  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
    trigger.classList.remove("fa-circle-plus");
    trigger.classList.add("fa-circle-minus");
  } else {
    content.style.display = "none";
    trigger.classList.remove("fa-circle-minus");
    trigger.classList.add("fa-circle-plus");
  }
}

function removeNonBreakingSpaces() {
  // Select all elements containing non-breaking spaces
  var elementsWithNbsp = document.querySelectorAll('body *');

  // Iterate over each element and replace non-breaking spaces with regular spaces
  elementsWithNbsp.forEach(function(element) {
    element.innerHTML = element.innerHTML.replace(/&nbsp;/g, ' ');
  });
}

// Check screen size on window resize
window.addEventListener('resize', function() {
  var screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    // Remove non-breaking spaces when screen size is less than or equal to 768px
    removeNonBreakingSpaces();
  }
});

// Initial check for mobile responsiveness
if (window.innerWidth <= 768) {
  removeNonBreakingSpaces();
}


document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var searchInput = document.getElementById('searchInput').value.toLowerCase();
  var blogPostItems = document.querySelectorAll('.blog-post-item');

  blogPostItems.forEach(function(item) {
    var title = item.querySelector('.title a').textContent.toLowerCase();
    var content = item.querySelector('.content p').textContent.toLowerCase();

    if (title.includes(searchInput) || content.includes(searchInput)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});

