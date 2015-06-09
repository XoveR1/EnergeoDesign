(function($) {
    $.fn.customModal = function (options) {
        options = options || {};
        var modalTriggerSelector = this.selector;
        var modalSelector =  options.modalSelector || '.modal';
        var modalContainerSelector = options.modalContainerSelector || '.modal-container';
        var overlaySelector = options.overlaySelector || '.modal-overlay';
        var closeBtnSelector = options.closeBtnSelector || '.modal-close-btn';

        var getModal = function($modalBtn){
            return $('#' + (options.modal_id || $modalBtn.data('modal-id')))
        };

        var stretchOverlay = function(){
            var $modal = $(modalSelector),
                $modalOverlay = $(overlaySelector),
                windowHeight = $(document).height();
            $modal.height(windowHeight);
            $modalOverlay.height(windowHeight);
        };

        var centreModal = function(){
            var $modalContainer = $(modalContainerSelector),
                modalWidth = $modalContainer.width(),
                modalHeight = $modalContainer.height();

            $modalContainer.css('marginLeft', -modalWidth / 2);
            $modalContainer.css('marginTop', -modalHeight / 2)

            console.log(modalWidth, modalHeight)
        };

        $(document).on('click', modalTriggerSelector, function(e){
            var $modal = getModal($(this));
            e.preventDefault();
            $modal.addClass('modal-open');
            centreModal();
            centreModal();
            stretchOverlay();
        });

        $(document).on('click', overlaySelector + ',' + closeBtnSelector, function(){
            var $modal = getModal($(this));
            $modal.addClass('modal-close');
            setTimeout(function(){
                $modal.removeClass('modal-close');
                $modal.removeClass('modal-open');
            }, 300);
        });

        $(window).on('resize', function () {
            stretchOverlay();
            centreModal();
        });
    }
})(jQuery);

$(document).ready(function(){
    $('.references-articles article').customModal({
        modal_id : 'gallery-modal'
    });
});