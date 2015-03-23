var maps = function () {
    var
    opt = null,
    map = null,
    markers = [],
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
        mapClick(map);
    },
    mapClick = function (map) {
        google.maps.event.addListener(map, 'rightclick', function (event) {
            setMarkerLocation(event.latLng.lat(), event.latLng.lng());
        });
    },
    setMarkerLocation = function (lat, lng) {
        setAllMap(null);
        drawMarker(map,
            {
                title: opt.title.val(),
                description: opt.details.val(),
                location: { lat: lat, lng: lng }
            }
        );
        showCoords(lat, lng);
    },
    showCoords = function (lat, lng) {
        opt.divCoords.html('lat: ' + lat + '/long: ' + lng);
    },
    setAllMap = function(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
    drawMarkers = function (map) {
        $.each(opt.markers, function (key, value) {
            drawMarker(map, value);
        });
    },
    drawMarker = function myfunction(map, item) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.location.lat, item.location.lng),
            map: map,
            title: item.title
        });
        setMarkerClick(map, marker, item.description);
        markers.push(marker);
    },
    setMarkerClick = function (map, marker, description) {
        var info = new google.maps.InfoWindow({
            content: description
        });
        google.maps.event.addListener(marker, 'click', function () {
            info.open(map, marker);
        });
    },
    //typeahead
    initializeTypeAhead = function () {
        var locations = new Bloodhound({
            limit: 10,
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=%QUERY",
                filter: function (locations) {
                    return $.map(locations.results, function (location) {
                        return {
                            value: location.formatted_address,
                            geolat: location.geometry.location.lat,
                            geolong: location.geometry.location.lng
                        };
                    });
                }
            }
        });

        locations.initialize();

        var typeAhead = opt.street.typeahead({
            autoselect: true,
            minLength: 3
        }, {
            displayKey: 'value',
            source: locations.ttAdapter()
        });
        typeAhead.on('typeahead:selected', function (evt, data) {
            var latLng = new google.maps.LatLng(data.geolat, data.geolong);
            map.setCenter(latLng);
            setMarkerLocation(data.geolat, data.geolong);
        });
    }

    return {
        initialize: initialize,
        initializeTypeAhead: initializeTypeAhead,
        setOptions: setOptions
    };
}();

$(function () {
    var descUnirii = '<p><b>Piața Unirii</b> (<small>Romanian pronunciation:&nbsp;</small><span title="Representation in the International Phonetic Alphabet (IPA)" class="IPA"><a href="http://en.wikipedia.org/wiki/Help:IPA_for_Romanian" title="Help:IPA for Romanian">[ˈpjat͡sa uˈnirij]</a></span>; <i>Unification Square</i> or <i>Union Square</i> in English) is one of the largest squares in central <a href="http://en.wikipedia.org/wiki/Bucharest" title="Bucharest">Bucharest</a>, located in the center of the city where Sectors 1, 2, 3, and 4 meet. </p>';
    var descVictoriei = '<p><b>Victory Square</b> (<a href="http://en.wikipedia.org/wiki/Romanian_language" title="Romanian language">Romanian</a>: <span lang="ro" xml:lang="ro"><i>Piaţa Victoriei</i></span>) is a major intersection in central <a href="http://en.wikipedia.org/wiki/Bucharest" title="Bucharest">Bucharest</a>. It is known for its proximity to major office towers and government buildings.</p>';
    var opt = {
        street: $("#street"),
        title: $("#title"),
        details: $("#details"),
        divMap: $('#divMap')[0],
        divCoords: $('#divCoords'),
        markers:
            [{ title: "Unirii square", description: descUnirii, location: { lat: 44.424149, lng: 26.103773 } },
             { title: "Victoriei square", description: descVictoriei, location: { lat: 44.453749, lng: 26.091821 } }]
    };
    maps.setOptions(opt);
    //maps.initialize();
    google.maps.event.addDomListener(window, 'load', maps.initialize);
    maps.initializeTypeAhead();
});