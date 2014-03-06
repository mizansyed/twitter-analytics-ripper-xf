$(function() {
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

        if (request.action == "getanalyticdata") {
        	var username = null,
        		username_url,
        		current_user_node;

        	//console.time('jquery');
            //	var html = $('#analytics_tl-table_container').html();
            //console.timeEnd('jquery');

        	//console.time('native');
            	var html2 = document.getElementById('analytics_tl-table_container');
            	if (html2)
            		html = html2.innerHTML;
            //console.timeEnd('native');

            current_user_node = document.getElementsByClassName("current-user")[0];
            if (current_user_node){       
            	username_url = current_user_node.getElementsByTagName('a')[0].getAttribute('href');
            	if (username_url){
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
    });
});