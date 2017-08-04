jQuery(document).ready(function($) {
  console.log('ready!');

  // open all external links as _blank
  $("a").filter(function () {
      return this.hostname && this.hostname !== location.hostname;
  }).each(function () {
      $(this).attr({
          target: "_blank"
      });
  });

  // Pyramid
  $('.pyramid img[usemap]').rwdImageMaps();

  $('.pyramid div').on('click', function(e) {
    e.preventDefault();
     var bandClass = '.' + $(this).attr('class').split(' ')[0];

    $('body').fadeOut(800, function() {
      $('.band').fadeOut(50);
      $('.pyramid').fadeOut(50);
      $('.sky').hide();
      $('.moon').fadeOut(50);
      $('.wrapper').hide();
      $('.ground').fadeOut(50);
      $('.logo').fadeOut(50);
      $(bandClass + '.band').fadeIn(500, function() {
        $('body').fadeIn(500);
        $('.js-ground').fadeIn(900);
        $('body').addClass('js-bands');
        $('.white-logo').fadeIn('slow');
      });
    });

    console.log(bandClass);

  });

  $('.back').on('click', function(e) {
      console.log('release');

      $('body').fadeOut(800, function() {
          $('.white-logo').fadeOut('fast');
          $('.band').hide();
          $('.js-ground').fadeOut('fast');
          $('.pyramid').show();
          $('.sky').show();
          $('.moon').show();
          $('.wrapper').show();
          $('.ground').show();
          $('.logo').show(function() {
            $('body').fadeIn(500);
            $(window).trigger('resize');
          });
        });

        $('body').removeClass('js-bands');
      });

});
   // pyramid hover effects
  // $('#Map area.band-1').hover(function(e) {
  //   $(this).toggleClass('band-hover-1');
  // });
  //   $('#Map area.band-2').hover(function(e) {
  //   $(this).toggleClass('band-hover-2');
  // });
  // $('#Map area.band-3').hover(function(e) {
  //   $(this).toggleClass('band-hover-3');
  // });
  // $('#Map area.band-4').hover(function(e) {
  //   $(this).toggleClass('band-hover-4');
  // });
  // $('#Map area.band-5').hover(function(e) {
  //   $(this).toggleClass('band-hover-5');
  // });
  // $('#Map area.band-6').hover(function(e) {
  //   $(this).toggleClass('band-hover-6');
  // });
  // $('#Map area.band-7').hover(function(e) {
  //   $(this).toggleClass('band-hover-7');
  // });

