function MobileNav(){
    var self = this;
    this.$header = $('header');
    this.$searchForm = $('header .search-form');
    this.$phonesBlock = $('header .phones');
    this.$navBlock = $('header nav');
    this.$searchBtn = $('.mobile-nav .js-toggle-search');
    this.$phonesBtn = $('.mobile-nav .js-toggle-phones');
    this.$navBtn = $('.mobile-nav .js-toggle-nav');

    this.extendHeader = function($objToShow, height, noHeaderTransition){
        self.$header.transition({height: height}).queue(function(){
            $objToShow.css('marginLeft', '-1000px')
            .show()
            .transition({
                marginLeft: -$objToShow.outerWidth() / 2,
                duration: 500
            });
            $(this).dequeue();
        });
    };

    this.backHeader = function($objToHide, hideHeader, callback){
        var hideHeader = hideHeader == false ? false : true;
        $objToHide.transition({
            marginLeft: '-800px',
            duration: 700
        }).queue(function(){
            if(hideHeader) {
                self.$header
                    .transition({height: '65px'})
                    .queue(function () {
                        self.$header.removeAttr('style');
                        $(this).removeAttr('style').dequeue();
                        if (callback) {
                            callback();
                        }
                    });
            } else if (callback) {
                callback();
            }
            $(this).removeAttr('style').dequeue();
        });
    };

    this.hideSearchForm = function(hideHeader, callback){
        if(self.$searchBtn.hasClass('active')){
            self.backHeader(self.$searchForm, hideHeader, callback);
            self.$searchBtn.removeClass('active');
        } else if (callback) {
            callback();
        }
    };

    this.hidePhonesBlock = function(hideHeader, callback){
        if(self.$phonesBtn.hasClass('active')){
            self.backHeader(self.$phonesBlock, hideHeader, callback);
            self.$phonesBtn.removeClass('active');
        } else if (callback){
            callback();
        }
    };

    this.hideNav = function(callback){
        if(self.$navBtn.hasClass('active')){
            self.$navBlock.slideUp(function(){
                    $(this).removeAttr('style');
                    if(callback){
                        callback();
                    }
                });
            self.$navBtn.removeClass('active');
        } else if (callback) {
            callback();
        }
    };

    this.hideAll = function(hideHeader, callback){
        var waitUntilZero = 3;
        var wait = function(){
            waitUntilZero--;
            if(waitUntilZero == 0 && callback){
                callback();
            }
        };
        self.hideNav(wait);
        self.hideSearchForm(hideHeader, wait);
        self.hidePhonesBlock(hideHeader, wait);
    };

    this.toggleHeader = function($button, $objToToggle, height, hideHeader){
        var wasOpened = $button.hasClass('active');
        self.hideAll(hideHeader, function(){
            if(!wasOpened){
                self.extendHeader($objToToggle, height);
                $button.addClass('active');
            }
        });
    };

    this.$searchBtn.on('click', function(){
        var hideHeader = !self.$phonesBtn.hasClass('active');
        self.toggleHeader($(this), self.$searchForm, '130px', hideHeader);
    });

    this.$phonesBtn.on('click', function(){
        var hideHeader = !self.$searchBtn.hasClass('active');
        self.toggleHeader($(this), self.$phonesBlock, '140px', hideHeader);
    });

    this.$navBtn.on('click', function(){
        var $button = $(this),
            wasOpened = $button.hasClass('active');
        self.hideAll(true, function() {
            if(!wasOpened) {
                $button.addClass('active');
                self.$navBlock.slideDown();
            }
        });
    });

    $(window).on('resize', function(){
        self.hideAll(true);
    });
}

$(document).ready(function(){
    MobileNav();
});