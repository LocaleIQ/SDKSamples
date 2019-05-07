//***************************************************************************//
//  LocaleIQ Corporation - LocaleIQ Geographic Tools version 1.0             //
//  Copyright LocaleIQ Corporation                                           //
//  LocaleIQ Corporation Morgan Hill CA 95037                                //
//  Release Date: 01/29/2019                                                 //
//  Author: Tom Landers                                                      //
//***************************************************************************//

// Local
var mapType, isSearch = false, _allPoints = [], start_time = new Date().getTime(), myPin, myPinAccuracy, isAccuracy = false, curLat, curLon, _zoom = 12, iLocs = 0, currEntityID, currSectorID, currCustID, infobox;
var tooltipTemplate = '<div style="background-color:#6d6e70;height:20px;width:150px;padding:5px;text-align:center"><b>{title}</b></div>';

// SEARCH AND FILTER
var qs = '', _filters = [], _activities = [], _amenities = [], _sectors = [], _features = [], _subFeatures = [], _media = [], _rules = [],
    _conditions = [], alerts = [], closures = [], accommodation_type = [], sale_type = [], _winevarietals = [], _cuisines = [],
    _employmentType = [], _employmentCategory = [], _employmentStage = [], _employmentFunding = [],
    _jobType = [], _locRect = [];

// LAYERS
var LayerHome, LayerEntity, LayerSector, LayerCategory, LayerEvent, LayerSearch, LayerProject, LayerAlert, LayerClosure; 

var LocaleIQ = {
    getCustomerMap: function (cid) { isSearch = false; mapType = 'Customer/';getMap(oLnIQMapAPIPublic + mapType + cid); },
    getSectorMap: function (sid) { isSearch = false; mapalertType = 'Sector/'; getMap(oLnIQMapAPIPublic + mapType + projid); },
    getEntityMap: function (sid, eid) { isSearch = false;currEntityID = eid;currSectorID = sid;mapType = 'Entity/';_zoom = 18;getMap(oLnIQMapAPIPublic + mapType + sid + '/' + eid);},
    getCategoryMap: function (catid) { isSearch = false; mapType = 'Category/'; getMap(oLnIQMapAPIPublic + mapType + catid + qs); },
    getEventMap: function (eventid) { isSearch = false; mapType = 'Event/'; getMap(oLnIQMapAPIPublic + mapType + eventid); },
    getSearchMap: function () { isSearch = true; mapType = 'Customer/'; getMap(oLnIQMapAPIPublic + mapType + '92' + qs); },
    getProjectMap: function (projid) { isSearch = false; mapType = 'Project/'; getMap(oLnIQMapAPIPublic + mapType + projid); }
};

