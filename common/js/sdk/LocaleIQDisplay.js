//***************************************************************************//
//  LocaleIQ Corporation - LocaleIQ Geographic Tools version 1.0             //
//  Copyright LocaleIQ Corporation                                           //
//  LocaleIQ Corporation Morgan Hill CA 95037                                //
//  Release Date: 01/29/2019                                                 //
//  Author: Tom Landers                                                      //
//***************************************************************************//

function LoadDisplay(_entity, theme) {
    switch (theme) {
        case 'Standard':
            LoadVertical(_entity);
            break;
        case 'ParkFinder':
            LoadParkTheme(_entity);
            break;
        case 'BusinessDirectory':
            LoadBusinessTheme(_entity);
            break;
        case 'JobListings':
            LoadJobTheme(_entity);
            break;
        case 'Wineries':
            LoadWineryTheme(_entity);
            break;
        default:
            LoadVertical(_entity);
            break;
    }
}

// Standard Displays
function LoadVertical(_entity) {
    document.getElementById('PnlEntity').className = "infoboxLeft";

    // CONFIRM THIS REQUEST HAS VALID CONTAINER
    if (document.getElementById('PnlEntityContent')) {
        // CLEAR CURRENT CONTAINER
        document.getElementById('PnlEntityContent').innerHTML = '';

        var currContent = '';  // HTML Container

        if (_entity.Title.length > 0) {
            currContent += '<div class="col10" style="padding:10px;"><h3>' + _entity.Title + '</h3>';
            currContent += '<span style="font-size:0.825rem;">' + _entity.Location.Address + ' ' + _entity.Location.City + ' ' + _entity.Location.PostalCode + ' ' + _entity.Location.Country + '</span><a style="padding- left:5px;" onclick="displayPnl(PnlNavigation);">Get Directions</a><p />';
            currContent += '<div class="col10" style="margin-top:15px;">';
            if (_entity.Website.trim() != '') {
                currContent += '<div class="col3" style="font-size:0.825rem;color:#008ec3;"><i class="fa fa-globe" style="padding-right:5px;"></i><a href="' + _entity.Website + '">Website</a></div>';
            }
            if (_entity.Phone.trim() != '') {
                currContent += '<div class="col3" style="font-size:0.825rem;color:#008ec3;text-align:center;"><i class="fa fa-phone" style="padding-right:5px;"></i>' + _entity.Phone + '</div>';
            }
            if (_entity.Email.trim() != '') {
                currContent += '<div class="col3" style="font-size:0.825rem;color:#008ec3;text-align:right;"><i class="fa fa-envelope" style="padding-right:5px;"></i><a href="mailto:' + _entity.Email + '">Email</a></div>';
            }
            currContent += '</div>';
            currContent += '<div class="col10" style="margin-top:15px;">';
            currContent += '<div class="col10" style="font-size:0.825rem;">Founded:</div>';
            currContent += '<div class="col10" style="font-size:0.825rem;">Employees:  <a style="float:right;padding-right:25px;color:maroon;">( 0 current openings )</a></div>';
            currContent += '<div class="col10" style="font-size:0.825rem;">Funding:</div>';
            currContent += '</div>';
            currContent += '</div > ';
        }

        if (_entity.Description.length > 0) {
            currContent += '<div class="col10" style="padding:10px;"><h3>About</h3></div>';
            currContent += '<div class="col10" style="padding:10px;">' + _entity.Description + "</div>";
        }
        if (_entity.Media.ImageMedium.length >= 0) {
            document.getElementById('PnlImageGallery').style.backgroundImage = 'url(' + _entity.Media.ImageMedium[galleryId] + ')';
            document.getElementById('ImgTitle').innerText = _entity.Title;
        }

        currContent += '<div class="col10" style="padding:10px;"><h3>Categories</h3></div>';
        currContent += '<div class="col10" style="padding:10px;"><h3>Technologies</h3></div>';
        currContent += '<div class="col10" style="padding:10px;"><h3>Partners</h3></div>';
        // POPULATE CONTAINER
        document.getElementById('PnlEntityContent').innerHTML = currContent;
    }
}
function LoadHorizontal() { }

