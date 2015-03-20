var maps = function () {
    var
        opt = null,
        setOptions = function (options) {
            opt = options;
        }

        initialize = function () {
            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(-34.397, 150.644)
            };
            map = new google.maps.Map(opt.divMap, mapOptions);
        }

    return {
        initialize: initialize,
        setOptions: setOptions
    };        
}();

$(function () {
    var opt = {
        divMap: document.getElementById('divMap')
    };

    maps.setOptions(opt);
    maps.initialize();
});