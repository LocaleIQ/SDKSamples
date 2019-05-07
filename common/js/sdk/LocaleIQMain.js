//***************************************************************************//
//  LocaleIQ Corporation - LocaleIQ Geographic Tools version 1.0             //
//  Copyright LocaleIQ Corporation                                           //
//  LocaleIQ Corporation Morgan Hill CA 95037                                //
//  Release Date: 01/29/2019                                                 //
//  Author: Tom Landers                                                      //
//***************************************************************************//

// MAP KEYS
var _mapKey = "An6kk6OXiVuAry-gSUjeuP-6MVEQIk1sL9TucqclY8i61tVmR6Fj3RRNbh27GVqk";
var _mapESRIKey = 'd2e2b84d674740d89056f28894f306ae';
var _mapGoogleKey = 'AIzaSyDL-N33wBG5l2i2ARQyTp8KNHeOccqImgg';
var _mapHereAppId = 'llNO7uiEdYkJeQXNz7Zh';
var _mapHereAppCode = 'ychAK13YhsDthsAAWu8dhg';

// LOCALEIQ API
var oLnIQMapAPIPublic = 'https://www.localeiq.com/API/Public/Mapping/';
var oLnIQContentAPIPublic = 'https://www.localeiq.com/API/Public/Content/';
var oLnIQEventAPIPublic = 'https://www.localeiq.com/API/Public/Event/';
var FormPanels = ['PnlMenu', 'PnlAbout', 'PnlCategory', 'PnlCategories', 'PnlEntity', 'PnlSearch', 'PnlSearchResults', 'PnlNavigation', 'PnlEvents', 'PnlEvent', 'PnlEventRegistration', 'PnlAbout', 'PnlDirectory'];

//var HoverToolTip;
var PnlToolTipTemplate = '<div style="background-color:#ebebeb;border-radius:4pt;border:1pt solid #ccc;height:20px;width:auto;padding:5px;font-size:8pt;line-height:20px;"><b>{title}</b></div>';

var isMobile = false, screenHeight = 0, screenWidth = 0;

var ratio = window.devicePixelRatio || 1;
var screenWidth = screen.width * ratio;
var screenHeight = screen.height * ratio;

(function (a) {
    window.isMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
    isMobile = window.isMobile;
})(navigator.userAgent || navigator.vendor || window.opera);

if (isMobile) { displayMenu('close'); }

// COMMON FUNCTIONS
function displayMenu(menu, cls) {
    for (var i = 0; i <= FormPanels.length; i++) {
        if (document.getElementById(FormPanels[i]) && FormPanels[i] != 'PnlMenu') {
            document.getElementById(FormPanels[i]).className = 'hideElement';
        }
    }

    if (document.getElementById(menu).className == 'hideElement') {
        document.getElementById(menu).className = cls;
    } else {
        document.getElementById(menu).className = 'hideElement';
    }
}
function displayModal(modal) {
    switch (modal) {
        case 'ModalPhotoGallery':
            document.getElementById('MapModals').className = 'modal-dark';
            document.getElementById(modal).className = 'modal-gallery';
            break;
        default:
            document.getElementById('MapModals').className = 'modal';
            document.getElementById(modal).className = 'modal-content';
            break;
    }
}
function displayProgress(modal) {
    document.getElementById('MapModals').className = 'modal';
    document.getElementById(modal).className = 'modal-progress';
}
function closeModal(modal) {
    document.getElementById('MapModals').className = 'hideElement';
    document.getElementById(modal).className = 'hideElement';
}
function displayPanel(pnl, cls) {
    for (var i = 0; i <= FormPanels.length; i++) {
        if (document.getElementById(FormPanels[i])) {
            document.getElementById(FormPanels[i]).className = 'hideElement';
        }
    }
    if (pnl != '') { document.getElementById(pnl).className = cls; }
}
function closePanel(pnl) {
    document.getElementById(pnl).className = 'hideElement';
}
function toggleBtn(btn, cls) {
    document.getElementById('ToggleLeft').className = 'toggleLeft';
    document.getElementById('ToggleRight').className = 'toggleRight';

    document.getElementById(btn).className = cls + ' toggleActive';
}