function getMap(url) {
    $.ajax({
        url: url,
        dataType: "xml",
        success: geoNavigator,
        error: function () { }
    });
}
function geoNavigator(xml) {
    
    // DEFAULT OBJECTS  & STYLES
    var centerLoc, currLoc, currPin, coords, currLine, currShape, currIcon, rColor = 162, gColor = 12, bColor = 218, strokeWidth = 2, strokeDash = '1 1 1 1',
        rFill = 251, gFill = 197, bFill = 81, fillOpacity = 100, lineOpacity = 200, currInfobox, Inventory;
    
    _allPoints = [];
    iLocs = $(xml).find('item').size();

    if (iLocs >= 2) {
        map.entities.clear();
        var iCount = 0;
        $(xml).find("item").each(function () {
            var shapeId = $(this).find('shapeId').text();
            var shapeTypeId = $(this).find('shapeTypeId').text();
            var solutionId = $(this).find('solutionId').text();
            var industryId = $(this).find('industryId').text();
            var featureId = $(this).find('featureId').text();
            var entityId = $(this).find('eid').text();
            var title = $(this).find('shapeid').text();
            var stitle = $(this).find('title').text();
            var descr = $(this).find('description').text();
            var currIcon = $(this).find('icon').text();
            var currIconWidth = $(this).find('icon_width').text();
            var currIconHeight = $(this).find('icon_height').text();
            var currClass = $(this).find('class').text();
            var latitude = $(this).find('geo\\:lat, lat').text();
            var longitude = $(this).find('geo\\:lon, lon').text();
            var centroidLat = $(this).find('centroidLat').text();
            var centroidLon = $(this).find('centroidLon').text();
            var coordinates = $(this).find('geo\\:line, line').text();
            var shapecoords = $(this).find('geo\\:polygon, polygon').text();
            var shapeType = $(this).find('shape').text();
            var sWidth = $(this).find('strokeWidth').text();
            var sColor = $(this).find('strokeColor').text();
            var sOpacity = $(this).find('strokeOpacity').text();
            var sArray = $(this).find('strokeDashArray').text();
            var fColor = $(this).find('fillColor').text();
            var fOpacity = $(this).find('fillOpacity').text();


            if (shapeType == 'Pushpin' || shapeType == 'Centroid') {
                if (latitude != null && longitude != null) {
                    curLat = latitude;
                    curLon = longitude;
                    currLoc = new Microsoft.Maps.Location(latitude, longitude);
                    if (currIcon.trim() != '') {
                        currPin = new Microsoft.Maps.Pushpin(currLoc, { icon: currIcon, draggable: false, anchor: new Microsoft.Maps.Point(22.5, 73) });
                    }
                    else {
                        currPin = new Microsoft.Maps.Pushpin(currLoc, { icon: currIcon, draggable: false });
                    }
                                
                    var entity_id;
                    _allPoints.push(currLoc);
                    currPin.metadata = {
                        title: stitle,
                        description: descr,
                        info_theme: 'infoboxLeft',
                        hover_theme: '',
                        click_theme: '',
                        spatial_id: shapeId,
                        industry_id: industryId,
                        feature_id: featureId,
                        entity_id: entityId,
                        on_hover: 'LoadToolTip',
                        on_click: 'LoadContent',
                        on_rightclk: '',
                        zoomRange: { min: 1, max: 15 }
                    };

                    map.entities.push(currPin);

                    Microsoft.Maps.Events.addHandler(currPin, 'mouseover', onItemHover);
                    Microsoft.Maps.Events.addHandler(currPin, 'mouseout', onItemHoverOut);
                    Microsoft.Maps.Events.addHandler(currPin, 'click', function (args) { onItemClick(args); });
                }
            }
            if (shapeType == 'Imagepin') {
                if (latitude != null && longitude != null) {
                    curLat = latitude;
                    curLon = longitude;
                    currLoc = new Microsoft.Maps.Location(latitude, longitude);
                    currPin = new Microsoft.Maps.Pushpin(currLoc, { icon: currIcon, width: 40, height: 40, draggable: false, typeName: 'imagePin' });

                    _allPoints.push(currLoc);
                    currPin.metadata = {
                        title: stitle,
                        description: descr,
                        info_theme: 'infoboxLeft',
                        hover_theme: '',
                        click_theme: '',
                        spatial_id: shapeId,
                        industry_id: industryId,
                        feature_id: featureId,
                        entity_id: entityId,
                        on_hover: 'LoadToolTip',
                        on_click: 'LoadContent',
                        on_rightclk: '',
                        zoomRange: { min: 1, max: 15 }
                    };

                    map.entities.push(currPin);

                    Microsoft.Maps.Events.addHandler(currPin, 'mouseover', onItemHover);
                    Microsoft.Maps.Events.addHandler(currPin, 'mouseout', onItemHoverOut);
                    Microsoft.Maps.Events.addHandler(currPin, 'click', function (args) { onItemClick(args); });
                }
            }
            if (shapeType == 'Labelpin') {
                if (latitude != null && longitude != null) {
                    curLat = latitude;
                    curLon = longitude;
                    currLoc = new Microsoft.Maps.Location(latitude, longitude);
                    currPin = new Microsoft.Maps.Pushpin(currLoc, { width: 150, text: stitle, draggable: false, typeName: currClass });

                    _allPoints.push(currLoc);
                    currPin.metadata = {
                        title: stitle,
                        description: descr,
                        info_theme: 'infoboxLeft',
                        hover_theme: '',
                        click_theme: '',
                        spatial_id: shapeId,
                        industry_id: industryId,
                        feature_id: featureId,
                        entity_id: entityId,
                        on_hover: 'LoadToolTip',
                        on_click: 'LoadContent',
                        on_rightclk: '',
                        zoomRange: { min: 1, max: 15 }
                    };

                    map.entities.push(currPin);

                    Microsoft.Maps.Events.addHandler(currPin, 'mouseover', onItemHover);
                    Microsoft.Maps.Events.addHandler(currPin, 'mouseout', onItemHoverOut);
                    Microsoft.Maps.Events.addHandler(currPin, 'click', function (args) { onItemClick(args); });
                }
            }
            if (shapeType == 'Polyline') {
                try {
                    if (sWidth.length != null) { strokeWidth = sWidth; }
                    if (sArray.length != null) { strokeDash = sArray; }
                    if (sOpacity.length != null) { lineOpacity = sOpacity; }
                    if (sColor.length != null) {
                        var color = sColor.split(',');
                        rColor = color[0];
                        gColor = color[1];
                        bColor = color[2];
                    }

                    var currCoords = coordinates.split(' ');
                    var currCoord = currCoords[0].split(',');
                    curLat = currCoord[1];
                    curLon = currCoord[0];
                    currLoc = new Microsoft.Maps.Location(curLat, curLon);
                    _allPoints.push(currLoc);

                    coords = parseCoords(coordinates, 2);
                    var polylineOptions = { strokeColor: new Microsoft.Maps.Color(lineOpacity, rColor, gColor, bColor), strokeThickness: strokeWidth, strokeDashArray: strokeDash };
                    currLine = new Microsoft.Maps.Polyline(coords, polylineOptions);

                    currLine.metadata = {
                        title: stitle,
                        description: descr,
                        info_theme: 'infoboxLeft',
                        hover_theme: '',
                        click_theme: '',
                        spatial_id: shapeId,
                        industry_id: industryId,
                        feature_id: featureId,
                        entity_id: entityId,
                        on_hover: 'LoadToolTip',
                        on_click: 'LoadContent',
                        on_rightclk: '',
                        zoomRange: { min: 1, max: 15 }
                    };

                    map.entities.push(currLine);

                    Microsoft.Maps.Events.addHandler(currLine, 'mouseover', onItemHover);
                    Microsoft.Maps.Events.addHandler(currLine, 'mouseout', onItemHoverOut);
                    Microsoft.Maps.Events.addHandler(currLine, 'click', function (args) { onItemClick(args); });
                }
                catch (err) { }
            }
            if (shapeType == 'Polygon' || shapeType == 'Radius' || shapeType == 'Rectangle') {
                try {
                    if (fOpacity != '') { fillOpacity = parseInt(fOpacity); }
                    if (sWidth != '') { strokeWidth = sWidth; }
                    if (sArray != '') { strokeDash = sArray; }
                    if (sWidth != '') { strokeWidth = sWidth; }
                    if (sArray != '') { strokeDash = sArray; }
                    if (sColor != null) {
                        var color = sColor.split(',');
                        rColor = color[0];
                        gColor = color[1];
                        bColor = color[2];
                    }

                    if (fColor != null) {
                        var fillcolor = fColor.split(',');
                        rFill = fillcolor[0];
                        gFill = fillcolor[1];
                        bFill = fillcolor[2];
                    }

                    var currCoords = shapecoords.split(' ');
                    var currCoord = currCoords[0].split(',');
                    curLat = currCoord[1];
                    curLon = currCoord[0];

                    currLoc = new Microsoft.Maps.Location(curLat, curLon);
                    _allPoints.push(currLoc);
                    coords = parseCoords(shapecoords, 2);

                    var polygonOptions = { fillColor: new Microsoft.Maps.Color(fillOpacity, rFill, gFill, bFill), strokeColor: new Microsoft.Maps.Color(lineOpacity, rColor, gColor, bColor), strokeThickness: strokeWidth };
                    currShape = new Microsoft.Maps.Polygon(coords, polygonOptions);
                    currShape.metadata = {
                        title: stitle,
                        description: descr,
                        info_theme: 'infoboxLeft',
                        hover_theme: '',
                        click_theme: '',
                        spatial_id: shapeId,
                        industry_id: industryId,
                        feature_id: featureId,
                        entity_id: entityId,
                        on_hover: 'LoadToolTip',
                        on_click: 'LoadContent',
                        on_rightclk: '',
                        zoomRange: { min: 1, max: 15 }
                    };
                    map.entities.push(currShape);

                    Microsoft.Maps.Events.addHandler(currShape, 'mouseover', onItemHover);
                    Microsoft.Maps.Events.addHandler(currShape, 'mouseout', onItemHoverOut);
                    Microsoft.Maps.Events.addHandler(currShape, 'click', function (args) { onItemClick(args); });
                }
                catch (err) { }
            }
        });

        if ($(xml).find('item').size() >= 0) {
            if (_allPoints.length >= 0) {
                var _bounds = new Microsoft.Maps.LocationRect.fromLocations(_allPoints);
                map.setView({ bounds: _bounds, animate: true });
            }
        }
    }
    _allPoints.pop();
    var request_time = (new Date().getTime() - start_time) / 1000;
}
function parseCoords(sCoord, dim) {
    if (dim == null || dim < 1) {
        dim = 2;
    }
    var v = sCoord.split(' ');

    if (v.length > 1) {
        var c = [];
        for (var i = 0; i < v.length; i++) {
            var xcoords = v[i];
            var xcoord = xcoords.split(',');
            lat1 = xcoord[1];
            long1 = xcoord[0];
            try {
                c.push(new Microsoft.Maps.Location(parseFloat(lat1), parseFloat(long1)));
            }
            catch (err) { }
            _allPoints.push(c);
            if (iLocs == 1) {
                curLat = lat1;
                curLon = long1;
            }
        }

        return c;
    }
    return null;
}
this.GetBounds = function () {
    if (_allPoints != null && _allPoints.length > 0) {
        return Microsoft.Maps.LocationRect.fromLocations(_allPoints);
    }
    return null;
};

