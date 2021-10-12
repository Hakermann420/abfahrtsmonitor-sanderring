// creates a temporary opject with the inner text of the table
// and parses the data inside the table to a workable list
function ConvertDataToArr(data) {
    var htmlContent = data; // a response via AJAX containing HTML
    var e = document.createElement('div');
    e.setAttribute('style', 'display: none;');
    e.setAttribute('id', 'remove');
    e.innerHTML = htmlContent;

    document.body.appendChild(e);
    var table = document.getElementById("departureMonitor");

    var array = []

    for (let element of table.rows) {
        children = element.childNodes;
        if(children.length > 2){
            subarr = {
                datum: children[0].textContent,
                zeit: children[1].textContent.substring(0, 5),
                linie: children[2].textContent,
                richtung: children[3].textContent
            };
            array.push(subarr);
        }
    }
    array.shift();
    array.sort(function(a,b){
        return (a.zeit > b.zeit) ? 1 : (b.zeit > a.zeit) ? -1 : 0
    });
    e.remove();
    return array;
}

// requests the data from txt.bayern-fahrplan.de
// and calls methods to apply the data to the table
function Get() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var hour = String(today.getHours()).padStart(2, '0');
    var min = String(today.getMinutes()).padStart(2, '0');
    today = yyyy + mm + dd;

    var url = 'http://txt.bayern-fahrplan.de/textversion/bcl_abfahrtstafel?itdLPxx_bcl=true';
    var formData = {
        anyMaxSizeHitList: 12,
        limit: 17,
        coordListOutputFormat: 'STRING',
        useRealtime: 1,
        zope_command: 'not_set',
        itdLPxx_bcl: 'true',
        type_dm: 'any',
        deleteAssignedStops: '1',
        mode: 'direct',
        //itdTimeHour: hour,
        //itdTimeMinute: min,
        itdTime: hour+min,
        itdDate: today,
        name_dm: '3700348' //HaltestelleId von Würzburg Sanderring
    };


    var finalUrl = 'https://michiapi.tk/cors/?url=' + url;

    $.post(finalUrl, formData).done(function(data) {

        var data = ConvertDataToArr(data);
        let table = document.querySelector("table");
        generateTable(table, data);
    });
}

Get();
setInterval(Get, 60000);
