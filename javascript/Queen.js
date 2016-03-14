var Queen = (function (parent) {

    function Queen($dom, cell, isOpposite){

        parent.call(this, $dom, cell, isOpposite);

    }

    Queen.prototype = Object.create(parent.prototype);
    Queen.prototype.constructor = Queen;

    Queen.prototype.readyToMove = function (board) {

        /*(new Rook).readyToMove(board);
        (new Bishop).readyToMove(board);*/


    }

    return Queen;

}(Figure))