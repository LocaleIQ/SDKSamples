//***************************************************************************//
//  LocaleIQ Corporation - LocaleIQ Geographic Tools version 1.0             //
//  Copyright LocaleIQ Corporation                                           //
//  LocaleIQ Corporation Morgan Hill CA 95037                                //
//  Release Date: 01/29/2019                                                 //
//  Author: Tom Landers                                                      //
//***************************************************************************//

// PRE-DEFINED MOBILITY LAYERS
var LayerRoads, LayerBusRoutes, LayerBusStops, LayerBusRealtime, LayerBikeShareStations, LayerBikeSharePayStations, LayerBikeShareBikes, LayerTrainRoutes, LayerTrolleyRoutes, LayerTrollies,
    LayerTrains, LayerAirports, LayerAirplanes, LayerCommercialVehicles, LayerPublicSafetyVehicles, LayerParkingLots, LayerParkingSpaces, LayerMeteredSpaces,
    LayerFerryRoutes, LayerFerries, LayerScooterShares, LayerMotorScooterShares, LayerPedestrian, LayerMobilityAlerts, LayerMobilityClosures, LayerMobilityInformation;

var infoboxBusStopTemplate = '<div style="width:300px;height:135px;background-color:#ebebeb;border:1pt solid #262216;border-radius:6px;display:table;">';
infoboxBusStopTemplate += '<div style= "float:left;width:30%;height:100%;margin:0;border-right:1pt solid #ccc;display:table-cell">';
infoboxBusStopTemplate += '<table style="width:100%;">';
infoboxBusStopTemplate += '<tr><td style="text-align:center;"><div style="width:60px;height:60px;margin:15px auto;background:#1b75bb;border-radius:50%;line-height:60px;color:#fff;text-align:center;font-size:20px;">[STOPID]</div></td></tr>';
infoboxBusStopTemplate += '<tr><td style="text-align:center;font-size:10pt;">Bus Route</td></tr>';
infoboxBusStopTemplate += '</table></div >';
infoboxBusStopTemplate += '<div style="float:right;width:60%;height:100%;margin:0;display:table-cell">';
infoboxBusStopTemplate += '<table style="width:100%;">';
infoboxBusStopTemplate += '<tr><td style="text-align:right;padding:3px;"><img src="http://www.localeiq.com/Common/images/btns/close.png" height="15" onclick="closeInfobox();" /></td></tr>';
infoboxBusStopTemplate += '<tr><td><div style="width:90%;height:30px;background-color:#262216;color:orange;font-size:11pt;line-height:30px;border-radius:5pt;text-align:center;">[STOPNAME]</div></td></tr>';
infoboxBusStopTemplate += '<tr><td style="font-size:8pt;padding:10px;"><span style="font-weight:600;">Route:</span>&nbsp;<i class="fa fa-clock"></i>&nbsp;<a href="#">see schedule</a><p /><span style="font-size:8pt;">[STOPDESC]</span></td></tr>';
infoboxBusStopTemplate += '</table></div></div >';

// LOAD MOBILITY DATA
var LIQMobility = {
    getDirections: function (LocationFrom, FromType, LocationTo, ToType, mode, outputPanel) { getDirections(LocationFrom, FromType, LocationTo, ToType, mode, pnl) },
    getRoads: '',
    getRoadConditions: '',
    getBusRoutes: function (url, chk) { getTransitRoutes(url, chk); }, 
    getBusStops: function (url, chk) { getTransitStops(url, chk); }, 
    getBusRealtime: '', 
    getBikeShareStations: function (url, chk) { getBikeShareStations(url, chk); }, 
    getBikeSharePayStations: '', 
    getBikeShareBikes: function (url, chk) { getBikeShareBikesOut(url, chk); }, 
    getTrains: '',
    getTrainRoutes: '', 
    getTrolleyRoutes: '', 
    getTrollies: '',  
    getAirports: '', 
    getAirplanes: '', 
    getCommercialVehicles: '', 
    getPublicSafetyVehicles: '', 
    getParkingLots: function (url, chk) { getParkingStructures(url, chk); }, 
    getParkingSpaces: '', 
    getMeteredSpaces: function (url, chk) { getParkingMeters(url, chk); },
    getFerryRoutes: '', 
    getFerries: '', 
    getScooterShares: '', 
    getMotorScooterShares: '', 
    getPedestrian: '', 
    getMobilityAlerts: '', 
    getMobilityClosures: '', 
    getMobilityInformation: ''
};

