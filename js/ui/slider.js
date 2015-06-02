function MainSlider(){
    var self = this;
    this.imageProportion = 3.47;
    this.sliderInitHeight = $('body').width() / this.imageProportion;
    this.sliderID = '#slider-block';
    this.$slider = $(this.sliderID);
    this.$sliderFrame = $(this.sliderID + ' .frames-container');
    this.$owl = null;

    this.init = function(){
        this.$slider.height(this.sliderInitHeight);
        this.$sliderFrame.owlCarousel({
            lazyLoad: true,
            pagination : false,
            singleItem: true,
            slideSpeed: 500,
            rewindSpeed: 500,
            transitionStyle : "fadeUp",
            addClassActive: true,
            autoPlay: 10000,
            stopOnHover: true,
            afterLazyLoad: function(){
                self.$slider.css('height', 'auto');
                self.animateArticle(0);
                setTimeout(function(){
                    self.$owl.reload();
                }, 100);
            },
            afterUpdate: function () {
                self.animateArticle(600);
            },
            afterMove: function(){
                self.animateArticle(1);
            }
        });
        this.$owl = this.$sliderFrame.data('owlCarousel');
    };

    this.animateArticle = function(delay){
        var $article = $(self.sliderID + ' .active article');
        delay = delay || 100;
        if($article.length == 0){
            setTimeout(function(){
                self.animateArticle(delay);
            }, 100);
        }
        $article.css('marginTop', '-20%')
            .show()
            .transition({
                marginTop: '5%',
                delay: delay,
                duration: 400
            });
    };

    this.animateRight = function($arrow){
        $arrow.transition({ x: '100%', delay: 0, duration: 200 });
    };

    this.animateLeft = function($arrow){
        $arrow.transition({ x: '-100%', delay: 0, duration: 200 });
    };

    $(document).on('click', this.sliderID + ' .arrow-next', function(e){
        e.preventDefault();
        self.$owl.next();
    });

    $(document).on('click', this.sliderID + ' .arrow-prev', function(e){
        e.preventDefault();
        self.$owl.prev();
    });

    this.$slider.on('mouseover', function(){
        self.animateRight($(self.sliderID + ' .arrow-prev'));
        self.animateLeft($(self.sliderID + ' .arrow-next'));
    });

    this.$slider.on('mouseleave', function(){
        self.animateLeft($(self.sliderID + ' .arrow-prev'));
        self.animateRight($(self.sliderID + ' .arrow-next'));
    });

    this.init();
}

$(document).ready(function(){
    MainSlider();
});