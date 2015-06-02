(function($) {
    $.fn.customAccordion = function(options) {
        options = options || {};
        const MOBILE_WIDTH = 752;

        var accordionContainerSelector = this.selector;
        var itemToAccordionTag = options.itemToAccordionTag || 'a';
        var blockToShowTag = options.blockToShowTag || 'ul';
        var itemForActiveTag = options.itemForActiveTag || 'li';
        var activeClassToAdd = options.activeClassToAdd || 'active';
        var itemToAccordionSelector = accordionContainerSelector + ' ' + itemToAccordionTag;

        var isMobileScreen = function(){
            return $('body').width() <= MOBILE_WIDTH;
        };

        var hideLikeAccordion = function($itemToHide) {
            $itemToHide = $itemToHide || $(
                accordionContainerSelector + ' ' +
                itemForActiveTag + '.' +
                activeClassToAdd
            );
            if($itemToHide.length) {
                var $blockToHide = $itemToHide.find(blockToShowTag);
                $blockToHide.slideUp(function(){
                    $itemToHide.removeClass(activeClassToAdd);
                });
            }
        };

        var toggleLikeAccordion = function($itemToAccordion) {
            var $blockToShow = $itemToAccordion.siblings(blockToShowTag),
                $itemForActive = $itemToAccordion.closest(itemForActiveTag),
                $itemToHide = $itemForActive.siblings('.' + activeClassToAdd);

            if($itemForActive.hasClass(activeClassToAdd)){
                hideLikeAccordion($itemForActive);
            } else if ($blockToShow.length) {
                $blockToShow.slideDown(function(){
                    $itemForActive.addClass(activeClassToAdd)
                });
            }
            hideLikeAccordion($itemToHide);
        };

        $(document).on('click', itemToAccordionSelector, function(e){
            e.preventDefault();
            var $itemToAccordion = $(this);

            if(!isMobileScreen()){
                toggleLikeAccordion($itemToAccordion);
            }
        });

        $(window).on('resize', function(){
            if(isMobileScreen()) {
                hideLikeAccordion();
            }
        })
    };

})(jQuery);

$(document).ready(function(){
    $('aside nav').customAccordion();
    $('.products-articles article img').reflect();
});