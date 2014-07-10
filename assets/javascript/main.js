(function() {
  var posts,post,left,right,mobile;

  posts = document.querySelectorAll('#timeline .timeline-post');
  left = document.querySelector('#timeline-left');
  right = document.querySelector('#timeline-right');

  $('img').unveil(400, function() {
    $(this).load(function() {

      var element = this;
      while(element.parentNode) {
        element = element.parentNode;
        if (element.className == 'timeline-post') {
          break;
        }
      }

      element.style.opacity = 1;
      if (right.clientHeight < left.clientHeight) {
        element = right.appendChild(element);
      } else {
        element = left.appendChild(element);
      }

    });
  });

  mobile = (/iphone|ipad|ipod|android|blackberry|mini|windowsce|palm/i.test(navigator.userAgent.toLowerCase()));
  if (mobile) {
    document.querySelector('#projects').style.minHeight = '500px';
    document.querySelector('#hero figure').style.height = '600px';
    document.querySelector('#post .post-content').style.minHeight = '600px';

  } else {
    $('#home #header').attr('class', 'fixed');

    var figures = document.getElementsByTagName('figure');

    for (var i = 0; i < figures.length; i++) {
      figures[i].style.backgroundAttachment = 'fixed';
    }

    $('.waypoint').each( function(i) {
      var $el = $(this),
      $section = $el.next(),
      height = $section.outerHeight(true);

      $el.waypoint(function(direction) {
        if(direction == 'down') {
          $section.attr('class', 'collection fixed');
          $el.css('height', 15 + height);
        }

        if(direction == 'up'){
          $section.attr('class', 'collection');
          $el.css('height', 0);
        }
      }, {offset: '73px'});
    });
  }
})();
