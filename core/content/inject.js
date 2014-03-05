$(function() {
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

        if (request.action == "getanalyticdata") {
            var html = $('#analytics_tl-table_container').html();
            sendResponse({
                rawhtml: html,
                action: "returndata"
            });
        }
    });
});