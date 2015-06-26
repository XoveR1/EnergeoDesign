(function($) {
    $.fn.customTabs = function (options) {
        const MOBILE_WIDTH = 752;

        options = options || {};
        var tabMenuSelector = this.selector;
        var tabBtnSelector = options.tabBtnSelector || 'a'
        var tabElemToActivate = options.tabElemToActivate || 'li'
        var activeClass = options.activeClass || 'active'

        $(document).on('click', tabMenuSelector + ' ' + tabBtnSelector, function(e){
            e.preventDefault()
            var $tabBtn = $(this),
                $elemToActivate = $tabBtn.closest(tabElemToActivate),
                linkedTabID = $tabBtn.data('tab'),
                $linkedTab = $(linkedTabID);

            $elemToActivate.addClass(activeClass)
                .siblings()
                .removeClass(activeClass)

            $linkedTab.addClass(activeClass)
                .siblings()
                .removeClass(activeClass)
        })
    }
})(jQuery);

$(document).ready(function(){
    $('.product-details .menu').customTabs();
});