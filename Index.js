var words = ["PENCIL", "BAG", "TABLE", "BOARD", "CHALK", "BOOK", "ERASER", "PAPER"];
var tempWords = [];
var selectedWord = "";

$(document).ready(function () {

    arrangeGame();
    $('.individual').click(function () {
        $(this).addClass("green");
        selectedWord += $(this).text();
        console.log(selectedWord);
    });

    $(document).keyup(function (event) {
        console.log("fun");
        if (event.keyCode === 13) {
            console.log("enter");
            if (words.indexOf(selectedWord) >= 0) {
                $(".green").addClass("purple").removeClass("green");
                $("#hint p").each(function (key, item) {
                    if (selectedWord == $(item).html()){
                        $(this).addClass("purple");
                        $(this).addClass("done");
                    }
                    
                    if ($(".done").length == words.length) {
                        $("#hint").empty();
                        $("#hint").append("<p id= message> Noiceee </p>");
                    }
                });
            }
            else{
                $(".individual").removeClass("green");
            }
            selectedWord = "";

        }
    });
});

function arrangeGame() {
    $.each(words, function (key, item) {
        $("#hint").append("<p>" + item + "</p>");
    });

    for (var i = 1; i <= 12; i++) {
        for (var j = 1; j <= 12; j++) {
            $("#letters").append("<div class=individual data-row=" + i + " data-column=" + j + "></div>");
        }
    }
    placeCorrectLetters(words);
    placeCorrectLetters(tempWords);
    $.each($(".individual"), function (key, item) {
        if ($(item).attr("data-word") == undefined) {
            $(this).html(randomLetter());
        }
    });

}

function randomLetter() {
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabets.charAt(Math.floor(Math.random() * 26));
}

function checkOccupied(word, starting, orientation) {
    var status = "", incrementBy = 0;
    if (orientation == "row") {
        incrementBy = 1;
    }
    else if (orientation == "column") {
        incrementBy = 12;
    }
    else if (orientation == "diagonal") {
        incrementBy = 13;
    }
    for (var p = starting, q = 0; q < word.length; q++) {
        if ($(".individual:eq(" + p + ")").attr("data-word") == undefined)
            status = "empty";
        else {
            status = "occupied";
            break;
        }
        p += incrementBy;
    }
    return status;
}

function placeCorrectLetters(words) {
    var positions = ["row", "column", "diagonal"];
    var newStart = 0, nextLetter = 0;
    for (var i = 0; i < words.length; i++) {
        var orientation = positions[Math.floor(Math.random() * positions.length)];
        var start = Math.floor(Math.random() * $(".individual").length);
        var myRow = $(".individual:eq(" + start + ")").data("row");
        var myColumn = $(".individual:eq(" + start + ")").data("column");
        if (orientation == "row") {
            nextLetter = 1;
            if ((myColumn * 1) + words[i].length <= 12) {
                newStart = start;
            }
            else {
                var newColumn = 12 - words[i].length;
                newStart = $(".individual[data-row=" + myRow + "][data-column=" + newColumn + "]").index();
            }
        }
        else if (orientation == "column") {
            nextLetter = 12;
            if ((myRow * 1) + words[i].length <= 12) {
                newStart = start;
            }
            else {
                var newRow = 12 - words[i].length;
                newStart = $(".individual[data-row=" + newRow + "][data-column=" + myColumn + "]").index();
            }
        }
        else if (orientation == "diagonal") {
            nextLetter = 13;
            if ((myColumn * 1) + words[i].length <= 12 && (myRow * 1) + words[i].length <= 12)
                newStart = start;
            if ((myColumn * 1) + words[i].length > 12) {
                var newColumn = 12 - words[i].length;
                newStart = $(".individual[data-row=" + myRow + "][data-column=" + newColumn + "]").index();
            }
            if ((myRow * 1) + words[i].length > 12) {
                var newRow = 12 - words[i].length;
                newStart = $(".individual[data-row=" + newRow + "][data-column=" + myColumn + "]").index();
            }
            if ((myColumn * 1) + words[i].length > 12 && (myRow * 1) + words[i].length > 12) {
                var newColumn = 12 - words[i].length;
                newStart = $(".individual[data-row=" + myRow + "][data-column=" + newColumn + "]").index();
                var newRow = 12 - words[i].length;
                newStart = $(".individual[data-row=" + newRow + "][data-column=" + myColumn + "]").index();

            }

        }
        var characters = words[i].split("");
        var nextPosition = 0;
        var occupied = checkOccupied(words[i], newStart, orientation);
        if (occupied == "empty") {
            $.each(characters, function (key, item) {
                $(".individual:eq(" + (newStart + nextPosition) + ")").html(item);
                $(".individual:eq(" + (newStart + nextPosition) + ")").html(item).attr("data-word", words[i]);
                // $(".individual:eq(" + (newStart + nextPosition) + ")").css("backgroundColor", "red");

                nextPosition += nextLetter;
            })
        }
        else {
            tempWords.push(words[i]);
        }

    }

}
