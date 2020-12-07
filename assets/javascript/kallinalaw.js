(function (e) {

  // if the story's image isn't already visible, bring up the image
  animateStory = function E(story, isVisible) {
    if (isVisible && !story.hasClass("visible")) {
      story.addClass("visible");
      story.find("div").css("display", "block");
      TweenMax.from(story.find(".featured-img"), 1.6, {
        css: {
          transform: "translate3d(0, 450px, 0)"
        },
        ease: Expo.easeOut
      });
    }
  };

  /*
   * Make all of the CharitablePlanning.com product columns the same height.
   * We could use a display table but then we could not utilize the bootstrap
   * grid wrapping. The grid wrapping works fine, except in a couple of rare
   * instances where the lines of text do not match up and then our grid
   * looks like a mess.
   * In order to account for changing page sizes (not just loading on diff
   * devices), we need a sub-div which holds the text (product-height) and
   * whose height does not get changed. For example, start with a window
   * 1220px wide and then narrow the window. If we read the height of the
   * .product class objects and also adjusted their heights, the text at
   * the bottom would be cut off.
  */
  adjustProductHeights = function E() {
    var heights = $(".product-height").map(function() {
        return $(this).height();
    }).get();

    maxHeight = Math.max.apply(null, heights);

    $(".product").height(maxHeight);
  }

  // on page load
  $(document).ready(function () {
    $("#contact-form").validate(); // validate contact us form

    // if a story is viewable on a page, then animate the story
    $(".story-bar").find(".story-link").bind("inview", function (handler, isVisible) {
      var story = $(this).parent().parent();
      animateStory(story, isVisible);
    });

    $("#story-page").bind("inview", function (handler, isVisible) {
      var story = $(this);
      animateStory(story, isVisible);
    });

    adjustProductHeights();
  });

  // adjust the column heights as window is resized 
  $(window).resize(function() {
    adjustProductHeights();
  });

})(window.jQuery);
