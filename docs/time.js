// Updates the digital clock
function UpdateDigital() {
    timer = document.getElementById("digital");

    var now = Date.now();
    var hour = Math.floor(now / (1000 * 60 * 60) % 24);
    var minute = Math.floor(now / (1000 * 60) % 60);

    var sec = Math.floor(now / (1000) % 60);


    if (sec < 10) {
        sec = "0" + sec;
    }

    if (minute < 10) {
        minute = "0" + minute;
    }

    timer.innerText = hour + 2 + ":" + minute + ":" + sec
}

// Updates the binary clock
function UpdateBinary() {

    var seconds = (new Date().getTime() / 1000) % 60;
    var secstr = Math.floor(seconds).toString(2);

    var minutes = (new Date().getTime() / 60000) % 60;
    var minstr = Math.floor(minutes).toString(2);

    var hours = (new Date().getTime() / 3600000) % 24 + 2;
    var hrstr = Math.floor(hours).toString(2);

    var c = document.getElementById("binary");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    for (var i = 0; i < secstr.length; i++) {
        if (secstr[secstr.length - 1 - i] == '1') {
            ctx.rect(100, 50 + i * 50, 25, 25);
            ctx.fill();
        }
    }

    for (var i = 0; i < minstr.length; i++) {
        if (minstr[minstr.length - 1 - i] == '1') {
            ctx.rect(66, 50 + i * 50, 25, 25);
            ctx.fill();
        }
    }

    for (var i = 0; i < hrstr.length; i++) {
        if (hrstr[hrstr.length - 1 - i] == '1') {
            ctx.rect(33, 50 + i * 50, 25, 25);
            ctx.fill();
        }
    }

    ctx.stroke();
}

// returns a random Color for the clock
// NOTE: this method is not used anymore
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

setInterval(function() {
    UpdateBinary();
    UpdateDigital();
}, 100);