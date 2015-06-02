function AsideNav(){
    const STATE_CLOSED = 'closed';
    const STATE_ANIMATION = 'animation';
    const STATE_OPENED = 'opened';
    const MOBILE_WIDTH = 752;

    var self = this;
    this.asideState = STATE_CLOSED;
    this.$asideBlock = $('.products-list aside');
    this.$contents = $('#content-wrapper, footer .container');
    this.$wrappers = $('#main-wrapper, footer');

    self.$wrappers.css('overflow-x', 'hidden');

    this.resetStyles = function(){
        self.$contents.removeAttr('style');
        self.$asideBlock.removeAttr('style');
        self.$wrappers.css('width', 'auto');
        self.asideState = STATE_CLOSED;
    };

    this.removeSelection = function(){
        document.getSelection().removeAllRanges();
    };

    this.isMobileScreen = function(){
        return self.$contents.width() <= MOBILE_WIDTH;
    };

    $(window).on("swiperight", function(e) {
        if(!self.isMobileScreen()){return}
        e.preventDefault();
        self.removeSelection();
        if(self.asideState == STATE_CLOSED) {
            var windowWidth = this.$contents.width();
            self.asideState = STATE_ANIMATION;

            self.$wrappers.css('width', windowWidth);
            self.$contents.css('width', windowWidth).transition({
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
        self.removeSelection();
        if(self.asideState == STATE_OPENED) {
            self.asideState = STATE_ANIMATION;
            self.$contents.transition({
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