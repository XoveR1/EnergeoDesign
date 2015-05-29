function AsideNav(){
    var self = this;
    this.$asideBlock = $('.products-list aside');
    this.$mainWrapper = $('#main-wrapper, footer');
    this.$body = $('body');
    self.$body.css('overflow-x', 'hidden');

    this.resetStyles = function(){
        self.$mainWrapper.removeAttr('style');
        self.$asideBlock.removeAttr('style');
    };

    this.removeSelecttion = function(){
        document.getSelection().removeAllRanges();
    };

    $(window).on("swiperight", function(e) {
        e.preventDefault();
        self.removeSelecttion();
        self.$mainWrapper.css('width', this.$mainWrapper.width()).transition({
            marginLeft: '300px',
            duration: 700
        });

        self.$asideBlock.transition({
            'left': '0',
            duration: 700
        });
    });

    $(window).on("swipeleft", function(e) {
        e.preventDefault();
        self.removeSelecttion();
        self.$mainWrapper.transition({
            marginLeft: 0,
            duration: 700
        }).queue(function(){
            $(this).css('width', 'auto').dequeue();
            self.resetStyles();
        });

        self.$asideBlock.transition({
            'left': '-300px',
            duration: 700
        });
    });

    $(window).on("resize", function(){
        self.resetStyles();
    });
};

$(document).ready(function(){
     AsideNav();
});