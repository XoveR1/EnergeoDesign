function AsideNav(){
    const STATE_CLOSED = 'closed';
    const STATE_ANIMATION = 'animation';
    const STATE_OPENED = 'opened';
    const MOBILE_WIDTH = 752;

    var self = this;
    this.asideState = STATE_CLOSED;
    this.$asideBlock = $('.products-list aside');
    this.$mainWrapper = $('#main-wrapper, footer');
    this.$body = $('body');
    self.$body.css('overflow-x', 'hidden');

    this.resetStyles = function(){
        self.$mainWrapper.removeAttr('style');
        self.$asideBlock.removeAttr('style');
        self.$body.css('width', 'auto');
        self.asideState = STATE_CLOSED;
    };

    this.removeSelecttion = function(){
        document.getSelection().removeAllRanges();
    };

    this.isMobileScreen = function(){
        return self.$mainWrapper.width() <= MOBILE_WIDTH;
    };

    $(window).on("swiperight", function(e) {
        if(!self.isMobileScreen()){return}
        e.preventDefault();
        self.removeSelecttion();
        if(self.asideState == STATE_CLOSED) {
            var windowWidth = this.$mainWrapper.width();
            self.asideState = STATE_ANIMATION;

            self.$body.css('width', windowWidth);
            self.$mainWrapper.css('width', windowWidth).transition({
                marginLeft: '300px',
                duration: 700
            }).queue(function(){
                $(this).dequeue();
                self.asideState = STATE_OPENED;
            });

            self.$asideBlock.transition({
                'left': '0',
                duration: 700
            });
        }
    });

    $(window).on("swipeleft", function(e) {
        if(!self.isMobileScreen()){return}
        e.preventDefault();
        self.removeSelecttion();
        if(self.asideState == STATE_OPENED) {
            self.asideState = STATE_ANIMATION;
            self.$mainWrapper.transition({
                marginLeft: 0,
                duration: 700
            }).queue(function () {
                $(this).css('width', 'auto').dequeue();
                self.resetStyles();
            });

            self.$asideBlock.transition({
                'left': '-300px',
                duration: 700
            });
        }
    });

    $(window).on("resize", function(){
        if(!self.isMobileScreen()){return}
        self.resetStyles();
    });
};

$(document).ready(function(){
     AsideNav();
});