// GBSF PARSER
function getBikeShareStations(url, chk) {
    if (LayerBikeShareStations instanceof Microsoft.Maps.Layer && !chk) {
        LayerBikeShareStations.setVisible(false);
    }
    if (LayerBikeShareStations instanceof Microsoft.Maps.Layer && chk) {
        LayerBikeShareStations.setVisible(true);
    }
    if (typeof LayerBikeShareStations === 'undefined' || LayerBikeShareStations === null) {
        $.ajax({ url: url, dataType: "json", success: BikeShareStionNavigator, error: function () { alert('error'); } });
    }
}
function BikeShareStionNavigator(jsonData) {
   // document.getElementById('openModal').style.opacity = '1';
    var currIcon = '/hosted/iconlibrary/mobilityicons/icon-breeze-station.png';
    LayerBikeShareStations = new Microsoft.Maps.Layer('BikeStationLayer');
    jsonData.data.stations.forEach(function (item) {
        currLoc = new Microsoft.Maps.Location(item.lat, item.lon);
        currPin = new Microsoft.Maps.Pushpin(currLoc, { icon: currIcon, draggable: false, anchor: new Microsoft.Maps.Point(12, 12) });

        currPin.metadata = {
            title: item.station_id,
            description: item.name,
            address: item.address
        }

        LayerBikeShareStations.add(currPin);
        LayerBikeShareStations.setZIndex(10);
        Microsoft.Maps.Events.addHandler(currPin, 'click', function (args) { BikeShareDisplayInfobox(args); });
    });
    map.layers.insert(LayerBikeShareStations);  
    if (CustomerLayer.length > 0) { CustomerLayer.setZIndex(3000); }
    if (EntityLayer.length > 0) { EntityLayer.setZIndex(3001); }
}
function getBikeShareBikesOut(url, chk) {
    if (LayerBikeShareBikes instanceof Microsoft.Maps.Layer && !chk) {
        LayerBikeShareBikes.setVisible(false);
    }
    if (LayerBikeShareBikes instanceof Microsoft.Maps.Layer && chk) {
        LayerBikeShareBikes.setVisible(true);
    }
    if (typeof LayerBikeShareBikes === 'undefined' || LayerBikeShareBikes === null) {
        $.ajax({ url: url, dataType: "json", success: BikeShareBikesOutNavigator, error: function () { alert('error'); } });
    }
}
function BikeShareBikesOutNavigator(jsonData) {
    var currIcon = '/hosted/iconlibrary/mobilityicons/icon-breeze-bike-out.png';
    LayerBikeShareBikes = new Microsoft.Maps.Layer('BikeShareBikesOutLayer');
    jsonData.data.bikes.forEach(function (item) {
        currLoc = new Microsoft.Maps.Location(item.lat, item.lon);
        currPin = new Microsoft.Maps.Pushpin(currLoc, { icon: currIcon, draggable: false, anchor: new Microsoft.Maps.Point(12, 12) });

        currPin.metadata = {
            title: item.bike_id,
            description: item.name,
            isReserved: item.is_reserved
        }

        LayerBikeShareBikes.add(currPin);
        LayerBikeShareBikes.setZIndex(10);
        Microsoft.Maps.Events.addHandler(currPin, 'click', function (args) { BikeShareDisplayInfobox(args); });
    });
    map.layers.insert(LayerBikeShareBikes);
    if (CustomerLayer.length > 0) { CustomerLayer.setZIndex(3000); }
    if (EntityLayer.length > 0) { EntityLayer.setZIndex(3001); }
    
}
function BikeShareDisplayInfobox(e) {
    if (e.target.metadata) {
        var title = '';
        var description = '<div><strong>' + e.target.metadata.title + '</strong><p> ' + e.target.metadata.description + '</p></div>';

        infobox.setOptions({
            location: e.target.getLocation(),
            htmlContent: infoboxTemplate.replace('{description}', description),
            visible: true
        });
    }
}

