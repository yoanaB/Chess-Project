var Figure = (function () {

    function Figure($dom, cell, playerID) {

        if (typeof this.constructor === 'Figure') {
            throw new Error('You cannot create instance of Figure!');
        }

        var _cell = cell;

        var _playerID = playerID;

        var _$dom = $dom;

        var _activeCells = [];

        this.getCell = function () {
            return _cell;
        }

        this.setCell = function (cell) {
            _cell = cell;
        }

        this.getIsOpposite = function () {
            return playerID;
        }

        this.setIsOpposite = function (playerID) {
            _playerID = playerID;
        }

        this.getDom = function () {
            return _$dom;
        }

        this.setDom = function ($dom) {
            _$dom = $dom;
        }

        this.getActiveCells = function () {
            return _activeCells;
        }

        this.setActiveCells = function (activeCells) {
            _activeCells = activeCells;
        }

    }

    Figure.prototype.readyToMove = function () {
        throw new Error('You must implement move method!');
    }

    Figure.prototype.makeMirrorMove = function (charCode) {
        var oldPosition = charCode.split(' ')[0];
        var newPosition = charCode.split(' ')[1];
        var oldVerticalIndex = oldPosition.charAt(0);
        var oldHorizontalIndex = oldPosition.charAt(1);
        var newVerticalIndex = newPosition.charAt(0);
        var newHorizontalIndex = newPosition.charAt(1);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var differenceBetweenOldVerticalIndex = oldVerticalIndex.charCodeAt(0) - asciiCodeOfA;
        var differenceBetweenNewVerticalIndex = newVerticalIndex.charCodeAt(0) - asciiCodeOfA;
        var mirrorMove = '';

        oldVerticalIndex = String.fromCharCode(asciiCodeOfH - differenceBetweenOldVerticalIndex);
        newVerticalIndex = String.fromCharCode(asciiCodeOfH - differenceBetweenNewVerticalIndex);

        oldHorizontalIndex = 8 - oldHorizontalIndex + 1;
        newHorizontalIndex = 8 - newHorizontalIndex + 1;

        mirrorMove = oldVerticalIndex + oldHorizontalIndex + ' ' + newVerticalIndex + newHorizontalIndex;
        return mirrorMove;
    }

    Figure.prototype.move = function (board) {
        var currentPosition = this.getCell().getCoordinates();
        var activeCells = this.getActiveCells();
        var self = this;
        var currentCell = self.getCell();
        for(var i = 0; i < activeCells.length; i++){
            (function (activeCell) {
                $(activeCell.getDom()).on('click.moveFigure', function () {
                    
                    //console.log('Clicked!');
                    if(activeCell.getFigure() != null){
                        $(".my-taken-figures").append(activeCell.getFigure().getDom());
                        activeCell.getDom().html(self.getDom());
                    }

                    activeCell.setFigure(self);
                    $(this).append(self.getDom());
                    self.setCell(activeCell);
                    self.setActiveCells([]);
                    currentCell.setFigure(null);
                    //console.log(self);
                    $(currentCell.getDom()).html('');
                    for(var j = 0; j < activeCells.length; j++){
                        activeCells[j].notActive();
                        $(activeCells[j].getDom()).off('click.moveFigure');
                    }

                    var moveCharcode = currentCell.getCoordinates() + ' ' + activeCell.getCoordinates();
                    console.log('move: ' + moveCharcode);
                    //send to server

                    conn.send(self.makeMirrorMove(moveCharcode));

                })
            })(activeCells[i])
        }
        if(activeCells.length > 0){
           $('#flatChessboard').on('click.notInActiveCell', function (event) {
               if (!$(event.target).hasClass('active')) {
                   $('.active').each(function () {
                       $(this).removeClass('active').off('click.moveFigure');;
                   })
               }

               activeCells = [];
           });
        }
    }

    return Figure;

}())