// LOCATION TRACKING
function beginLocationTracking(resourceType, resourceID, trackType) {
    var myIcon = '/hosted/IconLibrary/icon-center.png';
    currentShape = new Microsoft.Maps.Pushpin(map.getCenter(), { icon: myIcon });
    map.entities.push(currentShape);
    watchId = navigator.geolocation.watchPosition(updateLocationTrack);
}
function updateLocationTrack(position) {
    var loc = new Microsoft.Maps.Location(
        position.coords.latitude,
        position.coords.longitude);
    currentShape.setLocation(loc);

    if (isAccuracy) {
        var path = Microsoft.Maps.SpatialMath.getRegularPolygon(loc, position.coords.accuracy, 36, Microsoft.Maps.SpatialMath.Meters);
        var myPinAccuracy = new Microsoft.Maps.Polygon(path);
        map.entities.push(myPinAccuracy);
    }

    currentShape.setOptions({ visible: true });
    map.setView({ center: loc });

    //document.getElementById('PnlMyLocation').style.display = 'inline-block';
    //document.getElementById('MyCoordinates').innerText = position.coords.latitude.toFixed(6) + ',' + position.coords.longitude.toFixed(6)
}; options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
function stopLocationTracking() {
    navigator.geolocation.clearWatch(watchId);
    map.entities.remove(currentShape);
}
function centerLocationTracking() {
    map.setView({ center: currentShape.getLocation(), zoom: 15 });
}
function showLocationAccuracy() {
    var path = Microsoft.Maps.SpatialMath.getRegularPolygon(currentShape.getLocation(), position.coords.accuracy, 36, Microsoft.Maps.SpatialMath.Meters);
    var myPinAccuracy = new Microsoft.Maps.Polygon(path);
    map.entities.push(myPinAccuracy);
}
function LocationTrackingType(val) {
    switch (val) {
        case '2':
            isAccuracy = true;
            showLocationAccuracy();
            break;
    }
}

