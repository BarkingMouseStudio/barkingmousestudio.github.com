(function() {
  mixpanel.track('pageview');

  var $modal = $('.modal');
  $('.play').on('click', function() {
    mixpanel.track('play');
    $modal.show().animate({ opacity: 1 }, 200, 'ease-in-out');
  });

  $modal.on('click', function() {
    $modal.animate({ opacity: 0 }, 200, 'ease-in-out', function() {
      $modal.hide();
    });
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
