var Knight = (function(parent){

    function Knight(cell, isOpposite){

        parent.call(this, cell, isOpposite);

    }

    Knight.prototype = Object.create(Figure.prototype);
    Knight.constructor = Knight;

    Knight.prototype.readyToMove = function (board) {
        var cell = this.getCell();
        var position = cell.getCoordinates();
        var horizontal = position.charAt(1);
        var vertical = position.charAt(0);
        var verticalIndex = vertical.charCodeAt(0);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var activeCells = [];

       for(var i = horizontal + 1; i <= horizontal + 2; i++){
           var currentCell = board.cellAt(String.fromCharCode(verticalIndex - (horizontal - i)))
       }
    }

    return Knight;

}(Figure))