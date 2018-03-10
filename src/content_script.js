(function() {
    'use strict';
    var DEFAULT_DESIRED_SCROLLBAR_WIDTH = 20;
    var desiredScrollbarWidth = DEFAULT_DESIRED_SCROLLBAR_WIDTH;

    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    function doWork() {
        console.log("WSE: starting wunderlist scrollbar width fix");
        var selectorRegex = new RegExp(escapeRegExp('#wunderlist-base ::-webkit-scrollbar'));
        var widthRegex = /width:/;

        var isSuccessful = false;

        try {
            for (var styleSheetIndex = 0; styleSheetIndex < document.styleSheets.length; styleSheetIndex++) {
                var sheet = document.styleSheets[styleSheetIndex];
                if (sheet.rules) {
                    //console.log("rules: " + sheet.rules.length);
                    for (var i = 0; i < sheet.rules.length; ++i) {
                        var rule = sheet.rules[i];
                        if (selectorRegex.test(rule.cssText) && widthRegex.test(rule.cssText)) {
                            console.log("WSE: found scrollbar width style: " + rule.cssText);
                            sheet.deleteRule(i);
                            sheet.insertRule('#wunderlist-base ::-webkit-scrollbar { width: ' + desiredScrollbarWidth + 'px !important; }', i);
                            isSuccessful = true;
                        }
                    }
                }
            }
        }
        catch (err) {
            console.log(err);
        }

        if (!isSuccessful) {
            setTimeout(doWork, 1000);
        }
    }

    doWork();
})();