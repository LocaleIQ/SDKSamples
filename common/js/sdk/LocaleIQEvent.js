//***************************************************************************//
//  LocaleIQ Corporation - LocaleIQ Geographic Tools version 1.0             //
//  Copyright LocaleIQ Corporation                                           //
//  LocaleIQ Corporation Morgan Hill CA 95037                                //
//  Release Date: 01/29/2019                                                 //
//  Author: Tom Landers                                                      //
//***************************************************************************//

var galleryId = 0;
outputType = 0; // 0 = xml, 1 = object

// Event Objects
var _events = {
    Event_Id = '',
    Event_Type_Id = '',
    Event_Is_Registered = '',
    Event_Registration_URL = '',
    Event_Registration_StartDate = '',
    Event_Registration_EndDate = '',
    EvenTitle = '',
    EventDescription = '',
    EventAddress = '',
    EventCity = '',
    EventState = '',
    EventPostalCode = '',
    EventCounty = '',
    EventMedia = '',
    EventDate = '',
    EventStartTime = '',
    EventEndTime = '',
    EventParticipants = '',
    EventViews = ''
}
var _event = {
    Feature: '',
    FeatureType: '',
    MasterIndustryID: '',
    MasterFeatureID: '',
    MasterEntityID: '',
    MasterTitle: '',
    Event_Id = '',
    Event_Type_Id = '',
    Event_Is_Registered = '',
    Event_Registration_URL = '',
    Event_Registration_StartDate = '',
    Event_Registration_EndDate = '',
    EvenTitle = '',
    Phone: '',
    Email: '',
    Website: '',
    Icon: '',
    Location: {
        Address: '',
        AddressCont: '',
        City: '',
        PostalCode: '',
        County: '',
        Country: ''
    },
    Media: {
        PhotoDefault: '',
        Count: '',
        Icon: [],
        ImageSmall: [],
        ImageMedium: [],
        ImageLarge: [],
        ImageTitle: [],
        Title: [],
        Description: [],
        Source: []
    },
    Fees: {
        Count: '',
        Type: [],
        StartDate: [],
        StartTime: [],
        EndDate: [],
        EndTime: [],
        Title: [],
        Description: [],
        FeeAmount: [],
        FeeURL: []
    },
    Notices: {
        Count: '',
        IsFilter: [],
        Type: [],
        StartDate: [],
        StartTime: [],
        EndDate: [],
        EndTime: [],
        Title: [],
        Description: [],
        Icon: [],
        ShowAlertFilters: 0
    },
    Closures: {
        Count: '',
        Type: [],
        StartDate: [],
        StartTime: [],
        EndDate: [],
        EndTime: [],
        Title: [],
        Description: [],
        Icon: []
    },
    Rules: {
        Count: '',
        IsFilter: [],
        Type: [],
        StartDate: [],
        StartTime: [],
        EndDate: [],
        EndTime: [],
        Title: [],
        Description: [],
        Icon: [],
        ShowRuleFilters: 0
    },
    Conditions: {
        Count: '',
        IsFilter: [],
        Type: [],
        StartDate: [],
        StartTime: '',
        EndDate: [],
        EndTime: [],
        Title: [],
        Description: [],
        Icon: [],
        ShowConditionFilters: 0
    },
    Activities: {
        Count: '',
        IsFilter: [],
        Type: [],
        StartDate: [],
        StartTime: [],
        EndDate: [],
        EndTime: [],
        Difficulty: [],
        Title: [],
        Description: [],
        icon: [],
        ShowActivityFilters: 0
    },
    Amenities: {
        Count: '',
        IsFilter: [],
        Type: [],
        StartDate: [],
        EndDate: [],
        Title: [],
        Description: [],
        Icon: [],
        ShowAmenityFilters: 0
    },
    Features: {
        Count: '',
        IsFilter: [],
        FeatureID: [],
        FeatureType: [],
        Icon: [],
        ShowFeatureFilters: 0
    },
    Geography: {
        Count: '',
        ShapeURI: [],
        ShapeType: [],
        MeasureType: [],
        Distance: [],
        Area: [],
        Perimeter: [],
        Radius: [],
        Elevation: [],
        ElevationGain: [],
        ElevationLoss: []
    }
};

