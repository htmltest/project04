(function($) {

    $(window).load(function() {
        $('.main-docs a').each(function() {
            var curLink = $(this);
            var curLinkHeight = curLink.height();
            var curIconHeight = curLink.find('.main-docs-icon').height();
            var curNameHeight = curLink.find('.main-docs-name').height();
            if (curLinkHeight > curIconHeight) {
                curLink.find('.main-docs-icon').css({'padding-top': (curLinkHeight - curIconHeight) / 2});
            }
            if (curLinkHeight > curNameHeight) {
                curLink.find('.main-docs-name').css({'padding-top': (curLinkHeight - curNameHeight) / 2});
            }
        });
    });

})(jQuery);