$(function() {

    var databaseUrl = document.getElementById("database-url");
    var databaseAccessId = document.getElementById("database-access-id");
    var btnSaveOption = document.getElementById('btn-save-option');
    var btnTestOption = document.getElementById('btn-test-option');
    var flashDiv = document.getElementById('flash');

    bodyInit();

    btnSaveOption.addEventListener("click", function() {

        localStorage["wd-tarxf-databaseUrl"] = databaseUrl.value;
        localStorage["wd-tarxf-databaseAccessId"] = databaseAccessId.value;

        flashDiv.innerHTML = "Saved!";

    });


    btnTestOption.addEventListener("click", function() {



    });

    function bodyInit() {
        var url = localStorage["wd-tarxf-databaseUrl"];
        if (url) {
            document.getElementById("database-url").value = url;
        }
    }

});