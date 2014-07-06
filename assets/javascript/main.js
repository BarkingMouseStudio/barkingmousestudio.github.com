(function() {
  var posts,post,left,right, $head;

  $head = $('#header');
  posts = document.querySelectorAll('#timeline .timeline-post');
  left = document.querySelector('#timeline-left');
  right = document.querySelector('#timeline-right');

  $("img").unveil(400, function() {
    $(this).load(function() {

      var element = this;
      while(element.parentNode) {
        element = element.parentNode;
        if (element.className == "timeline-post") {
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


  $('.waypoint').each( function(i) {
    var $el = $(this),
    $section = $el.next(),
    height = $section.outerHeight(true);

    $el.waypoint(function(direction) {
      if(direction == 'down') {
        $section.attr('class', "collection fixed");
        $el.css("height", 15 + height);
        if (i == 0) {
          $head.attr('class', "standard");
        }
      }

      if(direction == 'up'){
        $section.attr('class', "collection");
        $el.css("height", 0);
        if (i == 0) {
          $head.attr('class', "overlay");
        }
      }
    }, {offset: '73px'});
  });

})();
