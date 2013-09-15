(function() {
  mixpanel.track('pageview', {
    href: window.location.href
  });

  var $quotes = $('.press blockquote');
  $quotes.on('mouseenter', function() {
    $quotes.addClass('blur');
    $(this).removeClass('blur');
  }).on('mouseleave', function() {
    $quotes.removeClass('blur');
  });

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

  $('.watch').on('click', function() {
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

    var $error = $('div.error');

    var $submit = $('.submit');
    $submit.attr('disabled', true);

    var url = 'http://barkingmousestudio.us7.list-manage.com/subscribe/post-json?u=1509e89e6c5a63a559fec6857&id=183e8cb777&EMAIL=' + encodeURIComponent(email) + '&c=?';
    $.getJSON(url, function(response) {
      if (response && response.result === 'error') {
        $error.html(response.msg).show();
        $email.addClass('error');
        $submit.removeAttr('disabled');
        return;
      }

      $email.removeClass('error');
      $error.hide();
      $('.form').hide();
      $('.thanks').show();

      $email.val('');
      $email.attr('disabled', true);
    });

    mixpanel.track('signup');
  }, 3 * 1000));
})();