// LocaleIQ Application
var LIQEvent = {
    getEvents: function () { getEvents(oLnIQContenoLnIQEventAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getCategoryEvents: function (cid) { getEvents(oLnIQContenoLnIQEventAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getSectorEvents: function (sid) { getEvents(oLnIQContenoLnIQEventAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getFeatureEvents: function (sid, fid) { getEvents(oLnIQContenoLnIQEventAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getEntityEvents: function (sid, eid) { outputType = 1; contentType = 'Event/'; getEvents(oLnIQContenoLnIQEventAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getEventDetails: function (eventid) { contentType = 'Event/'; getContentXML(oLnIQEventAPIPublic + contentType + eventid); },
    getEventRegistrationForm: function (eventid) { contentType = 'Event/'; getContentXML(oLnIQEventAPIPublic + contentType + eventid); },
    postEventRegistration: function (eventid) { contentType = 'Event/'; getContentXML(oLnIQEventAPIPublic + contentType + eventid); }
};

// LocaleIQ API SERVICE
function getEvents(url) {
    $.ajax({
        url: url,
        dataType: "xml",
        success: LIQEventsParser,
        error: function () { alert("Sorry, we are unable to load the content you requested."); }
    });
}
function LIQEventsParser(xml) {

}
function getEvent(url) {
    $.ajax({
        url: url,
        dataType: "xml",
        success: LIQEventParser,
        error: function () { alert("Sorry, we are unable to load the content you requested."); }
    });
}
function LIQEventParser(xml) {
    $(xml).find("Event").each(function () {
        disposeEntity();
        _event.Feature = $(this).find('Feature').text();
        _event.FeatureType = $(this).find('FeatureType').text();
        _event.MasterTitle = $(this).find('MasterEntityTitle').text();
        _event.MasterIndustryID = $(this).find('MasterEntityTitle').attr('IndustryID');
        _event.MasterFeatureID = $(this).find('MasterEntityTitle').attr('FeatureID');
        _event.MasterEntityID = $(this).find('MasterEntityTitle').attr('EntityID');
        _event.Title = $(this).find('EntityTitle').text();
        _event.Description = $(this).find('EntityDescription').text();
        _event.Phone = $(this).find('EntityPhone').text();
        _event.Email = $(this).find('EntityEmail').text();
        _event.Website = $(this).find('EntityWebsite').text();
        _event.ReservationSite = $(this).find('EntityReservationWebsite').text();
        _event.Icon = $(this).find('EntityIcon').text();
        // Populate Location
        _event.Location.Address = $(this).find('EntityAddress').text();
        _event.Location.AddressCont = $(this).find('EntityAddress1').text();
        _event.Location.City = $(this).find('EntityCity').text();
        _event.Location.PostalCode = $(this).find('EntityPostalCode').text();
        _event.Location.County = $(this).find('EntityCounty').text();
        _event.Location.Country = $(this).find('EntityCountry').text();
        // Spatial Information
        _event.Geography.Area = $(this).find('Area').text();
        // Populate Media
        var nodeMultimedia = $(this).find("Multimedia");
        nodeMultimedia.each(function () {
            var nodeMedia = $(this).find("Media");
            nodeMedia.each(function () {
                _event.Media.Count = $(this).find('MediaTitle').length + 1;
                _event.Media.Title.push($(this).find('MediaTitle').text());
                _event.Media.Description.push($(this).find('MediaDescription').text());
                _event.Media.Icon.push($(this).find('MediaIcon').text());
                _event.Media.ImageSmall.push($(this).find('MediaSmall').text());
                _event.Media.ImageMedium.push($(this).find('MediaMedium').text());
                _event.Media.ImageLarge.push($(this).find('MediaLarge').text());
            });
        });
        // Populate Media
        var nodeHours = $(this).find("Hours");
        nodeHours.each(function () {
            var nodeSchedule = $(this).find("Schedule");
            nodeSchedule.each(function () {
                _event.Hours.Count = $(this).find('ScheduleTitle').length + 1;
                _event.Hours.ScheduleTitle.push($(this).find('ScheduleTitle').text());
                _event.Hours.StartDate.push($(this).find('ScheduleStartDate').text());
                _event.Hours.OpenTime.push($(this).find('ScheduleStartTime').text());
                _event.Hours.EndDate.push($(this).find('ScheduleEndDate').text());
                _event.Hours.CloseTime.push($(this).find('ScheduleCloseTime').text());
                _event.Hours.ReOpenTime.push($(this).find('ScheduleReStartTime').text());
                _event.Hours.ReCloseTime.push($(this).find('ScheduleReCloseTime').text());
                _event.Hours.OpenVerbose.push($(this).find('ScheduleStartVerbose').text());
                _event.Hours.CloseVerbose.push($(this).find('ScheduleCloseVerbose').text());
            });
        });
        // Populate Activities
        var nodeActivities = $(this).find("Activities");
        nodeActivities.each(function () {
            var nodeActivity = $(this).find("Activity");
            nodeActivity.each(function () {
                _event.Activities.Count = $(this).find('ActivityTitle').length + 1;
                _event.Activities.Title.push($(this).find('ActivityTitle').text());
                _event.Activities.Description.push($(this).find('ActivityDescription').text());
                _event.Activities.StartDate.push($(this).find('ActivityStartDate').text());
                _event.Activities.StartTime.push($(this).find('ActivityStartTime').text());
                _event.Activities.EndDate.push($(this).find('ActivityEndDate').text());
                _event.Activities.EndTime.push($(this).find('ActivityEndTime').text());
            });
        });
        // Populate Rules
        var nodeRules = $(this).find("Rules");
        nodeRules.each(function () {
            var nodeRule = $(this).find("Rule");
            nodeRule.each(function () {
                _event.Rules.Count = $(this).find('RuleTitle').length + 1;
                _event.Rules.Type.push($(this).find('RuleType').text());
                _event.Rules.Title.push($(this).find('RuleTitle').text());
                _event.Rules.Description.push($(this).find('RuleDescription').text());
                _event.Rules.StartDate.push($(this).find('RuleStartDate').text());
                _event.Rules.StartTime.push($(this).find('RuleStartTime').text());
                _event.Rules.EndDate.push($(this).find('RuleEndDate').text());
                _event.Rules.EndTime.push($(this).find('RuleEndTime').text());
            });
        });
        // Populate Conditions
        var nodeConditions = $(this).find("Conditions");
        nodeConditions.each(function () {
            var nodeCondition = $(this).find("Condition");
            nodeCondition.each(function () {
                _event.Conditions.Count = $(this).find('ConditionTitle').length + 1;
                _event.Conditions.Title.push($(this).find('ConditionTitle').text());
                _event.Conditions.Description.push($(this).find('ConditionDescription').text());
                _event.Conditions.StartDate.push($(this).find('ConditionStartDate').text());
                _event.Conditions.EndDate.push($(this).find('ConditionEndDate').text());
            });
        });
        // Populate Notices
        var nodeNotices = $(this).find("Notices");
        nodeNotices.each(function () {
            var nodeNotice = $(this).find("Notice");
            nodeNotice.each(function () {
                _event.Notices.Count = $(this).find('NoticeTitle').length + 1;
                _event.Notices.Title.push($(this).find('NoticeTitle').text());
                _event.Notices.Title.push($(this).find('NoticeType').text());
                _event.Notices.Description.push($(this).find('NoticeDescription').text());
                _event.Notices.StartDate.push($(this).find('NoticeStartDate').text());
                _event.Notices.StartTime.push($(this).find('NoticeStartTime').text());
                _event.Notices.EndDate.push($(this).find('NoticeEndDate').text());
                _event.Notices.EndTime.push($(this).find('NoticeEndTime').text());
            });
        });
        // Populate Closures
        var nodeClosures = $(this).find("Closures");
        nodeClosures.each(function () {
            var nodeClosure = $(this).find("Closure");
            nodeClosure.each(function () {
                _event.Closures.Count = $(this).find('ClosureTitle').length + 1;
                _event.Closures.Title.push($(this).find('ClosureTitle').text());
                _event.Closures.Description.push($(this).find('ClosureDescription').text());
                _event.Closures.StartDate.push($(this).find('ClosureStartDate').text());
                _event.Closures.StartTime.push($(this).find('ClosureStartTime').text());
                _event.Closures.EndDate.push($(this).find('ClosureEndDate').text());
                _event.Closures.EndTime.push($(this).find('ClosureEndTime').text());
            });
        });
        // Populate Wine Varietals
        var nodeWineVarietals = $(this).find("WineVarietals");
        nodeWineVarietals.each(function () {
            var nodeVarietals = $(this).find("Varietal");
            nodeVarietals.each(function () {
                _event.WineVarietals.Count = $(this).find('Title').length + 1;
                _event.WineVarietals.Title.push($(this).find('Title').text());
            });
        });
    });

    //if (_event.FeatureType == 'Winery') { alert('winery'); }
    //if (outputType == 0) {
    displayEntity();
    //}
    //if (outputType == 1) {
    //    displayWinery();
    //}
}
function getEventRegistrationForm() { }
function LIQEventRegistrationFormParser(xml) {}
function postEvent() {}
function displayEvents() {}
function displayEvent() {
    galleryId = 0;
    document.getElementById('EntityGallery').style.backgroundImage = '';
    document.getElementById('PnlEntityTitle').innerHTML = '';
    document.getElementById('PnlMasterEntityTitle').style.display = 'none';
    document.getElementById('PnlOperatingHours').style.display = 'none';
    document.getElementById('PnlMasterEntityTitle').innerHTML = '';
    document.getElementById('BtnReserve').href = '';
    document.getElementById('BtnReserve').style.display = 'none';
    document.getElementById('PnlAddress').innerHTML = '';
    document.getElementById('PnlAddress').style.display = 'none';
    document.getElementById('NumImages').innerText = '';
    document.getElementById('PnlHours').innerHTML = '';
    document.getElementById('PnlPhone').innerHTML = '';
    document.getElementById('PnlEmail').innerHTML = '';
    document.getElementById('PnlWebsite').innerHTML = '';

    displayMenu('close');
    displayPanel('PnlEntity', 'infoboxLeft');
    document.getElementById('PnlEntityTitle').innerHTML = _event.Title;
    document.getElementById('PnlDescription').innerHTML = _event.Description;

    if (parseFloat(_event.Geography.Area)) {
        var acres = _event.Geography.Area / 43560;
        document.getElementById('PnlEntityTitle').innerHTML += '<span style="font-size:10pt;">&nbsp;&nbsp;&nbsp;has&nbsp;' + acres.toFixed(2) + '&nbsp;acres</span>';
    }

    if (parseInt(_event.MasterEntityID)) {
        document.getElementById('PnlMasterEntityTitle').innerHTML = 'in&nbsp;' + _event.MasterTitle + '<p />';
        document.getElementById('PnlMasterEntityTitle').style.display = 'inline-block';
        document.getElementById('PnlMasterEntityTitle').setAttribute('onclick', 'LIQContent.getEntityInfo(' + _event.MasterIndustryID + ',' + _event.MasterEntityID + ');');
    }

    if (_event.ReservationSite.indexOf('http') != -1 || _event.ReservationSite.indexOf('.com') != -1) {
        document.getElementById('PnlReserve').style.display = 'inline-block';
        document.getElementById('BtnReserve').href = _event.ReservationSite;
        document.getElementById('BtnReserve').style.display = 'inline-block';
    }

    // Display Location, Contact & Hours
    if (_event.Location.Address != '' || _event.Location.City != '' || _event.Location.County != '' || _event.Location.Country != '' || _event.Location.PostalCode != '') {
        document.getElementById('PnlAddress').style.display = 'inline-block';
        document.getElementById('PnlAddress').innerHTML = _event.Location.Address + '&nbsp;' + _event.Location.City + '&nbsp;' + _event.Location.PostalCode + '<p />';
    }
    if (_event.Phone != '' || _event.Phone.length <= 3) {
        document.getElementById('PnlPhone').innerHTML += _event.Phone;
    }
    if (_event.Website != '' || _event.Website.length <= 3) {
        document.getElementById('PnlWebsite').innerHTML += '<a href="' + _event.Website + '" target="_blank">' + 'Website' + '</a>'
    }
    if (_event.Email != '' || _event.Email.length <= 3) {
        document.getElementById('PnlEmail').innerHTML += '<a href="mailto:' + _event.Email + '">' + 'Email' + '</a>';
    }
    // Display Hours
    if (_event.Hours.ScheduleTitle.length > 0) {
        document.getElementById('PnlOperatingHours').style.display = 'inline-block';
        document.getElementById('PnlHours').innerHTML += '<p /><i class="fa fa-clock-o" style="color:#262216;"></i>&nbsp;<strong>Hours</strong><br />';
        for (i = 0; i < _event.Hours.ScheduleTitle.length; i++) {
            document.getElementById('PnlHours').innerHTML += _event.Hours.ScheduleTitle[i] + ': ';
            var sOpenTime = _event.Hours.OpenTime[i].replace(/(^\s+|\s+$)/g, '');
            var sOpenVerbose = _event.Hours.OpenVerbose[i].replace(/(^\s+|\s+$)/g, '');

            if (sOpenTime.toString() !== '') {
                document.getElementById('PnlHours').innerHTML += _event.Hours.OpenTime[i] + ' - ' + _event.Hours.CloseTime[i] + '<br />';
            }
            if (sOpenVerbose.toString() !== '') {
                document.getElementById('PnlHours').innerHTML += _event.Hours.OpenVerbose[i] + ' - ' + _event.Hours.CloseVerbose[i] + '<br />';
            }
        }
    }
    // Display Images
    if (_event.Media.ImageMedium.length >= 0) {
        document.getElementById('EntityImage').style.display = 'inline-block';
        document.getElementById('EntityGallery').style.backgroundSize = 'contain';
        document.getElementById('EntityGallery').style.backgroundImage = 'url(' + _event.Media.ImageMedium[galleryId] + ')';
        document.getElementById('NumImages').innerText = _event.Media.ImageMedium.length.toString();

        if (_event.Media.ImageMedium.length == 1) {
            document.getElementById('EntityGalleryMenu').style.display = 'none';
        }
        else {
            document.getElementById('EntityGalleryMenu').style.display = 'inline-block';
        }
    }
    if (_event.Media.ImageMedium.length == 0) {
        document.getElementById('EntityGalleryMenu').style.display = 'none';
        if (_event.Icon != '') {
            document.getElementById('EntityGallery').style.backgroundImage = 'url(' + _event.Icon + ')';
            document.getElementById('EntityGallery').style.backgroundSize = 'auto';
        }
        else {
            document.getElementById('EntityGallery').style.backgroundImage = '';
        }
    }
    // Display Activities
    //if (_event.Activities.Title.length > 0) {
    //    document.getElementById('EntityActivity').innerHTML += '<strong>Activities available:</strong><p /> ';
    //    _event.Activities.Title.sort();
    //    for (i = 0; i < _event.Activities.Title.length; i++) {
    //        document.getElementById('EntityActivity').innerHTML += _event.Activities.Title[i] + '<p />';
    //    }
    //}
    // Display Closures
    if (_event.Closures.Title.length > 0) {
        document.getElementById('AccClosures').style.display = 'inline-block';
        for (i = 0; i < _event.Closures.Title.length; i++) {
            document.getElementById('EntityClosures').innerHTML += _event.Closures.Title[i] + '<p />';
        }
    }
    // Display Notifications & Alerts
    if (_event.Notices.Title.length > 0) {
        document.getElementById('AccNotices').style.display = 'inline-block';
        for (i = 0; i < _event.Notices.Title.length; i++) {
            document.getElementById('EntityNotices').innerHTML += _event.Notices.Title[i] + '<p />';
        }
    }
    // Display Conditions
    if (_event.Conditions.Title.length > 0) {
        document.getElementById('AccConditions').style.display = 'inline-block';
        for (i = 0; i < _event.Conditions.Title.length; i++) {
            document.getElementById('EntityConditions').innerHTML += _event.Conditions.Title[i] + '<p />';
        }
    }
    // Display Rules
    //if (_event.Rules.Title.length > 0) {
    //    document.getElementById('AccRules').style.display = 'inline-block';
    //    for (i = 0; i < _event.Rules.Title.length; i++) {
    //        document.getElementById('EntityRules').innerHTML += _event.Rules.Title[i] + '<p />';
    //    }
    //}
}