$(document).ready(function () {
  // Get the necessary elements
  var arrowLeft = $(".arrow-left");
  var arrowRight = $(".arrow-right");
  var tabList = $("#taj_home_sports_list");
  var navItems = tabList.find(".nav-item");
  var itemWidth = navItems.first().outerWidth(true);
  var containerWidth = tabList.parent().width();
  var visibleItems = Math.floor(containerWidth / itemWidth);
  var currentPosition = 0;
  var maxScrollPosition = Math.max(0, navItems.length - visibleItems);

  // Add event listeners to arrow tabs
  arrowLeft.on("click", slideLeft);
  arrowRight.on("click", slideRight);

  function slideLeft() {
    if (currentPosition > 0) {
      currentPosition--;
      slideToCurrent();
    }
  }

  function slideRight() {
    if (currentPosition < maxScrollPosition) {
      currentPosition++;
      slideToCurrent();
    } else {
      currentPosition = 0; // Loop back to the first item
      slideToCurrent();
    }
  }

  function slideToCurrent() {
    var scrollAmount = currentPosition * itemWidth;
    tabList.css("transform", "translateX(-" + scrollAmount + "px)");
  }
});

$(document).ready(function () {
  $("#banner-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
    },
  });

  $("#pramotion-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
    },
  });

  $(".play").on("click", function () {
    owl.trigger("play.owl.autoplay", [1000]);
  });
  $(".stop").on("click", function () {
    owl.trigger("stop.owl.autoplay");
  });

  $(window).scroll(function () {
    var sc = $(window).scrollTop();
    if (sc > 150) {
      $("header").addClass("stiky-header");
    } else {
      $("header").removeClass("stiky-header");
    }
  });

  $(".navbar-toggle").click(function () {
    $("body").toggleClass("menu-open");
  });
});
