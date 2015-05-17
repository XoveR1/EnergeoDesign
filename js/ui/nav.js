function MobileNav(){
    var self = this;
    this.$header = $('header');
    this.$searchForm = $('header .search-form');
    this.$phonesBlock = $('header .phones');
    this.$navBlock = $('header nav');
    this.$searchBtn = $('.mobile-nav .js-toggle-search');
    this.$phonesBtn = $('.mobile-nav .js-toggle-phones');
    this.$navBtn = $('.mobile-nav .js-toggle-nav');

    this.extendHeader = function($objToShow, height){
        self.$header.transition({height: height});

        $objToShow.css('marginLeft', '-1000px')
        .show()
        .transition({
            marginLeft: -$objToShow.outerWidth() / 2,
            duration: 500
        });
    };

    this.backHeader = function($objToHide){
        $objToHide.transition({
            marginLeft: '-800px',
            duration: 700
        }).queue(function(){
            self.$header
                .transition({ height: '65px'})
                .queue(function(){
                    self.$header.css('height', 'auto');
                    $(this).dequeue();
                });
            $objToHide.hide();
            $(this).dequeue();
        });
    };

    this.hideSearchForm = function(){
        if(self.$searchBtn.hasClass('active')){
            self.backHeader(self.$searchForm);
            self.$searchBtn.removeClass('active');
        }
    };

    this.hidePhonesBlock = function(){
        if(self.$phonesBtn.hasClass('active')){
            self.backHeader(self.$phonesBlock);
            self.$phonesBtn.removeClass('active');
        }
    };

    this.hideNav = function(){
        if(self.$navBtn.hasClass('active')){
            self.$navBlock.slideUp();
            self.$navBtn.removeClass('active');
        }
    };

    this.toggleHeader = function($button, $objToToggle, height){
        if($button.hasClass('active')){
            self.backHeader($objToToggle);
            $button.removeClass('active');
        } else {
            self.extendHeader($objToToggle, height);
            $button.addClass('active');
        }
    };

    this.$searchBtn.on('click', function(){
        self.toggleHeader($(this), self.$searchForm, '130px');
    });

    this.$phonesBtn.on('click', function(){
        self.toggleHeader($(this), self.$phonesBlock, '140px');
    });

    this.$navBtn.on('click', function(){
        $(this).toggleClass('active');
        self.$navBlock.slideToggle();
    });
}

$(document).ready(function(){
    MobileNav();
});