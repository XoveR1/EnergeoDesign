(function($) {
    $.fn.customGallery = function (options) {
        options = options || {};
        var gallerySelector = this.selector;
        var containerSelector = options.containerSelector || '.frames-container';
        var nextActionSelector = options.nextActionSelector || '.arrow-next';
        var prevActionSelector = options.prevActionSelector || '.arrow-prev';
        var paginationContainerSelector = options.paginationContainerSelector || '.preview-nav';
        var paginationItemSelector = options.paginationItemSelector || 'li';
        var paginationSubItemSelector = options.paginationSubItemSelector || 'a';
        var activeClass = options.activeClass || 'active';
        var paginationItemFullSelector = [
            gallerySelector,
            paginationContainerSelector,
            paginationItemSelector
        ].join(' ');

        var $framesContainer = $(gallerySelector + ' ' + containerSelector);

        $framesContainer.owlCarousel({
            pagination : false,
            singleItem: true,
            slideSpeed: 500,
            rewindSpeed: 500,
            addClassActive: true
        });

        var $owl = $framesContainer.data('owlCarousel');

        var activePageItem = function(index){
            var $pageItem = $(paginationItemFullSelector).eq(index),
                $itemToActive = $pageItem.find(paginationSubItemSelector);
            $itemToActive.addClass(activeClass);
            $pageItem.siblings().find(paginationSubItemSelector).removeClass(activeClass);
        };

        var getActivePageItemIndex = function(){
            return $(
                paginationItemFullSelector + ' '
                + paginationSubItemSelector +
                '.' + activeClass
            ).closest(paginationItemSelector).index()
        };

        var getNextPageItem = function(){
            var activePageItemIndex = getActivePageItemIndex(),
                itemsLength = $(paginationItemFullSelector).length;
            if(activePageItemIndex >= (itemsLength - 1)){
                return 0
            }
            return activePageItemIndex + 1;
        };

        var getPrevPageItem = function(){
            var activePageItemIndex = getActivePageItemIndex(),
                itemsLength = $(paginationItemFullSelector).length;
            if(activePageItemIndex <= 0){
                return itemsLength - 1
            }
            return activePageItemIndex - 1;
        };

        $(document).on('click', gallerySelector + ' ' + nextActionSelector, function(e){
            e.preventDefault();
            $owl.next();
            activePageItem(getNextPageItem());
        });

        $(document).on('click', gallerySelector + ' ' + prevActionSelector, function(e){
            e.preventDefault();
            $owl.prev();
            activePageItem(getPrevPageItem());
        });

        $(document).on('click', paginationItemFullSelector + ' ' + paginationSubItemSelector, function(e){
            e.preventDefault();
            var $pageItem = $(this).closest(paginationItemSelector),
                itemIndex = $pageItem.index();
            $owl.goTo(itemIndex);
            activePageItem(itemIndex);
        });

        activePageItem(0);
    }
})(jQuery);

$(document).ready(function(){
    $('#references-gallery').customGallery();
});