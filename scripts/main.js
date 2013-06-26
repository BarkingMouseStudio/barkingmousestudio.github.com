(function() {
  mixpanel.track('pageview');

  var $modal = $('.modal');
  function closeModal() {
    $modal.animate({ opacity: 0 }, 200, 'ease-in-out', function() {
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

  $('.play').on('click', function() {
    mixpanel.track('play');
    $modal.show().animate({ opacity: 1 }, 200, 'ease-in-out', function() {
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

  $('button.submit').on('click', _.throttle(function() {
    var $email = $('.email');
    var email = $email.val();

    if (email.indexOf('@') === -1) {
      $email.addClass('error');
      return;
    }

    $email.val('');
    $email.attr('disabled', true);

    $('.form').hide();
    $('.thanks').show();

    mixpanel.identify(email);
    mixpanel.people.set({
      '$email': email,
      '$created': new Date().toJSON(),
      '$last_login': new Date(),
    });
    mixpanel.name_tag(email);
    mixpanel.track('signup');
  }, 3 * 1000));
})();