// GTSF PARSER
function getTransitStops(url, chk) {
    if (LayerBusStops instanceof Microsoft.Maps.Layer && !chk) {
        LayerBusStops.setVisible(false);
    }
    if (LayerBusStops instanceof Microsoft.Maps.Layer && chk) {
        LayerBusStops.setVisible(true);
    }
    if (typeof LayerBusStops === 'undefined' || LayerBusStops === null) {
        $.ajax({ url: url, dataType: "json", success: TransitStopNavigator, error: function () { alert('error'); } });
    }
}
function TransitStopNavigator(jsonData) {
    var currIcon = '/hosted/iconlibrary/mobilityicons/icon-bus-stop.png';
    LayerBusStops = new Microsoft.Maps.Layer('BusStopsLayer');
    jsonData.features.forEach(function (item) {
        currLoc = new Microsoft.Maps.Location(item.geometry.coordinates[1],item.geometry.coordinates[0]);
        currPin = new Microsoft.Maps.Pushpin(currLoc, { icon: currIcon, draggable: false, anchor: new Microsoft.Maps.Point(12, 12) });

        currPin.metadata = {
            stopID: item.properties.stop_id,
            stopName: item.properties.stop_name,
            stopDesc: item.properties.stop_desc
        }

        LayerBusStops.add(currPin);
        LayerBusStops.setZIndex(10);
        Microsoft.Maps.Events.addHandler(currPin, 'click', function (args) { TransitStopsDisplayInfobox(args); });
    });
    map.layers.insert(LayerBusStops);
    if (CustomerLayer.length > 0) { CustomerLayer.setZIndex(3000); }
    if (EntityLayer.length > 0) { EntityLayer.setZIndex(3001); }
    
}
function TransitStopsDisplayInfobox(e) {
    if (e.target.metadata) {
        var headSign = e.target.metadata.stopName.substring(0, 8) + '...';
        infobox.setOptions({
            location: e.target.getLocation(),
            htmlContent: infoboxBusStopTemplate.replace('[STOPID]', e.target.metadata.stopID).replace('[STOPNAME]', headSign).replace('[STOPDESC]', e.target.metadata.stopDesc),
            visible: true
        });
    }
}
function getTransitRoutes(url, chk) {
    if (LayerBusRoutes instanceof Microsoft.Maps.Layer && !chk) {
        LayerBusRoutes.setVisible(false);
    }
    if (LayerBusRoutes instanceof Microsoft.Maps.Layer && chk) {
        LayerBusRoutes.setVisible(true);
    }
    if (typeof LayerBusRoutes === 'undefined' || LayerBusRoutes === null) {
        $.ajax({ url: url, dataType: "json", success: TransitRoutesNavigator, error: function () { alert('error'); } });
    }
}
function TransitRoutesNavigator(jsonData) {
    LayerBusRoutes = new Microsoft.Maps.Layer('BusRoutesLayer');
    jsonData.features.forEach(function (item) {
        currStrokeColor = '#' + item.properties.route_color;
        var coords = [];

        for (var i = 0; i < item.geometry.coordinates.length; i++) {   
            try {
                coords.push(new Microsoft.Maps.Location(parseFloat(item.geometry.coordinates[i][1]), parseFloat(item.geometry.coordinates[i][0])));
            } catch (err) { }
        }

        var polylineOptions = { strokeColor: new Microsoft.Maps.Color.fromHex(currStrokeColor), strokeThickness: 2, strokeDashArray: '1 0 1 0' };
        currLine = new Microsoft.Maps.Polyline(coords, polylineOptions);

        currLine.metadata = {
            headSign: item.properties.trip_headsign,
            tripName: item.properties.route_long_name,
            tripShortName: item.properties.route_short_name,
            direction: item.properties.direction_id
        }

        LayerBusRoutes.add(currLine);
        //LayerBusRoutes.setZIndex(10);
        Microsoft.Maps.Events.addHandler(currLine, 'click', function (args) { TransitRouteDisplayInfobox(args); });
        });
    map.layers.insert(LayerBusRoutes); 
    //if (CustomerLayer.length > 0) { CustomerLayer.setZIndex(3000); }
    //if (EntityLayer.length > 0) { EntityLayer.setZIndex(3001); }
}
function TransitRouteDisplayInfobox(e) {
    if (e.target.metadata) {
        alert(e.target.metadata.headSign + ': ' + e.target.metadata.tripName);
    }
}

