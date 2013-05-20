(function() {
  mixpanel.track('pageview');

  $('button.submit').on('click', _.throttle(function() {
    var $signup = $('input.email');
    var email = $email.val();

    if (email.indexOf('@') === -1) {
      $email.addClass('error');
      return;
    }

    $email.val('');
    $email.attr('disabled', true);

    $('.input').hide();
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
