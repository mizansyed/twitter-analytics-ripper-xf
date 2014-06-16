$(function() {

    var databaseUrl = document.getElementById("database-url");
    var databaseAccessId = document.getElementById("database-access-id");
    var reportingToolUrl = document.getElementById("reporting-tool-url");
    var btnSaveOption = document.getElementById('btn-save-option');
    var btnTestOption = document.getElementById('btn-test-option');
    var flashDiv = document.getElementById('flash');

    bodyInit();

    btnSaveOption.addEventListener("click", function() {

        localStorage["wd-tarxf-databaseUrl"] = databaseUrl.value;
        localStorage["wd-tarxf-databaseAccessId"] = databaseAccessId.value;
        localStorage["wd-tarxf-reportingToolUrl"] = reportingToolUrl.value;
        flashMessage("Option Saved!", "error")
    });


    btnTestOption.addEventListener("click", function() {



    });

    function bodyInit() {
        var url = localStorage["wd-tarxf-databaseUrl"];
        if (url) {
            document.getElementById("database-url").value = url;
        }
    }

    $.ajax({
        statusCode: {
            403: function() {
                alert("Forbidden");
            }
        }
    });


    flashMessage = function(message, type) {
        type = typeof type !== 'undefined' ? type : 'default';
        flashDiv.innerHTML = message;
        flashDiv.className = type
    }

});