// PARKING DATA
function getParkingStructures(xmlUrl, chk) {
    if (LayerParkingLots instanceof Microsoft.Maps.Layer && !chk) {
        LayerParkingLots.setVisible(false);
    }
    if (LayerParkingLots instanceof Microsoft.Maps.Layer && chk) {
        LayerParkingLots.setVisible(true);
    }
    if (typeof LayerParkingLots === 'undefined' || LayerParkingLots === null) {
        $.ajax({ url: xmlUrl, dataType: "xml", success: ParkingStructuresNavigator, error: function () { alert('error'); } });
    }
}
function ParkingStructuresNavigator(xml) {
    
    LayerParkingLots = new Microsoft.Maps.Layer('ParkingLots');
    $(xml).find("lot").each(function () {
        var lotID = $(this).find('id').text();
        var availableSpaces = $(this).find('available_spaces').text();
        var lotname = $(this).find('name').text();
        var lotdesc = $(this).find('description').text();
        var lotaddress = $(this).find('street_address').text();
        var lotzipcode = $(this).find('zip_code').text();
        var latitude = $(this).find('latitude').text();
        var longitude = $(this).find('longitude').text();
        var currIcon = '/hosted/iconlibrary/mobilityicons/icon-parking-available.png';
        currLoc = new Microsoft.Maps.Location(latitude, longitude);
        currPin = new Microsoft.Maps.Pushpin(currLoc, { icon: currIcon, width: 18, height: 18, draggable: false, anchor: new Microsoft.Maps.Point(37, 37) });

        currPin.metadata = {
            LotID: lotID,
            LotSpaces: availableSpaces,
            LotName: lotname
        }

        LayerParkingLots.add(currPin);
        LayerParkingLots.setZIndex(10);
        Microsoft.Maps.Events.addHandler(currPin, 'click', function (args) { ParkingLotsDisplayInfobox(args); });
    });
    map.layers.insert(LayerParkingLots);
    if (CustomerLayer.length > 0) { CustomerLayer.setZIndex(3000); }
    if (EntityLayer.length > 0) { EntityLayer.setZIndex(3001); }
}
function ParkingLotsDisplayInfobox(e) {
    if (e.target.metadata) {
        var title = '';
        var description = '<div><strong>' + e.target.metadata.LotName + '</strong><p>Available Spaces: ' + e.target.metadata.LotSpaces + '</p></div>';

        infobox.setOptions({
            location: e.target.getLocation(),
            htmlContent: infoboxTemplate.replace('{description}', description),
            visible: true
        });
    }
}
function getParkingMeters(xmlUrl, chk) {
    if (LayerMeteredSpaces instanceof Microsoft.Maps.Layer && !chk) {
        LayerMeteredSpaces.setVisible(false);
    }
    if (LayerMeteredSpaces instanceof Microsoft.Maps.Layer && chk) {
        LayerMeteredSpaces.setVisible(true);
    }
    if (typeof LayerMeteredSpaces === 'undefined' || LayerMeteredSpaces === null) {
        $.ajax({ url: xmlUrl, dataType: "xml", success: ParkingMetersNavigator, error: function () { alert('error'); } });
    }
}
function ParkingMetersNavigator(xml) {
    LayerMeteredSpaces = new Microsoft.Maps.Layer('ParkingMeters');
    $(xml).find("metered_space").each(function () {
        var meterID = $(this).find('meter_id').text();
        var isActive = $(this).find('active').text();
        var meterArea = $(this).find('area').text();
        var meterAddress = $(this).find('street_address').text();
        var latitude = $(this).find('latitude').text();
        var longitude = $(this).find('longitude').text();

        var currIcon = '/hosted/iconlibrary/mobilityicons/icon-parking-available.png';
        if (isActive == 'false') {
            var currIcon = '/hosted/iconlibrary/mobilityicons/icon-parking-unavailable.png';
        }

        currLoc = new Microsoft.Maps.Location(latitude, longitude);
        currPin = new Microsoft.Maps.Pushpin(currLoc, { icon: currIcon, width: 70, height: 70, draggable: false, anchor: new Microsoft.Maps.Point(37, 37) });

        currPin.metadata = {
            MeterID: meterID,
            MeterArea: meterArea,
            MeterAddress: meterAddress
        }

        LayerMeteredSpaces.add(currPin);
        LayerMeteredSpaces.setZIndex(10);
        Microsoft.Maps.Events.addHandler(currPin, 'click', function (args) { ParkingMetersDisplayInfobox(args); });
    });
    map.layers.insert(LayerMeteredSpaces);
    if (CustomerLayer.length > 0) { CustomerLayer.setZIndex(3000); }
    if (EntityLayer.length > 0) { EntityLayer.setZIndex(3001); }
}
function ParkingMetersDisplayInfobox(e) {
    if (e.target.metadata) {
        var title = '';
        var description = '<div><strong>' + e.target.metadata.MeterArea + '</strong><p> ' + e.target.metadata.MeterAddress + '</p></div>';

        infobox.setOptions({
            location: e.target.getLocation(),
            htmlContent: infoboxTemplate.replace('{description}', description),
            visible: true
        });

    }
}

