$(function() {

	var btnPullData 		= document.getElementById('btn-pull-data');
	var btnExportCsv 		= document.getElementById('btn-export-csv');
	var btnSaveBtn 			= document.getElementById('btn-save-data');
	var loadingIndicator 	= document.getElementById('loading-indicator');
	var status 				= document.getElementById('status');
	var dataContainer 		= document.getElementById('data-container');


	btnPullData.addEventListener("click", function () {
		alert('test');
		chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "getanalyticdata"
            }, function(response) {
                if (response.action == "returndata") {
                    tabulate(response.rawhtml);
                }
            });
        });
	});

	var getCurrentUser = function(data)
	{
		
	}

    var tabulate = function(data) {

        dataContainer.innerHTML = '';
        dataContainer.innerHTML = data;
    }

});