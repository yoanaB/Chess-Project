var King = (function (parent) {

    function King($dom, cell, playerID){

        parent.call(this, $dom, cell, playerID);
    }

    King.prototype = Object.create(parent.prototype);
    King.prototype.constructor = King;

    King.prototype.readyToMove = function(board){
        var cell = this.getCell();
        var position = cell.getCoordinates();
        var horizontal = position.charAt(1);
        var vertical = position.charAt(0);
        var verticalIndex = vertical.charCodeAt(0);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var activeCells = [];

        if(board.cellAt(String.fromCharCode(verticalIndex + 1) + horizontal) != undefined){
            activeCells.push(board.cellAt(String.fromCharCode(verticalIndex + 1) + horizontal));
        }
        if(board.cellAt(String.fromCharCode(verticalIndex - 1) + horizontal) != undefined){
            activeCells.push(board.cellAt(String.fromCharCode(verticalIndex - 1) + horizontal));
        }
        for(var i = verticalIndex - 1; i < verticalIndex + 3; i++){
            if(board.cellAt(String.fromCharCode(i) + (horizontal - 1)) != undefined){
                activeCells.push(board.cellAt(String.fromCharCode(i) + (horizontal - 1)));
            }
        }
        for(var i = verticalIndex - 1; i < verticalIndex + 3; i++){
            if(board.cellAt(String.fromCharCode(i) + (horizontal + 1)) != undefined){
                activeCells.push(board.cellAt(String.fromCharCode(i) + (horizontal + 1)));
            }
        }
       /* for (var i = 0; i < activeCells.length; i++) {
            activeCells[i].active();
        }*/
    }

    return King;

}(Figure))