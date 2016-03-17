var Bishop = (function (parent) {

    'use strict';

    function Bishop($dom, cell, isOpposite){

        parent.call(this, $dom, cell, isOpposite);

    }

    Bishop.prototype = Object.create(parent.prototype);
    Bishop.prototype.constructor = Bishop;

    Bishop.prototype.readyToMove = function(board){
        var cell = this.getCell();
        var position = cell.getCoordinates();
        var horizontal = position.charAt(1);
        var vertical = position.charAt(0);
        var verticalIndex = vertical.charCodeAt(0);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var activeCells = [];

        console.log('i am in bishop.readyToMove');
        //debugger;
        for(var i = parseInt(horizontal) + 1, k = verticalIndex - 1; i <= 8 &&  k >= asciiCodeOfA; i++, k--){
            var currentCell = board.cellAt(String.fromCharCode(k) + (parseInt(i)));
            console.log(i);
            if(currentCell.getFigure() === null /*|| (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())*/){
                activeCells.push(currentCell);
            }
            else if((currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
                break;
            }
            else{
                break;
            }
        }

        for(var i = parseInt(horizontal) + 1, k = verticalIndex + 1; i <= 8 &&  k <= asciiCodeOfH; i++, k ++){
            var currentCell = board.cellAt(String.fromCharCode(k) + i);
            if(currentCell.getFigure() === null /*|| (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())*/){
                activeCells.push(currentCell);
            }
            else if((currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
                break;
            }
            else{
                break;
            }
        }

        for(var i = parseInt(horizontal) - 1, k = verticalIndex - 1; i >= 1 &&  k >= asciiCodeOfA; i--, k --){
            var currentCell = board.cellAt(String.fromCharCode(k) + i);
            if(currentCell.getFigure() === null /*|| (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())*/){
                activeCells.push(currentCell);
            }
            else if((currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
                break;
            }
            else{
                break;
            }
        }

        for(var i = parseInt(horizontal) - 1, k = verticalIndex + 1; i >= 1 &&  k <= asciiCodeOfH; i--, k ++){
            var currentCell = board.cellAt(String.fromCharCode(k) + i);
            if(currentCell.getFigure() === null /*|| (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())*/){
                activeCells.push(currentCell);
            }
            else if((currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
                break;
            }
            else{
                break;
            }
        }

        for (var i = 0; i < activeCells.length; i++) {
            activeCells[i].active();
        }

        this.setActiveCells(activeCells);

        return activeCells;
    }

    return Bishop;

}(Figure))