// Display Themes
function LoadParkTheme(_entity) {
    // CONFIRM THIS REQUEST HAS VALID CONTAINER
    if (document.getElementById('PnlEntityContent')) {
        // CLEAR CURRENT CONTAINER
        document.getElementById('PnlEntityContent').innerHTML = '';
        
        var currContent = '';  // HTML Container
        
        //Display Closures & Alerts

        // Display Title & Location
        if (_entity.Title.trim() != '') {
            currContent += '<div class="col10" style="padding:10px;"><h3>' + _entity.Title + '</h3>';
            currContent += '<span style="font-size:0.825rem;">' + _entity.Location.Address + ' ' + _entity.Location.City + ' ' + _entity.Location.PostalCode + ' ' + _entity.Location.Country + '</span><p />';
            currContent += '</div > ';
        }

        // Display Geography Information

        // Display Contact Information
        if (_entity.Website.trim() != '' || _entity.Phone.trim() != '' || _entity.Email.trim() != '') {
            currContent += '<div class="col10" style="margin:8px 0;padding:0 10px;">';
                if (_entity.Website.trim() != '') {
                    currContent += '<div class="col3 listKeywords" style="font-size:0.825rem;color:#008ec3;"><span class="listKeywords"><i class="fa fa-globe" style="padding-right:5px;"></i><a href="' + _entity.Website + '">Website</a></span></div>';
                }
                if (_entity.Phone.trim() != '') {
                    currContent += '<div class="col3 listKeywords" style="font-size:0.825rem;color:#008ec3;text-align:middle;"><span class="listKeywords"><i class="fa fa-phone" style="padding-right:5px;"></i>' + _entity.Phone + '</span></div>';
                }
                if (_entity.Email.trim() != '') {
                    currContent += '<div class="col3 listKeywords" style="font-size:0.825rem;color:#008ec3;text-align:right;"><span class="listKeywords"><i class="fa fa-envelope" style="padding-right:5px;"></i><a href="mailto:' + _entity.Email + '">Email</a></span></div>';
                }
             currContent += '</div>';
        }

        // Display Description
        if (_entity.Description.trim() != '') {
            currContent += '<div class="col10" style="padding:10px;"><h3>About</h3></div>';
            currContent += '<div class="col10" style="padding:10px;">' + _entity.Description + "</div>";
        }

        // Display Gellery
        if (_entity.Media.ImageMedium.length >= 0) {
            //displayGalleryNavigation();
            document.getElementById('PnlImageGallery').style.backgroundImage = 'url(' + _entity.Media.ImageMedium[galleryId] + ')';
            document.getElementById('ImgTitle').innerText = 'Photo of ' + _entity.Title;

            document.getElementById('ModalGallery').innerHTML = '<img src=' + _entity.Media.ImageMedium[galleryId].replace('medium_', 'large_') + ' />';
        }

        // Display Hours
        if (_entity.Hours.ScheduleTitle.length > 0) {
            currContent += '<div class="col10" style="padding:10px;"><h3><i class="fa fa-clock-o"></i>  Hours</h3></div>';
            currContent += '<p style="padding-left:20px;">';
            for (i = 0; i < _entity.Hours.ScheduleTitle.length; i++) {
                currContent += _entity.Hours.ScheduleTitle[i] + ': ';
                var sOpenTime = _entity.Hours.OpenTime[i].replace(/(^\s+|\s+$)/g, '');
                var sOpenVerbose = _entity.Hours.OpenVerbose[i].replace(/(^\s+|\s+$)/g, '');

                if (sOpenTime.toString() !== '') {
                    currContent += _entity.Hours.OpenTime[i] + ' - ' + _entity.Hours.CloseTime[i] + '<br />';
                }
                if (sOpenVerbose.toString() !== '') {
                    currContent += _entity.Hours.OpenVerbose[i] + ' - ' + _entity.Hours.CloseVerbose[i] + '<br />';
                }
            }
            currContent += '</p>';
        }

        // Display Features
        if (_entity.Features.Count > 0) {
            currContent += '<div class="col10" style="padding:10px;"><h3>Things To Do</h3></div>';
            for (i = 0; i < _entity.Features.FeatureType.length; i++) {
                if (_entity.Features.Icon[i].trim() != '') {
                    currContent += '<img src="' + _entity.Features.Icon[i] + '" height="28" style="padding:5px;" title="' + _entity.Features.FeatureType[i] + '" />';
                }
                else {
                    currContent += '<span style="padding:0 5px;">' + _entity.Features.FeatureType[i] + '</span>';
                }
            }
        }

        // Display Activities

        // Display Rules

        // Display Conditions

        // POPULATE & DISPLAY CONTAINER
        document.getElementById('PnlEntityContent').innerHTML = currContent;
        displayPanel('PnlEntity', 'infoboxLeft');
    }
}
function LoadBusinessTheme(_entity) {

}
function LoadJobTheme(_entity) {

}
function LoadFoodTheme(_entity) {

}
function LoadWineryTheme(_entity) {

}

// COMMON FUNCTIONS
function displayGalleryNavigation() {
    //galleryNavigateClear();
    for (i = 0; i < 7; i++) {
        if (i == 0) { document.getElementById('galleryItem' + i.toString()).className = 'galleryNavigationActive'; }
        if (i <= _entity.Media.ImageMedium.length) { document.getElementById('galleryItem' + i.toString()).className = 'galleryNavigation'; }
    }
}
function galleryNavigateClear() {
    for (i = 0; i < 8; i++) {
        //document.getElementById('galleryItem' + i.toString()).className = 'hideElement';
    }
}
function galleryNavigate(id) {
    galleryId = id;
    document.getElementById('PnlImageGallery').style.backgroundImage = 'url(' + _entity.Media.ImageMedium[galleryId] + ')';
    displayGalleryNavigation();
}