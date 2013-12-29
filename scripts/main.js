(function() {
  var time = Date.now();

  mixpanel.track('pageview', {
    href: window.location.href
  });

  $(window).on('unload', function() {
    mixpanel.track('engagement', {
      duration: (Date.now() - time) / 1000
    });
  });

  $(document).on('click', function() {
    mixpanel.track('click');
  })

  var $quotes = $('.press blockquote');
  $quotes.on('mouseenter', function() {
    $quotes.addClass('blur');
    $(this).removeClass('blur');
  }).on('mouseleave', function() {
    $quotes.removeClass('blur');
  });

  var $modal = $('.modal');
  function closeModal() {
    $modal.animate({
      opacity: 0
    }, 200, 'ease-out', function() {
      $modal.hide();
    });
  }

  var video = $('.video').get(0);
  var player = $f(video);
  player.addEvent('ready', function() {
    player.addEvent('finish', function() {
      closeModal();
      mixpanel.track('play finish');
    });
  });

  $('.watch').on('click', function() {
    mixpanel.track('play');
    $modal.show().animate({
      opacity: 1
    }, 200, 'ease-out', function() {
      player.api('play');
    });
  });

  $modal.on('click', function() {
    closeModal();
    player.api('pause');
  });

  $('.links a').on('click', function(e) {
    mixpanel.track('link', {
      href: e.target.getAttribute('href')
    });
  });

  $(function() {
    var isMobile = navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/i);
    var isSmall = window.innerWidth <= 1024 && window.innerHeight <= 1024;
    if (isMobile || isSmall) {
      $('.header').addClass('video-fallback');
      $('.header video').hide();
    }
  });
})();
