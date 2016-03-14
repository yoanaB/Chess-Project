var play = (function(){

    $(document).ready(function () {
        Board.initializeCells();
        Board.initializeFigures();

    });

    //
    //function initializeFigures(){
    //    var CELLS_AT_ROW = 8;
    //
    //    //initialize pawns
    //    for(var i = 0; i < CELLS_AT_ROW; i++){
    //        var myCell = Board.getCells()[1][i];
    //        var pawn = new Pawn(myCell, 0);
    //        myCell.setFigure(pawn);
    //        var oppositeCell = Board.getCells()[6][i];
    //        var otherPawn = new Pawn(oppositeCell, 1);
    //        oppositeCell.setFigure(otherPawn);
    //    }
    //
    //    for(var i = 0; i < CELLS_AT_ROW; i++){
    //        var firstCell = Board.getCells()[0][i];
    //        if(i == 0){
    //            var rook = new Rook(myCell, 0);
    //
    //        }
    //
    //    }
    //}

    //return{
    //    initializeCells: initializeCells,
    //    initializeFigures: initializeFigures
    //}

}())

