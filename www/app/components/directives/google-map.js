'use strict';

/**
 * @ngdoc directive
 * @name m2mAngularShellApp.directive:gglMap
 * @description
 * # gglMap
 * depends on http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclustererplus/2.1.2/docs/reference.html
 * for clustering.
 */
angular.module('google.map', [])
    .directive('gglMap', function () {
        return {
            restrict: "E",
            replace: true,
            template: "<div></div>",
            scope: {
                center: "=",            // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
                markers: "=",           // Array of map markers (e.g. <code>[{ latitude: 10, longitude: 10, title: "hello" }]</code>).
                clusterOptions: "=",
                width: "@",             // Map width in pixels.
                height: "@",            // Map height in pixels.
                zoom: "@",              // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
                mapTypeId: "@",         // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
                panControl: "@",        // Whether to show a pan control on the map.
                zoomControl: "@",       // Whether to show a zoom control on the map.
                scaleControl: "@"       // Whether to show scale control on the map.
            },
            link: function (scope, element, attrs) {
                var toCenter;
                var map;
                var currentMarkers;

                // listen to changes in scope variables and update the control
                var scopeVariableArray = [
                    "width", "height", "markers", "mapTypeId", "panControl", "zoomControl", "scaleControl"
                ];

                for (var i = 0, arrayCount = scopeVariableArray.length; i < scopeVariableArray.length; i++) {
                    scope.$watch(scopeVariableArray[i], function () {
                        arrayCount--;
                        if (arrayCount <= 0) {
                            updateControl();
                        }
                    });
                }

                // update zoom and center without re-creating the map
                scope.$watch("zoom", function () {
                    if (map && scope.zoom)
                        map.setZoom(scope.zoom * 1);
                });

                scope.$watch("center", function () {
                    if (map && scope.center)
                        map.setCenter(getLocation(scope.center));
                });

                // update the control
                function updateControl() {
                    // update size
                    if (scope.width) element.width(scope.width);
                    if (scope.height) element.height(scope.height);

                    // Set default map options
                    var options =
                    {
                        center: new google.maps.LatLng(0, 0),
                        zoom: 1,
                        mapTypeId: "roadmap"
                    };

                    if (scope.center) options.center = getLocation(scope.center);
                    if (scope.zoom) options.zoom = scope.zoom * 1;
                    if (scope.mapTypeId) options.mapTypeId = scope.mapTypeId;
                    if (scope.panControl) options.panControl = scope.panControl;
                    if (scope.zoomControl) options.zoomControl = scope.zoomControl;
                    if (scope.scaleControl) options.scaleControl = scope.scaleControl;

                    // create the map
                    map = new google.maps.Map(element[0], options);

                    // If cluster options are defined...
                    if(scope.clusterOptions){
                        // Marker cluster options.
                        var markerClustererOptions = {
                            maxZoom: scope.clusterOptions.maxZoom, // Default is null
                            gridSize: scope.clusterOptions.gridSize // Default is 60
                        };

                        // Marker clusterer.
                        scope.markerCluster = new MarkerClusterer(
                            map, null, markerClustererOptions
                        );
                    }

                    // update markers
                    updateMarkers();

                    // listen to changes in the center property and update the scope
                    google.maps.event.addListener(map, 'center_changed', function () {
                        // do not update while the user pans or zooms
                        if (toCenter) clearTimeout(toCenter);
                        toCenter = setTimeout(function () {
                            if (scope.center) {

                                // check if the center has really changed
                                if (map.center.lat() != scope.center.latitude ||
                                    map.center.lng() != scope.center.longitude) {

                                    // update the scope and apply the change
                                    scope.center = {
                                        latitude: map.center.lat(), longitude: map.center.lng()
                                    };

                                    if (!scope.$$phase) scope.$apply("center");
                                }
                            }
                        }, 500);
                    });
                }

                // update map markers to match scope marker collection
                function updateMarkers() {
                    if (map && scope.markers) {

                        // clear old markers
                        if (currentMarkers != null) {
                            for (var i = 0; i < currentMarkers.length; i++) {
                                currentMarkers[i] = marker.setMap(null);
                            }
                        }

                        // create new markers
                        currentMarkers = [];
                        var markers = scope.markers;
                        if (angular.isString(markers)) markers = scope.$eval(scope.markers);

                        for (var i = 0; i < markers.length; i++) {
                            var marker = markers[i];
                            var location = new google.maps.LatLng(marker.latitude, marker.longitude);
                            var mapMarker = new google.maps.Marker({ position: location, map: map, title: marker.title });
                            currentMarkers.push(mapMarker);

                            //Check to see if marker clusters should be displayed - or not...
                            if(scope.clusterOptions)
                                scope.markerCluster.addMarker(mapMarker, true);
                        }
                    }
                }

                // convert current location to Google maps location
                function getLocation(location) {
                    if (location == null) return new google.maps.LatLng(0, 0);
                    if (angular.isString(location)) location = scope.$eval(location);
                    return new google.maps.LatLng(location.latitude, location.longitude);
                }
            }
        };
    })
;