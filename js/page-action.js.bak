$(function() {


    $('#hit-me').click(function() {
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


    $('#sort-me').click(function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "activatesort"
            }, function(response) {

            });
        });
    });


    var tabulate = function(data) {

        $("#dumphtml").empty();
        $("#dumphtml").append(data);
      
        var content,
            content_cleaned,
            tdate, 
            faves, 
            rt, 
            replies, 
            clicks,
            row; 

        var t_output = "";    

        t_output = "<thead><tr><th>Content</th><th>Clicks</th><th>Date</th><th>Favourites</th><th>ReTweets</th><th>Replies</th></tr></thead>";

        $("#analytics_tl tbody tr").each(function() {
            var $this = $(this);
            content = $this.find(".entry-content").html();
            content_cleaned = content;
            if (content) {
                //added this to rip out <span> tag which has number of clicks within content
                content_cleaned = content.replace(/<span class="status-label analytics_tl-link_count tooltip".*>(.*)<\/span>/g, "");
            } else {
                return true;
            }


            tdate = $this.find("span .timestamp").html();
            faves = $this.find(".analytics_tl-faves span").html();
            rt = $this.find(".analytics_tl-retweets span").html();
            replies = $this.find(".analytics_tl-replies span").html();
            clicks = $this.find(".analytics_tl-link_count").html();
            row = "<tr><td>" + content_cleaned + "</td><td> " + clicks + "</td><td> " + tdate + "</td><td>" + faves + "</td><td>" + rt + "</td><td> " + replies + "</td></tr>";
            t_output += row;
        });

        $("#out_html").append("<table class='table' id='out_tbl'>" + t_output + "</table>");

        //make the table sortable
        $("#out_tbl").tableSort({
            animation: 'none',
            speed: 0
        });

        //display the export button now
        $("#export-csv").show();
    }


    var exportTableToCSV = function($table, filename) {

        var $rows = $table.find('tr:has(td)');

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        var tmp_col_delimiter = String.fromCharCode(11); // vertical tab character
        var tmp_row_delimiter = String.fromCharCode(0); // null character

        var col_delimiter = '","';
        var row_delimiter = '"\r\n"';

        // Grab text from table into CSV formatted string
        var csv = '"' + $rows.map(function(i, row) {

            var $row = $(row);
            var $cols = $row.find('td');

            return $cols.map(function(j, col) {
                var $col = $(col);
                var text = $col.text();

                return text.replace('"', '""'); // escape double quotes

            }).get().join(tmp_col_delimiter);

        }).get().join(tmp_row_delimiter)
            .split(tmp_row_delimiter).join(row_delimiter)
            .split(tmp_col_delimiter).join(col_delimiter) + '"';

        var csv_data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        $(this).attr({
            'download': filename,
            'href': csv_data,
            'target': '_blank'
        });
    };


    $("#export-csv").on('click', function(e) {
        exportTableToCSV.apply(this, [$('#out_tbl'), 'export.csv']);
    });


    $("#dumphtml").hide();

});