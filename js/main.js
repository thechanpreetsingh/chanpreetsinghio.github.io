var doc = jQuery(document);

$(window).on("load", function () {
  $(".loader").fadeOut(500);
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
 //funtion to remove css 
 var top = $(window).scrollTop();
  if (top >= 200) {
    $("header").addClass("overlay");
    $(".navbar-nav").removeClass("navbar-nav-bg");
  } else if ($("header").hasClass("overlay")) {
    $("header").removeClass("overlay");
  } else {
    $(".navbar-nav").addClass("navbar-nav-bg");
  }
});

doc.ready(function () {
  "use strict";

  // $(window).scrollTop(0);

  var typed = new Typed(".mytext", {
    strings: ["Learner", "Full Stack Developer", "Machine Learning Enthusiast"],
    smartBackspace: true, // Default value
    loop: true,
    backDelay: 1000,
    typeSpeed: 50,
  });

  $(".navbar-nav").onePageNav({
    currentClass: "active",
  });

  if ($(window).scrollTop() < 200) {
    $(".navbar-nav").addClass("navbar-nav-bg");
  }

  $(window).scroll(function () {
    var top = $(window).scrollTop();

    if (top >= 200) {
      $("header").addClass("overlay");
      $(".navbar-nav").removeClass("navbar-nav-bg");
    } else if ($("header").hasClass("overlay")) {
      $("header").removeClass("overlay");
    } else {
      $(".navbar-nav").addClass("navbar-nav-bg");
    }
  });

  function navbarClassOverlay() {
    var top = $(window).scrollTop();
    debugger;
    if (top >= 200) {
      $("header").addClass("overlay");
      $(".navbar-nav").removeClass("navbar-nav-bg");
    } else if ($("header").hasClass("overlay")) {
      $("header").removeClass("overlay");
    } else {
      $(".navbar-nav").addClass("navbar-nav-bg");
    }
  }

  $(".progress-content .skill-progress").each(function () {
    var waypoint = new Waypoint({
      element: this,
      handler: function (direction) {
        var value = $(this.element).attr("data-progress");
        $(this.element).css("width", "" + value + "%");
      },
      offset: "120%",
    });
  });

  /*** scrolling animation ***/

  $(".animation").each(function () {
    var waypoint = new Waypoint({
      element: this,
      handler: function (direction) {
        var cssvalue = $(this.element).attr("data-animation");

        $(this.element).addClass("animated " + cssvalue);
        $(this.element).css("opacity", "1").fadeIn(1000);
      },
      offset: "90%",
    });
  });

  var $grid = $(".portfolio-container").isotope({
    // options
    itemSelector: ".portfolio-item",
  });

  $(".filter li").on("click", function () {
    $(".filter li").removeClass("filter-active");
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
    $(this).addClass("filter-active");
  });

  $(".testimonial-container").owlCarousel({
    items: 1,
    autoplay: true,
    rewind: true,
  });
});
