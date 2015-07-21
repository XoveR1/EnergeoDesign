(function ($) {
    $.fn.customMap = function (options) {
        var myLatlng = new google.maps.LatLng(53.990105, 27.679273);
        var mapOptions = {
            center: myLatlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        var map = new google.maps.Map(this[0], mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'ЧАСТНОЕ ПРЕДПРИЯТИЕ «ЭНЕРГЕО»'
        });
    }
})(jQuery);

$(document).ready(function () {
    $('#mapBlock').customMap();
});