// MAP EVENTS
function onItemClick(e) {
    map.getRootElement().style.cursor = 'pointer';
    if (e.target.metadata) {
        switch (e.target.metadata.on_click) {
            case 'LoadContent':
                LIQContent.getEntityInfo(e.target.metadata.industry_id, e.target.metadata.entity_id);
                LocaleIQ.getEntityMap(e.target.metadata.industry_id, e.target.metadata.entity_id);
                break;
            case 'LoadEvent':
                break;
            case 'LoadSurvey':
                break;
            case 'LoadEntityMap':
                LocaleIQ.getEntityMap(e.target.metadata.industry_id, e.target.metadata.entity_id);
                break;
        }
    }
}
function onItemHover(e) {
    if (e.target.metadata) {
        switch (e.target.metadata.on_hover) {
            case 'LoadContent':
                LIQContent.getEntityInfo(e.target.metadata.industry_id, e.target.metadata.entity_id);
                break;
            case 'LoadToolTip':
                //infobox.setOptions({
                //    location: e.target.getLocation(),
                //    htmlContent: PnlToolTipTemplate.replace('{title}', e.target.metadata.title),
                //    visible: true
                //});
                break;
            case 'LoadStyles':
                break;
        }
    }
}
function onItemHoverOut(e) {
    map.getRootElement().style.cursor = 'default';

    if (e.target.metadata) {
        switch (e.target.metadata.on_hover) {
            case 'LoadToolTip':
                infobox.setOptions({ visible: false });
                break;
        }
    }
}
function onItemRgtClick(e) { }

//********** TOP NAVIGATION **********//

//********** DROP MENU **********//
//(function ($) {
//    $.fn.menumaker = function (options) {
//        var cssmenu = $(this), settings = $.extend({
//            format: "dropdown",
//            sticky: false
//        }, options);
//        return this.each(function () {
//            $(this).find(".button").on('click', function () {
//                $(this).toggleClass('menu-opened');
//                var mainmenu = $(this).next('ul');
//                if (mainmenu.hasClass('open')) {
//                    mainmenu.slideToggle().removeClass('open');
//                }
//                else {
//                    mainmenu.slideToggle().addClass('open');
//                    if (settings.format === "dropdown") {
//                        mainmenu.find('ul').show();
//                    }
//                }
//            });
//            cssmenu.find('li ul').parent().addClass('has-sub');
//            multiTg = function () {
//                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
//                cssmenu.find('.submenu-button').on('click', function () {
//                    $(this).toggleClass('submenu-opened');
//                    if ($(this).siblings('ul').hasClass('open')) {
//                        $(this).siblings('ul').removeClass('open').slideToggle();
//                    }
//                    else {
//                        $(this).siblings('ul').addClass('open').slideToggle();
//                    }
//                });
//            };
//            if (settings.format === 'multitoggle') multiTg();
//            else cssmenu.addClass('dropdown');
//            if (settings.sticky === true) cssmenu.css('position', 'fixed');
//            resizeFix = function () {
//                var mediasize = 1280;
//                if ($(window).width() > mediasize) {
//                    cssmenu.find('ul').show();
//                }
//                if ($(window).width() <= mediasize) {
//                    cssmenu.find('ul').hide().removeClass('open');
//                }
//            };
//            resizeFix();
//            return $(window).on('resize', resizeFix);
//        });
//    };
//})(jQuery);
//(function ($) {
//    $(document).ready(function () {
//        $("#cssmenu").menumaker({
//            format: "multitoggle"
//        });
//    });
//})(jQuery);

//********** SLIDE MENU **********//
