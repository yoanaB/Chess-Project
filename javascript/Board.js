var Board = (function () {
    'use strict'

    function Board($dom){

        var CHESSBOARD_CELLS_ROW = 8;

        var _cells = [];

        var _$dom = $dom;

        this.getCells = function () {
            return _cells;
        }

        this.setCells = function (cells) {
            _cells = cells;
        }

        this.getDom = function () {
            return _$dom;
        }

        this.setDom = function ($dom) {
            _$dom = $dom;
        }

        this.getChessboardCellsRow = function () {
            return CHESSBOARD_CELLS_ROW;
        }
    }

    Board.prototype.initializeCells = function () {

        var horizontals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        var whites = {
            Pawn: '&#9817',
            Bishop: '&#9815;',
            Rook: '&#9814;',
            Knight: '&#9816;',
            King: '&#9812;',
            Queen: '&#9813;'
        }

        var blacks = {
            Pawn: '&#9823;',
            Bishop: '&#9821;',
            Rook: '&#9820;',
            Knight: '&#9822;',
            King: '&#9818;',
            Queen: '&#9819;'
        }

        var arrayIndex = Math.round(Math.random());

        /*$.ajax({
            url: 'api/randomIndex.php',
            method: 'GET'
        }).done(function(data){
            arrayIndex = data;
        })
*/
       // console.log(arrayIndex);

        var figuresArray = [whites, blacks];

        var cells = this.getCells();

        for(var i = 0; i < this.getChessboardCellsRow(); i++){
            cells[i] = [];
            for(var j = 0; j <  horizontals.length; j++){
                var index = horizontals[j] + (i + 1);
                var cell = new Cell($('#' + index));
                var figure = document.createElement("span"),
                    $figure = $(figure);
                $figure.addClass('figure');
                if(i == 1){
                    $figure.html(figuresArray[arrayIndex].Pawn);
                    var pawn = new Pawn($figure, cell, 0);
                    cell.getDom().html($figure);
                    cell.setFigure(pawn);
                }
                if(i == 6){
                    $figure.html(figuresArray[+ !arrayIndex].Pawn)
                    var pawn = new Pawn($figure, cell, 1);
                    cell.getDom().html($figure);
                    cell.setFigure(pawn);
                }

                if(i == 0){
                    if(j == 0 || j == 7){
                        $figure.html(figuresArray[arrayIndex].Rook);
                        var rook = new Rook($figure, cell, 0);
                        cell.getDom().html($figure);
                        cell.setFigure(rook);
                    }

                    if(j == 1 || j == 6){
                        $figure.html(figuresArray[arrayIndex].Knight);
                        var knight = new Knight($figure, cell, 0);
                        cell.getDom().html($figure);
                        cell.setFigure(knight);
                    }
                    if(j == 2 || j == 5){
                        $figure.html(figuresArray[arrayIndex].Bishop);
                        var bishop = new Bishop($figure, cell, 0);
                        cell.getDom().html($figure);
                        cell.setFigure(bishop);
                    }
                    if(j == 3){
                        $figure.html(figuresArray[arrayIndex].Queen);
                        var queen = new Queen($figure, cell, 0);
                        cell.getDom().html($figure);
                        cell.setFigure(queen);
                    }
                    if(j == 4){
                        $figure.html(figuresArray[arrayIndex].King);
                        var king = new King($figure, cell, 0);
                        cell.getDom().html($figure);
                        cell.setFigure(king);
                    }

                }
                if(i == 7){
                    if(j == 0 || j == 7){
                        $figure.html(figuresArray[+ !arrayIndex].Rook);
                        var rook = new Rook($figure, cell, 1);
                        cell.getDom().html($figure);
                        cell.setFigure(rook);
                    }

                    if(j == 1 || j == 6){
                        $figure.html(figuresArray[+ !arrayIndex].Knight);
                        var knight = new Knight($figure, cell, 1);
                        cell.getDom().html($figure);
                        cell.setFigure(knight);
                    }
                    if(j == 2 || j == 5){
                        $figure.html(figuresArray[+ !arrayIndex].Bishop);
                        var bishop = new Bishop($figure, cell, 1);
                        cell.getDom().html($figure);
                        cell.setFigure(bishop);
                    }
                    if(j == 3){
                        $figure.html(figuresArray[+ !arrayIndex].Queen);
                        var queen = new Queen($figure, cell, 1);
                        cell.getDom().html($figure);
                        cell.setFigure(queen);
                    }
                    if(j == 4){
                        $figure.html(figuresArray[+ !arrayIndex].King);
                        var king = new King($figure, cell, 1);
                        cell.getDom().html($figure);
                        cell.setFigure(king);
                    }
                }
                cell.setCoordinates(index);
                cells[i][j] = cell;
            }
        }

        this.setCells(cells);

    }

    Board.prototype.cellAt = function (position) {
        var found = false;
        var cell = {};
        for(var i = 0; i < this.getChessboardCellsRow(); i++){
            for(var j = 0; j < this.getChessboardCellsRow(); j++){
                if(this.getCells()[i][j].getCoordinates() === position){
                    found = true;
                    cell = this.getCells()[i][j];
                    break;
                }
            }
        }

        return cell;
    }

    Board.prototype.initializeFigures = function () {
        var self = this;
        var cells = this.getCells();
        for(var i = 0; i < this.getChessboardCellsRow(); i++){
            for(var j = 0; j < this.getChessboardCellsRow(); j++){
                var index = cells[i][j].getCoordinates();
                var cell = cells[i][j];

                (function (cell){
                    var cellDom = cell.getDom();
                    $(cellDom).on('click.cell', function(event){
                        if (cell.getFigure() && !cell.getFigure().getIsOpposite() ) {
                            event.stopPropagation();
                            cell.getFigure().readyToMove(self);
                            cell.getFigure().move(self);
                        }

                    });

                })(cell);

            }
        }


    }

    Board.prototype.updateFigurePosition = function(charCode){
        var oldPosition = charCode.split(' ')[0];
        var newPosition = charCode.split(' ')[1];

        var oldCell = this.cellAt(oldPosition);
        var newCell = this.cellAt(newPosition);

        if (newCell.getFigure() != null && !newCell.getFigure().getIsOpposite()) {
            $(newCell.getDom()).empty().append(oldCell.getFigure().getDom());
            $('.opposite-taken-figures').append(newCell.getFigure().getDom().clone());
            newCell.setFigure(oldCell.getFigure());
            oldCell.setFigure(null);
            $(oldCell.getDom()).empty();

            //update figures status here
        } else {
            $(newCell.getDom()).append(oldCell.getFigure().getDom());
            newCell.setFigure(oldCell.getFigure());
            oldCell.setFigure(null);
            $(oldCell.getDom()).empty();
        }
    }

    return new Board();

}())