// SEARCH 
function searchParams() {

    qs = '';
    var keywords = document.getElementById('Search').value;
    if (keywords.length > 0) {
        isSearch = true;
        qs = '?keywords=' + encodeURI(keywords);
        LocaleIQ.getSearchMap();
        document.getElementById('Search').value = '';
        document.getElementById('PnlEntity').className = 'hideElement';
        _subFeatures.splice(0, _subFeatures.length);
    }
    if (_subFeatures.length > 0) {
        isSearch = true;
        if (qs.length > 0) {
            qs += '&fid=' + _subFeatures.toString();
        }
        else {
            qs += '?fid=' + _subFeatures.toString();
        }
        LocaleIQ.getSearchMap();
        document.getElementById('PnlEntity').className = 'hideElement';
    }
    if (qs.length == 0) {
        iSearch = false;
        LocaleIQ.getCustomerMap(document.getElementById('CurrCustomerID').value);
    }
}
function filterSubFeatures(item, lbl, e) {
    if (e.checked) {
        _subFeatures.push(item);
        _filters.push(lbl);

        document.getElementById('LblSearchFilters').style.display = 'inline-block';
        document.getElementById('LblSearchFilters').innerText = 'Searched By: ' + _filters.toString();
        document.getElementById('BtnClearFilters').style.display = 'inline-block';
    }
    else {
        for (var i in _subFeatures) {
            if (_subFeatures[i] == item) {
                _subFeatures.splice(i, 1);
                break;
            }
        }
        for (var i in _filters) {
            if (_filters[i] == lbl) {
                _filters.splice(i, 1);
                break;
            }
        }
        if (_filters.length > 0) {
            document.getElementById('LblSearchFilters').innerText = 'Searched By: ' + _filters.toString();
            document.getElementById('BtnClearFilters').style.display = 'inline-block';
        }
        else {
            document.getElementById('LblSearchFilters').style.display = 'none';
            document.getElementById('LblSearchFilters').innerText = '';
            document.getElementById('BtnClearFilters').style.display = 'none';
        }
    }
    searchParams();
}
function filterFeatures(item, e) {
    if (e.checked) {
        _features.push(item);
    }
    else {
        for (var i in _subFeatures) {
            if (_features[i] == item) {
                _features.splice(i, 1);
                break;
            }
        }
    }
    searchParams();
}
function filterSectors(item, e) {
    if (e.checked) {
        _sectors.push(item);
    }
    else {
        for (var i in _subFeatures) {
            if (_sectors[i] == item) {
                _sectors.splice(i, 1);
                break;
            }
        }
    }
    searchParams();
}
function filterActivities(item, e) {
    if (e.checked) {
        _activities.push(item);
    }
    else {
        for (var i in _subFeatures) {
            if (_activities[i] == item) {
                _activities.splice(i, 1);
                break;
            }
        }
    }
    searchParams();
}
function filterRules(item, e) {
    if (e.checked) {
        _rules.push(item);
    }
    else {
        for (var i in _rules) {
            if (_rules[i] == item) {
                _rules.splice(i, 1);
                break;
            }
        }
    }
    searchParams();
}
function filterWineVarietals(item, e) {
    qs = '?wv=';
    if (e.checked) {
        _winevarietals.push(item);
        qs += _winevarietals.toString();
    }
    else {
        for (var i in _winevarietals) {
            if (_winevarietals[i] == item) {
                _winevarietals.splice(i, 1);
                break;
            }
        }
        qs += _winevarietals.toString();
    }
    if (_winevarietals.length == 0) { qs = ''; }

    LocaleIQ.getCategoryMap(226);
}
function clearSearchParams() {
    var inputs = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }
    return;
}

// COMMON
function MapZoomIn() {
    var currZoom = map.getZoom() + 1;
    map.setView({ zoom: currZoom });
}
function MapZoomOut() {
    var currZoom = map.getZoom() - 1;
    map.setView({ zoom: currZoom });
}
function MapTileLayer(lyr) {
    switch (lyr) {
        case 'Road':
            map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.road });
            break;
        case 'Aerial':
            map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.aerial });
            break;
        case 'GrayScale':
            map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.grayscale });
            break;
        case 'Dark':
            map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.canvasDark });
            break;
        case 'Light':
            map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.canvasLight });
            break;
        case 'Strret':
            map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.streetside });
            break;
        case 'BirdsEye':
            map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.birdseye });
            break;
    }
}
function HideLayers() {
    //LayerHome.setVisible(false);
    //LayerEntity.setVisible(false);
    //LayerSector.setVisible(false);
    //LayerCategory.setVisible(false);
    //LayerEvent.setVisible(false);
    //LayerSearch.setVisible(false);
    //LayerProject.setVisible(false);
    //LayerAlert.setVisible(false);
    //LayerClosure.setVisible(false);
}