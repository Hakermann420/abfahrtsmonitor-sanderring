// deletes old data and replaces it with the new data
function generateTable(table, data) {

    // deletes old data in table
    var len = table.rows.length;
    for (var i = 1; i < len; i++) {
        table.deleteRow(1)
    }

    var date;

    var i = 0;

    // inserts new row for each dataset
    // and sets the class name, to make it look striped
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {

            if (key != "datum") {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);

                if (key === "zeit") {
                    text = document.createTextNode(ConvertTimeToTimeLeft(element[key], date));
                }

                cell.appendChild(text);

            } else {
                date = element[key]
            }
        }
        if (i % 2 == 0) {
            row.className = "listelementgrey";
        } else {
            row.className = "listelementwhite";
        }
        i++;
    }
}

// Calculates the time from now to a specified time and date
function ConvertTimeToTimeLeft(time, date) {
    time = time.substring(0, time.indexOf(":") + 3);
    if(time.length < 5){
        time = "0" + time;
    }

    indices = [];
    indices.push(-1);
    for (var i = 0; i < date.length; i++) {
        if (date[i] === ".") indices.push(i);
    }
    indices.push(date.length)

    resdate = "";
    for (var i = indices.length - 1; i >= 0; i--) {
        substr = date.substring(indices[i - 1] + 1, indices[i]);
        if (substr.length === 1) {
            substr = "0" + substr;
        }
        resdate += substr;
        if (i > 1) {
            resdate += "-"
        }
    }
    
    var datetime = new Date(resdate + 'T' + time);
    var now = Date.now()

    if (datetime - now > 900000) {
        return time;
    }
    minutes = Math.floor(((datetime - now) / (1000 * 60)));
    if (minutes < 0) {
        minutes = 0
    }
    return minutes + "'";
}