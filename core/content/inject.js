$(function() {
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

        if (request.action == "getanalyticdata") {
            var username = null,
                username_url,
                current_user_node;

            var html2 = document.getElementById('analytics_tl-table_container');
            if (html2)
                html = html2.innerHTML;

            current_user_node = document.getElementsByClassName("current-user")[0];
            if (current_user_node) {
                username_url = current_user_node.getElementsByTagName('a')[0].getAttribute('href');
                if (username_url) {
                    user = username_url.match(/https?:\/\/(www\.)?twitter\.com\/(#!\/)?@?([^\/]*)/)[3]; //convert https://twitter.com/username
                    if (user) username = user.toLowerCase();
                }
            }

            sendResponse({
                username: username,
                rawhtml: html,
                action: "returndata"
            });
        }


        var scrollActionStatus;
        var docHeight = document.documentElement.scrollHeight;
        var sameHeightDiscovery = 0;

        if (request.action == "scroll") {
            doScroll();
            sendResponse({
                action: "scrollStarted"
            });
        }


        if (request.action == "stopscroll") {
            stopScroll();
            sendResponse({
                action: "scrollStopped"
            });
        }

    });

    var timeAction = 'SKMCJ4DKSM5DSDK';

    function doScroll() {
        window.scrollTo(0, document.body.scrollHeight);
        timeAction = setTimeout(doScroll, 4000);
    }


    function stopScroll() {
        if (timeAction) {
            clearTimeout(timeAction);
            timeAction = 'SKMCJ4DKSM5DSDK';
        }
    }
});