// DIRECTIONS
function displayNavigationTo(mode) {
    NavMode = mode;
    document.getElementById('FromAddress').value = '';
    document.getElementById('ToAddress').value = document.getElementById('PnlAddress').innerText;
    displayMenu('MenuNavigation');
}
function updateDirectionsMode(mode) {
    NavMode = mode;
    getDirections();
}
function getDirections() {
    directionsManager.clearAll();
    directionsManager.clearDisplay();
    switch (NavMode) {
        case 'driving':
            directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
            break;
        case 'transit':
            directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.transit });
            break;
        case 'walking':
            directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.walking });
    }      
    var start = new Microsoft.Maps.Directions.Waypoint({ address: document.getElementById('FromAddress').value });
    directionsManager.addWaypoint(start);
    var end = new Microsoft.Maps.Directions.Waypoint({ address: document.getElementById('ToAddress').value });
    directionsManager.addWaypoint(end);
    directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('PnlItinerary') });
    directionsManager.calculateDirections();
    displayPanel('PnlNavigation', 'infoboxLeft');
    document.getElementById('MenuIconNav').className = '';
}       
function directionsUpdated(e) {
    //Get the current route index.
    var routeIdx = directionsManager.getRequestOptions().routeIndex;
    //Get the distance of the route, rounded to 2 decimal places.
    var distance = Math.round(e.routeSummary[routeIdx].distance * 100) / 100;
    //Get the distance units used to calculate the route.
    var units = directionsManager.getRequestOptions().distanceUnit;
    var distanceUnits = '';
    if (units == Microsoft.Maps.Directions.DistanceUnit.km) {
        distanceUnits = 'km'
    } else {
        //Must be in miles
        distanceUnits = 'miles'
    }
    //Time is in seconds, convert to minutes and round off.
    var time = Math.round(e.routeSummary[routeIdx].timeWithTraffic / 60);
    document.getElementById('routeInfoPanel').innerHTML = 'Distance: ' + distance + ' ' + distanceUnits + '<br/>Time with Traffic: ' + time + ' minutes';
}
function directionsError(e) {
    alert('Error: ' + e.message + '\r\nResponse Code: ' + e.responseCode)
}
function clearDirections() {
    document.getElementById('FromAddress').value;
    address: document.getElementById('ToAddress').value;
    directionsManager.clearAll();
    directionsManager.clearDisplay();
    displayMenu('MenuMain');
    displayPanel('PnlNavigation', 'hideElement');
    document.getElementById('MenuIconNav').className = 'hideElement';
    document.getElementById('BtnMainMenu').className = "fa fa-navicon";
    document.getElementById('BtnMainMenu').setAttribute('onclick', 'displayMenu("MenuMain");');
}

// LOG MOBILITY ANALYTICS
function LogLocation(lat, lon, elevation, speed, mode, vehicleType, passengers) {
    // DO SOMETHING
}
function LogLayers(lyr) {

}

// HELPERS
function closeInfobox() {
    infobox.setOptions({ visible: false });
}