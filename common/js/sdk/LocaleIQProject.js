//***************************************************************************//
//  LocaleIQ Corporation - LocaleIQ Geographic Tools version 1.0             //
//  Copyright LocaleIQ Corporation                                           //
//  LocaleIQ Corporation Morgan Hill CA 95037                                //
//  Release Date: 01/29/2019                                                 //
//  Author: Tom Landers                                                      //
//***************************************************************************//

var galleryId = 0;
outputType = 0; // 0 = xml, 1 = object

// Project Objects
var _projects = {
    Project_Id = '',
    Project_Type_Id = '',
    Project_StartDate = '',
    Project_EndDate = '',
    ProjectTitle = '',
    ProjectDescription = '',
    ProjectAddress = '',
    ProjectCity = '',
    ProjectState = '',
    ProjectPostalCode = '',
    ProjectCounty = '',
    ProjectMedia = '',
    ProjectViews = ''
}
var _project = {
    Feature: '',
    FeatureType: '',
    MasterIndustryID: '',
    MasterFeatureID: '',
    MasterEntityID: '',
    MasterTitle: '',
    Project_Id = '',
    Project_Type_Id = '',
    Project_StartDate = '',
    Project_EndDate = '',
    ProjectTitle = '',
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
    Tasks: {
        Count: '',
        TaskID: [],
        TaskPriority: [],
        TaskStatus: [],
        TaskTitle: [],
        TaskDescription: [],
        TaskStartDate: [],
        TaskEndDate: [],
        Resources: {
            ResourceID: [],
            ResourceName: []
        }
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
var LIQProject = {
    getProjects: function () { getProjects(oLnIQContenoLnIQProjectAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getCategoryProjects: function (cid) { getProjects(oLnIQContenoLnIQProjectAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getSectorProjects: function (sid) { getProjects(oLnIQContenoLnIQProjectAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getFeatureProjects: function (sid, fid) { getProjects(oLnIQContenoLnIQProjectAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getEntityProjects: function (sid, eid) { outputType = 1; contentType = 'Project/'; getProjects(oLnIQContenoLnIQProjectAPIPublictAPIPublic + contentType + sid + '/' + eid); },
    getProjectDetails: function (projectid) { contentType = 'Project/'; getContentXML(oLnIQProjectAPIPublic + contentType + projectid); },
    getProjectRegistrationForm: function (projectid) { contentType = 'Project/'; getContentXML(oLnIQProjectAPIPublic + contentType + projectid); },
    postProjectRegistration: function (projectid) { contentType = 'Project/'; getContentXML(oLnIQProjectAPIPublic + contentType + projectid); }
};

// LocaleIQ API SERVICE
function getProjects(url) {
    $.ajax({
        url: url,
        dataType: "xml",
        success: LIQProjectsParser,
        error: function () { alert("Sorry, we are unable to load the content you requested."); }
    });
}
function LIQProjectsParser(xml) {

}
function getProject(url) {
    $.ajax({
        url: url,
        dataType: "xml",
        success: LIQProjectParser,
        error: function () { alert("Sorry, we are unable to load the content you requested."); }
    });
}
function LIQProjectParser(xml) {
    $(xml).find("Project").each(function () {
        disposeEntity();
        _project.Feature = $(this).find('Feature').text();
        _project.FeatureType = $(this).find('FeatureType').text();
        _project.MasterTitle = $(this).find('MasterEntityTitle').text();
        _project.MasterIndustryID = $(this).find('MasterEntityTitle').attr('IndustryID');
        _project.MasterFeatureID = $(this).find('MasterEntityTitle').attr('FeatureID');
        _project.MasterEntityID = $(this).find('MasterEntityTitle').attr('EntityID');
        _project.Title = $(this).find('EntityTitle').text();
        _project.Description = $(this).find('EntityDescription').text();
        _project.Phone = $(this).find('EntityPhone').text();
        _project.Email = $(this).find('EntityEmail').text();
        _project.Website = $(this).find('EntityWebsite').text();
        _project.ReservationSite = $(this).find('EntityReservationWebsite').text();
        _project.Icon = $(this).find('EntityIcon').text();
        // Populate Location
        _project.Location.Address = $(this).find('EntityAddress').text();
        _project.Location.AddressCont = $(this).find('EntityAddress1').text();
        _project.Location.City = $(this).find('EntityCity').text();
        _project.Location.PostalCode = $(this).find('EntityPostalCode').text();
        _project.Location.County = $(this).find('EntityCounty').text();
        _project.Location.Country = $(this).find('EntityCountry').text();
        // Spatial Information
        _project.Geography.Area = $(this).find('Area').text();
        // Populate Media
        var nodeMultimedia = $(this).find("Multimedia");
        nodeMultimedia.each(function () {
            var nodeMedia = $(this).find("Media");
            nodeMedia.each(function () {
                _project.Media.Count = $(this).find('MediaTitle').length + 1;
                _project.Media.Title.push($(this).find('MediaTitle').text());
                _project.Media.Description.push($(this).find('MediaDescription').text());
                _project.Media.Icon.push($(this).find('MediaIcon').text());
                _project.Media.ImageSmall.push($(this).find('MediaSmall').text());
                _project.Media.ImageMedium.push($(this).find('MediaMedium').text());
                _project.Media.ImageLarge.push($(this).find('MediaLarge').text());
            });
        });
        // Populate Media
        var nodeHours = $(this).find("Hours");
        nodeHours.each(function () {
            var nodeSchedule = $(this).find("Schedule");
            nodeSchedule.each(function () {
                _project.Hours.Count = $(this).find('ScheduleTitle').length + 1;
                _project.Hours.ScheduleTitle.push($(this).find('ScheduleTitle').text());
                _project.Hours.StartDate.push($(this).find('ScheduleStartDate').text());
                _project.Hours.OpenTime.push($(this).find('ScheduleStartTime').text());
                _project.Hours.EndDate.push($(this).find('ScheduleEndDate').text());
                _project.Hours.CloseTime.push($(this).find('ScheduleCloseTime').text());
                _project.Hours.ReOpenTime.push($(this).find('ScheduleReStartTime').text());
                _project.Hours.ReCloseTime.push($(this).find('ScheduleReCloseTime').text());
                _project.Hours.OpenVerbose.push($(this).find('ScheduleStartVerbose').text());
                _project.Hours.CloseVerbose.push($(this).find('ScheduleCloseVerbose').text());
            });
        });
        // Populate Activities
        var nodeActivities = $(this).find("Activities");
        nodeActivities.each(function () {
            var nodeActivity = $(this).find("Activity");
            nodeActivity.each(function () {
                _project.Activities.Count = $(this).find('ActivityTitle').length + 1;
                _project.Activities.Title.push($(this).find('ActivityTitle').text());
                _project.Activities.Description.push($(this).find('ActivityDescription').text());
                _project.Activities.StartDate.push($(this).find('ActivityStartDate').text());
                _project.Activities.StartTime.push($(this).find('ActivityStartTime').text());
                _project.Activities.EndDate.push($(this).find('ActivityEndDate').text());
                _project.Activities.EndTime.push($(this).find('ActivityEndTime').text());
            });
        });
        // Populate Rules
        var nodeRules = $(this).find("Rules");
        nodeRules.each(function () {
            var nodeRule = $(this).find("Rule");
            nodeRule.each(function () {
                _project.Rules.Count = $(this).find('RuleTitle').length + 1;
                _project.Rules.Type.push($(this).find('RuleType').text());
                _project.Rules.Title.push($(this).find('RuleTitle').text());
                _project.Rules.Description.push($(this).find('RuleDescription').text());
                _project.Rules.StartDate.push($(this).find('RuleStartDate').text());
                _project.Rules.StartTime.push($(this).find('RuleStartTime').text());
                _project.Rules.EndDate.push($(this).find('RuleEndDate').text());
                _project.Rules.EndTime.push($(this).find('RuleEndTime').text());
            });
        });
        // Populate Conditions
        var nodeConditions = $(this).find("Conditions");
        nodeConditions.each(function () {
            var nodeCondition = $(this).find("Condition");
            nodeCondition.each(function () {
                _project.Conditions.Count = $(this).find('ConditionTitle').length + 1;
                _project.Conditions.Title.push($(this).find('ConditionTitle').text());
                _project.Conditions.Description.push($(this).find('ConditionDescription').text());
                _project.Conditions.StartDate.push($(this).find('ConditionStartDate').text());
                _project.Conditions.EndDate.push($(this).find('ConditionEndDate').text());
            });
        });
        // Populate Notices
        var nodeNotices = $(this).find("Notices");
        nodeNotices.each(function () {
            var nodeNotice = $(this).find("Notice");
            nodeNotice.each(function () {
                _project.Notices.Count = $(this).find('NoticeTitle').length + 1;
                _project.Notices.Title.push($(this).find('NoticeTitle').text());
                _project.Notices.Title.push($(this).find('NoticeType').text());
                _project.Notices.Description.push($(this).find('NoticeDescription').text());
                _project.Notices.StartDate.push($(this).find('NoticeStartDate').text());
                _project.Notices.StartTime.push($(this).find('NoticeStartTime').text());
                _project.Notices.EndDate.push($(this).find('NoticeEndDate').text());
                _project.Notices.EndTime.push($(this).find('NoticeEndTime').text());
            });
        });
        // Populate Closures
        var nodeClosures = $(this).find("Closures");
        nodeClosures.each(function () {
            var nodeClosure = $(this).find("Closure");
            nodeClosure.each(function () {
                _project.Closures.Count = $(this).find('ClosureTitle').length + 1;
                _project.Closures.Title.push($(this).find('ClosureTitle').text());
                _project.Closures.Description.push($(this).find('ClosureDescription').text());
                _project.Closures.StartDate.push($(this).find('ClosureStartDate').text());
                _project.Closures.StartTime.push($(this).find('ClosureStartTime').text());
                _project.Closures.EndDate.push($(this).find('ClosureEndDate').text());
                _project.Closures.EndTime.push($(this).find('ClosureEndTime').text());
            });
        });
        // Populate Wine Varietals
        var nodeWineVarietals = $(this).find("WineVarietals");
        nodeWineVarietals.each(function () {
            var nodeVarietals = $(this).find("Varietal");
            nodeVarietals.each(function () {
                _project.WineVarietals.Count = $(this).find('Title').length + 1;
                _project.WineVarietals.Title.push($(this).find('Title').text());
            });
        });
    });

    //if (_project.FeatureType == 'Winery') { alert('winery'); }
    //if (outputType == 0) {
    displayEntity();
    //}
    //if (outputType == 1) {
    //    displayWinery();
    //}
}
function getProjectRegistrationForm() { }
function LIQProjectRegistrationFormParser(xml) { }
function postProject() { }
function displayProjects() { }
function displayProject() {
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
    document.getElementById('PnlEntityTitle').innerHTML = _project.Title;
    document.getElementById('PnlDescription').innerHTML = _project.Description;

    if (parseFloat(_project.Geography.Area)) {
        var acres = _project.Geography.Area / 43560;
        document.getElementById('PnlEntityTitle').innerHTML += '<span style="font-size:10pt;">&nbsp;&nbsp;&nbsp;has&nbsp;' + acres.toFixed(2) + '&nbsp;acres</span>';
    }

    if (parseInt(_project.MasterEntityID)) {
        document.getElementById('PnlMasterEntityTitle').innerHTML = 'in&nbsp;' + _project.MasterTitle + '<p />';
        document.getElementById('PnlMasterEntityTitle').style.display = 'inline-block';
        document.getElementById('PnlMasterEntityTitle').setAttribute('onclick', 'LIQContent.getEntityInfo(' + _project.MasterIndustryID + ',' + _project.MasterEntityID + ');');
    }

    if (_project.ReservationSite.indexOf('http') != -1 || _project.ReservationSite.indexOf('.com') != -1) {
        document.getElementById('PnlReserve').style.display = 'inline-block';
        document.getElementById('BtnReserve').href = _project.ReservationSite;
        document.getElementById('BtnReserve').style.display = 'inline-block';
    }

    // Display Location, Contact & Hours
    if (_project.Location.Address != '' || _project.Location.City != '' || _project.Location.County != '' || _project.Location.Country != '' || _project.Location.PostalCode != '') {
        document.getElementById('PnlAddress').style.display = 'inline-block';
        document.getElementById('PnlAddress').innerHTML = _project.Location.Address + '&nbsp;' + _project.Location.City + '&nbsp;' + _project.Location.PostalCode + '<p />';
    }
    if (_project.Phone != '' || _project.Phone.length <= 3) {
        document.getElementById('PnlPhone').innerHTML += _project.Phone;
    }
    if (_project.Website != '' || _project.Website.length <= 3) {
        document.getElementById('PnlWebsite').innerHTML += '<a href="' + _project.Website + '" target="_blank">' + 'Website' + '</a>'
    }
    if (_project.Email != '' || _project.Email.length <= 3) {
        document.getElementById('PnlEmail').innerHTML += '<a href="mailto:' + _project.Email + '">' + 'Email' + '</a>';
    }
    // Display Hours
    if (_project.Hours.ScheduleTitle.length > 0) {
        document.getElementById('PnlOperatingHours').style.display = 'inline-block';
        document.getElementById('PnlHours').innerHTML += '<p /><i class="fa fa-clock-o" style="color:#262216;"></i>&nbsp;<strong>Hours</strong><br />';
        for (i = 0; i < _project.Hours.ScheduleTitle.length; i++) {
            document.getElementById('PnlHours').innerHTML += _project.Hours.ScheduleTitle[i] + ': ';
            var sOpenTime = _project.Hours.OpenTime[i].replace(/(^\s+|\s+$)/g, '');
            var sOpenVerbose = _project.Hours.OpenVerbose[i].replace(/(^\s+|\s+$)/g, '');

            if (sOpenTime.toString() !== '') {
                document.getElementById('PnlHours').innerHTML += _project.Hours.OpenTime[i] + ' - ' + _project.Hours.CloseTime[i] + '<br />';
            }
            if (sOpenVerbose.toString() !== '') {
                document.getElementById('PnlHours').innerHTML += _project.Hours.OpenVerbose[i] + ' - ' + _project.Hours.CloseVerbose[i] + '<br />';
            }
        }
    }
    // Display Images
    if (_project.Media.ImageMedium.length >= 0) {
        document.getElementById('EntityImage').style.display = 'inline-block';
        document.getElementById('EntityGallery').style.backgroundSize = 'contain';
        document.getElementById('EntityGallery').style.backgroundImage = 'url(' + _project.Media.ImageMedium[galleryId] + ')';
        document.getElementById('NumImages').innerText = _project.Media.ImageMedium.length.toString();

        if (_project.Media.ImageMedium.length == 1) {
            document.getElementById('EntityGalleryMenu').style.display = 'none';
        }
        else {
            document.getElementById('EntityGalleryMenu').style.display = 'inline-block';
        }
    }
    if (_project.Media.ImageMedium.length == 0) {
        document.getElementById('EntityGalleryMenu').style.display = 'none';
        if (_project.Icon != '') {
            document.getElementById('EntityGallery').style.backgroundImage = 'url(' + _project.Icon + ')';
            document.getElementById('EntityGallery').style.backgroundSize = 'auto';
        }
        else {
            document.getElementById('EntityGallery').style.backgroundImage = '';
        }
    }
    // Display Activities
    //if (_project.Activities.Title.length > 0) {
    //    document.getElementById('EntityActivity').innerHTML += '<strong>Activities available:</strong><p /> ';
    //    _project.Activities.Title.sort();
    //    for (i = 0; i < _project.Activities.Title.length; i++) {
    //        document.getElementById('EntityActivity').innerHTML += _project.Activities.Title[i] + '<p />';
    //    }
    //}
    // Display Closures
    if (_project.Closures.Title.length > 0) {
        document.getElementById('AccClosures').style.display = 'inline-block';
        for (i = 0; i < _project.Closures.Title.length; i++) {
            document.getElementById('EntityClosures').innerHTML += _project.Closures.Title[i] + '<p />';
        }
    }
    // Display Notifications & Alerts
    if (_project.Notices.Title.length > 0) {
        document.getElementById('AccNotices').style.display = 'inline-block';
        for (i = 0; i < _project.Notices.Title.length; i++) {
            document.getElementById('EntityNotices').innerHTML += _project.Notices.Title[i] + '<p />';
        }
    }
    // Display Conditions
    if (_project.Conditions.Title.length > 0) {
        document.getElementById('AccConditions').style.display = 'inline-block';
        for (i = 0; i < _project.Conditions.Title.length; i++) {
            document.getElementById('EntityConditions').innerHTML += _project.Conditions.Title[i] + '<p />';
        }
    }
    // Display Rules
    //if (_project.Rules.Title.length > 0) {
    //    document.getElementById('AccRules').style.display = 'inline-block';
    //    for (i = 0; i < _project.Rules.Title.length; i++) {
    //        document.getElementById('EntityRules').innerHTML += _project.Rules.Title[i] + '<p />';
    //    }
    //}
}