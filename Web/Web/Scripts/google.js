var maps = function () {
    var
    opt = null,
    setOptions = function (options) {
        opt = options;
    },

    initialize = function () {
        var mapOptions = {
            center: new google.maps.LatLng(44.440521, 26.118622),
            zoom: 12,
            disableDefaultUI: true,
            zoomControl: true,
            panControl: true
        };

        map = new google.maps.Map(opt.divMap, mapOptions);

        drawMarkers(map);
    },
    drawMarkers = function (map) {
        $.each(opt.markers, function (key, value) {
            drawMarker(map, value);
        });
    },
    drawMarker = function myfunction(map, item) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.settings.lat, item.settings.lng),
            map: map,
            title: item.title
        });
    }

    return {
        initialize: initialize,
        setOptions: setOptions
    };
}();

$(function () {
    var opt = {
        divMap: document.getElementById('divMap'),
        markers:
            [{ title: "Unirii square", settings: { lat: 44.424149, lng: 26.103773 } },
             { title: "Victoriei square", settings: { lat: 44.453749, lng: 26.091821 } }]
    };
    maps.setOptions(opt);
    maps.initialize();
    //var mapOptions = { center: new google.maps.LatLng(44.453749,26.091821), zoom: 16 };
});