$(function() {

    var btnPullData = document.getElementById('btn-pull-data');
    var btnExportCsv = document.getElementById('btn-export-csv');
    var btnSaveBtn = document.getElementById('btn-save-data');
    var loadingIndicator = document.getElementById('loading-indicator');
    var status = document.getElementById('status');
    var dataContainer = document.getElementById('data-container');
    var dataTable = document.getElementById('data-table');
    var username = document.getElementById('username');
    var btnScroll = document.getElementById('btn-scroll');



    bodyInit();


    function bodyInit() {
        var url = localStorage["wd-tarxf-databaseUrl"];
        if (url) {
            btnSaveBtn.disabled = true;
        }
    }


    btnPullData.addEventListener("click", function() {

        btnScroll.disabled = true;
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
        btnScroll.disabled = false;
    });


    btnScroll.addEventListener("click", function() {


        var scrollAction = (btnScroll.firstChild.data == "Stop Scrolling") ? "stopscroll" : "scroll";

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {

            btnScroll.firstChild.data = "Stop Scrolling";
            btnPullData.disabled = true;

            chrome.tabs.sendMessage(tabs[0].id, {
                action: scrollAction
            }, function(response) {
                if (response.action == "scrollStarted") {

                } else if (response.action == "scrollStopped") {
                    btnScroll.firstChild.data = "Autoscroll";
                    btnPullData.disabled = false;
                }
            });

        });
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

        if (tweetsRows && tweetsRows.length) {
            var rowNodes = "";

            rowNodes = "<thead><tr><th>Tweet</th><th>Clicks</th><th>Date</th><th>Favourites</th><th>ReTweets</th><th>Replies</th></tr></thead>";
            rowNodes += "<tbody>";
            tweetsRowsLength = tweetsRows.length;
            for (i = 0; i < tweetsRowsLength; i++) {
                rowNodes += processRow(tweetsRows[i]);
            }
            rowNodes += "</tbody>"
            dataTable.innerHTML = "<table class='table' id='out_tbl'>" + rowNodes + "</table>";
        } else {
            dataTable.innerHTML = "<p class='error-text'>Unable to pull data</p>";
        }
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

        //tdate = $(thisRow).find("span .timestamp").html();

        tdateEl = thisRow.querySelector("span .timestamp");
        if (tdateEl) tdate = formatDateToGMT(tdateEl.innerHTML);

        favesEl = thisRow.querySelector(".analytics_tl-faves span");
        if (favesEl) faves = favesEl.innerHTML;

        rtEl = thisRow.querySelector(".analytics_tl-retweets span");
        if (rtEl) rt = rtEl.innerHTML;

        repliesEl = thisRow.querySelector(".analytics_tl-replies span")
        if (repliesEl) replies = repliesEl.innerHTML;

        clicksEl = thisRow.querySelector(".analytics_tl-link_count")
        if (clicksEl) clicks = clicksEl.innerHTML;
        if (empty(clicks)) clicks = "NA";
        clicks = clicks.replace(" clicks", "");

        return rowNode = "<tr><td>" + contentCleaned + "</td><td> " + clicks + "</td><td> " + tdate + "</td><td>" + faves + "</td><td>" + rt + "</td><td> " + replies + "</td></tr>";

    };


    var updateStatus = function(message, status) {
        dataTable.innerHTML = "<div class='" + status + "'><p class='" + status + "'>" + message + "</p></div>";
    };


    var formatDateToGMT = function(data) {
        if (data.search('ago') == -1) {
            data = data.replace(" Pacific time", " PST");
            var date = Date.parse(data);
            return formattedDate = new Date(date);
        } else {
            return data;
        }
    }


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
    function q(selector, ctx) {
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