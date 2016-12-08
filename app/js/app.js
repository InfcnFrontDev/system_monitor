

/*
 * DETECT IE VERSION
 * Description: A short snippet for detecting versions of IE in JavaScript
 * without resorting to user-agent sniffing
 * RETURNS:
 * If you're not in IE (or IE version is less than 5) then:
 * //ie === undefined

 * If you're in IE (>=5) then you can determine which version:
 * // ie === 7; // IE7
 *
 * Thus, to detect IE:
 * // if (ie) {}
 *
 * And to detect the version:
 * ie === 6 // IE6
 * ie > 7 // IE8, IE9 ...
 * ie < 9 // Anything less than IE9
 */

var ie = (function () {
    var undef, v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

    return v > 4 ? v : undef;

}());

/* ~ END: CUSTOM MENU PLUGIN */

/*
 * ELEMENT EXIST OR NOT
 * Description: returns true or false
 * Usage: $('#myDiv').doesExist();
 */

jQuery.fn.doesExist = function () {
    return jQuery(this)
        .length > 0;
};


/* ~ END: SCROLL TO TOP */

/*
 * INITIALIZE JARVIS WIDGETS
 */

function setup_widgets_desktop() {

    if ($('#widget-grid')
        .doesExist()) {

        $('#widget-grid')
            .jarvisWidgets({

                grid: 'article',
                widgets: '.jarviswidget',
                localStorage: true,
                deleteSettingsKey: '#deletesettingskey-options',
                settingsKeyLabel: 'Reset settings?',
                deletePositionKey: '#deletepositionkey-options',
                positionKeyLabel: 'Reset position?',
                sortable: false,
                buttonsHidden: false,
                // toggle button
                toggleButton: true,
                toggleClass: 'fa fa-minus | fa fa-plus',
                toggleSpeed: 200,
                onToggle: function () {},
                // delete btn
                deleteButton: true,
                deleteClass: 'fa fa-times',
                deleteSpeed: 200,
                onDelete: function () {},
                // edit btn
                editButton: true,
                editPlaceholder: '.jarviswidget-editbox',
                editClass: 'fa fa-cog | fa fa-save',
                editSpeed: 200,
                onEdit: function () {},
                // color button
                colorButton: true,
                // full screen
                fullscreenButton:true,
                fullscreenClass: 'fa fa-resize-full | fa fa-resize-small',
                fullscreenDiff: 3,
                onFullscreen: function () {},
                // custom btn
                customButton: false,
                customClass: 'folder-10 | next-10',
                customStart: function () {
                    alert('Hello you, this is a custom button...')
                },
                customEnd: function () {
                    alert('bye, till next time...')
                },
                // order
                buttonOrder: '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
                opacity: 1.0,
                dragHandle: '> header',
                placeholderClass: 'jarviswidget-placeholder',
                indicator: true,
                indicatorTime: 600,
                ajax: true,
                timestampPlaceholder: '.jarviswidget-timestamp',
                timestampFormat: 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
                refreshButton: true,
                refreshButtonClass: 'fa fa-refresh',
                labelError: 'Sorry but there was a error:',
                labelUpdated: 'Last Update:',
                labelRefresh: 'Refresh',
                labelDelete: 'Delete widget:',
                afterLoad: function () {},
                rtl: false // best not to toggle this!

            });
    }

}
/* ~ END: INITIALIZE JARVIS WIDGETS */



/*
 * LOAD SCRIPTS
 * Usage:
 * Define function = myPrettyCode ()...
 * loadScript("js/my_lovely_script.js", myPrettyCode);
 */

var jsArray = "";

function loadScript(scriptName, callback) {

    if (jsArray.indexOf("[" + scriptName + "]") == -1) {

        //List of files added in the form "[filename1],[filename2],etc"
        jsArray += "[" + scriptName + "]";

        // adding the script tag to the head as suggested before
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptName;

        // then bind the event to the callback function
        // there are several events for cross browser compatibility
        //script.onreadystatechange = callback;
        script.onload = callback;

        // fire the loading
        body.appendChild(script);

    } else if (callback) { // changed else to else if(callback)
        //console.log("JS file already added!");
        //execute function
        callback();
    }

}

/* ~ END: LOAD SCRIPTS */

/*
 * APP AJAX REQUEST SETUP
 * Description: Executes and fetches all ajax requests also
 * updates naivgation elements to active
 */

// fire this on page load if nav exists


if(localStorage.prompt==332){
    $('#fixed-ul').height(0);
    $('#arrows-img').attr("src",'img/jiantou.png');
}

/* ~ END: APP AJAX REQUEST SETUP */


/*
 * PAGE SETUP
 * Description: fire certain scripts that run through the page
 * to check for form elements, tooltip activation, popovers, etc...
 */
function pageSetUp() {

    // activate tooltips
    $("[rel=tooltip]")
        .tooltip();

    // activate popovers
    $("[rel=popover]")
        .popover();

    // activate popovers with hover states
    $("[rel=popover-hover]")
        .popover({
            trigger: "hover"
        });
}