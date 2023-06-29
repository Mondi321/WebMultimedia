$(function () {
    const $gallery = $(".gallery a").simpleLightbox();
  });
  
  $(document).ready(function () {
    setTimeout(function () {
      $(".scan-container").fadeOut();
    }, 10000);
    $(".explore-btn").click(function () {
      $(".landing-page").fadeOut(1500);
      $(".main-page").fadeIn(4000);
      var audio = new Audio("sounds/explore_button_click.mp3");
      audio.play();
    });
  });