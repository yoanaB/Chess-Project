var conn = new WebSocket('ws://localhost:8088');
conn.onopen = function(e) {
    console.log("Connection established!");
};

conn.onmessage = function(e) {
    Board.updateFigurePosition(e.data);
};

var play = (function(){

    $(document).ready(function () {
        Board.initializeCells();
        Board.initializeFigures();

    });

}())

