(function ($) {
    $.fn.customMap = function (options) {
        options = options || {};
        var cursorLangitude = options.cursorLangitude || this.data('map-longitude');
        var cursorLatitude = options.cursorLatitude || this.data('map-latitude');
        var markerLabel = options.cursorLatitude || this.data('map-marker-label');
        var markerIcon = options.cursorLatitude || this.data('map-marker-icon');

        var myLatlng = new google.maps.LatLng(cursorLangitude, cursorLatitude);
        var mapOptions = {
            center: myLatlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        var map = new google.maps.Map(this[0], mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: markerLabel,
            icon: markerIcon
        });
    }
})(jQuery);

$(document).ready(function () {
    $('#mapBlock').customMap();
});