
$(function() {

	var btnPullData 		= document.getElementById('btn-pull-data');
	var btnExportCsv 		= document.getElementById('btn-export-csv');
	var btnSaveBtn 			= document.getElementById('btn-save-data');
	var loadingIndicator 	= document.getElementById('loading-indicator');
	var status 				= document.getElementById('status');
	var dataContainer 		= document.getElementById('data-container');
    var username            = document.getElementById('username');

	btnPullData.addEventListener("click", function () {

        loadingIndicator.style.display= 'block';

		chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "getanalyticdata"
            }, function(response) {
                if (response.action == "returndata") {
                    getCurrentUser(response.username);
                    tabulate(response.rawhtml);
                }
            });
        });

        loadingIndicator.style.display = 'none';
	});

	var getCurrentUser = function(data)
	{
        username.value = data;
	}

    var tabulate = function(data) {

        dataContainer.innerHTML = '';
        dataContainer.innerHTML = data;  

        var content,
            content_cleaned,
            tdate, 
            faves, 
            rt, 
            replies, 
            clicks,
            row; 

        table_html = "<thead><tr><th>Content</th><th>Clicks</th><th>Date</th><th>Favourites</th><th>ReTweets</th><th>Replies</th></tr></thead>";
        
    }

});    
