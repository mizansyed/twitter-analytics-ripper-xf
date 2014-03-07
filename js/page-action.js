$(function() {

    var btnPullData = document.getElementById('btn-pull-data');
    var btnExportCsv = document.getElementById('btn-export-csv');
    var btnSaveBtn = document.getElementById('btn-save-data');
    var loadingIndicator = document.getElementById('loading-indicator');
    var status = document.getElementById('status');
    var dataContainer = document.getElementById('data-container');
    var dataTable = document.getElementById('data-table');
    var username = document.getElementById('username');

    btnPullData.addEventListener("click", function() {

        loadingIndicator.style.display = 'block';

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


    var getCurrentUser = function(data) {
        //if (username.value)
        username.value = data;
    };


    var tabulate = function(data) {

        dataContainer.innerHTML = '';
        dataContainer.innerHTML = data;
        dataContainer.style.display = 'none';



        var tweetsRows = $("#analytics_tl tbody tr");
        var rowNodes = "";

        rowNodes = "<thead><tr><th>Tweet</th><th>Clicks</th><th>Date</th><th>Favourites</th><th>ReTweets</th><th>Replies</th></tr></thead>";

        tweetsRowsLength = tweetsRows.length;
        for (i = 0; i < tweetsRowsLength; i++) {
            rowNodes += processRow(tweetsRows[i]);
        }

        dataTable.innerHTML = "<table class='table' id='out_tbl'>" + rowNodes + "</table>";
    };


    var processRow = function(row) {
        var thisRow = row;
        var content,
            contentCleaned,
            tdate,
            faves,
            rt,
            replies,
            clicks,
            rowNode;


        var entryContentEl = thisRow.getElementsByClassName("entry-content")[0];
        if (entryContentEl) content = entryContentEl.innerHTML;
        contentCleaned = content;

        if (content) {
            //added this to rip out <span> tag which has number of clicks within content
            contentCleaned = content.replace(/<span class="status-label analytics_tl-link_count tooltip".*>(.*)<\/span>/g, "");
        } else {
            return true;
        }

        tdate = $(thisRow).find("span .timestamp").html();
        faves = $(thisRow).find(".analytics_tl-faves span").html();
        rt = $(thisRow).find(".analytics_tl-retweets span").html();
        replies = $(thisRow).find(".analytics_tl-replies span").html();

        clicks = $(thisRow).find(".analytics_tl-link_count").html();
        if (empty(clicks)) clicks = "NA";
        clicks = clicks.replace(" clicks", "");

        return rowNode = "<tr><td>" + contentCleaned + "</td><td> " + clicks + "</td><td> " + tdate + "</td><td>" + faves + "</td><td>" + rt + "</td><td> " + replies + "</td></tr>";

    };


    var updateStatus = function(message) {

    };


    var empty = function(data) {
        if (typeof(data) == 'number' || typeof(data) == 'boolean') {
            return false;
        }
        if (typeof(data) == 'undefined' || data === null) {
            return true;
        }
        if (typeof(data.length) != 'undefined') {
            return data.length == 0;
        }
        var count = 0;
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                count++;
            }
        }
        return count == 0;
    };


    //taken and adpated from http://www.lucaongaro.eu/blog/2012/11/26/dom-selection-without-jquery/
    var q = function(selector, ctx) {
        ctx = ctx || document;

        // Return methods for lazy evaluation of the query
        return {

            // Return array of all matches
            all: function() {
                var list, ary = [];
                list = ctx.querySelectorAll(selector);
                for (var i = 0; i < list.length; i++) {
                    ary[i] = list[i];
                }
                return ary;
            },

            // Return first match
            first: function() {
                return ctx.querySelector(selector);
            },

            // Return last match
            last: function() {
                var list = ctx.querySelectorAll(selector);
                return list.length > 0 ? list[list.length - 1] : null;
            }

        };

    }

});