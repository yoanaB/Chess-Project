var Rook = (function (parent) {
   
    function Rook($dom, cell, isOpposite){

        parent.call(this, $dom, cell, isOpposite);
        
    }

    Rook.prototype = Object.create(parent.prototype);
    Rook.prototype.constructor = Rook;
    
    Rook.prototype.readyToMove = function (board) {
        var cell = this.getCell();
        var position = cell.getCoordinates();
        var horizontal = position.charAt(1);
        var vertical = position.charAt(0);
        var verticalIndex = vertical.charCodeAt(0);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var activeCells = [];
        console.log('i am in rook');
        var i = parseInt(horizontal) - 1;
        console.log(i);
        for(var i = parseInt(horizontal) - 1; i > 0; i--){
            console.log(vertical + i);
            if(board.cellAt(vertical + i).getFigure() == null || board.cellAt(vertical + i).getFigure().getIsOpposite()){
                activeCells.push(board.cellAt(vertical + i));
            }
            else{
                break;
            }
        }
        for(var i = parseInt(horizontal) + 1; i <= 8; i++){
            console.log(vertical + (i));
            console.log(board.cellAt(vertical + (i)).getFigure());
            if(board.cellAt(vertical + (i)).getFigure() == null || board.cellAt(vertical + (i)).getFigure().getIsOpposite()){
                console.log('pushed');
                activeCells.push(board.cellAt(vertical + i));
            }
            else{
                break;
            }
        }

        for(var i = verticalIndex - 1; i >= asciiCodeOfA; i--){
            var currentVertical = String.fromCharCode(i);
            if(board.cellAt(currentVertical + horizontal).getFigure() == null || board.cellAt(currentVertical + horizontal).getFigure().getIsOpposite()){
                activeCells.push(board.cellAt(currentVertical + horizontal));
            }
            else{
                break;
            }
        }
        for(var i = verticalIndex + 1; i <= asciiCodeOfH; i++){
            var currentVertical = String.fromCharCode(i);
            if(board.cellAt(currentVertical + horizontal).getFigure() == null || board.cellAt(currentVertical + horizontal).getFigure().getIsOpposite()){
                activeCells.push(board.cellAt(currentVertical + horizontal));
            }
            else{
                break;
            }
        }

        for (var i = 0; i < activeCells.length; i++) {
            activeCells[i].active();
        }

        return activeCells;
    }

    return Rook;

}(Figure))