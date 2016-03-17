var Pawn = (function (parent) {

    function Pawn($dom, cell, isOpposite) {

        Figure.call(this, $dom, cell, isOpposite);
    }
        Pawn.prototype = Object.create(Figure.prototype);
        Pawn.prototype.constructor = Pawn;

        Pawn.prototype.readyToMove = function (board) {

            var cell = this.getCell();
            var position = cell.getCoordinates();
            var horizontal = position.charAt(1);
            var vertical = position.charAt(0);
            var inForwardRight = String.fromCharCode(vertical.charCodeAt(0) + 1) + (parseInt(horizontal) + 1);
            var inForwardLeft = String.fromCharCode(vertical.charCodeAt(0) - 1) + (parseInt(horizontal) + 1);
            console.log(inForwardLeft);
            console.log(inForwardRight);
            var activeCells = [];
            if (board.cellAt(vertical + (parseInt(horizontal) + 1)).getFigure() == null) {
                activeCells.push(board.cellAt(vertical + (parseInt(horizontal) + 1)));
                if (horizontal === '2' && board.cellAt(vertical + (parseInt(horizontal) + 2)).getFigure() == null) {
                    activeCells.push(board.cellAt(vertical + (parseInt(horizontal) + 2)));
                }
            }

            if (inForwardLeft.charCodeAt(0) > 97 && board.cellAt(inForwardLeft).getFigure() !== null && board.cellAt(inForwardLeft).getFigure().getIsOpposite()) {
                activeCells.push(board.cellAt(inForwardLeft));
            }

            if (inForwardRight.charCodeAt(0) < 104 && board.cellAt(inForwardRight).getFigure() !== null && board.cellAt(inForwardRight).getFigure().getIsOpposite()) {
                activeCells.push(board.cellAt(inForwardRight));
            }

            for (var i = 0; i < activeCells.length; i++) {
                activeCells[i].active();
            }

            this.setActiveCells(activeCells);

        }

        return Pawn;


})(Figure || {})

