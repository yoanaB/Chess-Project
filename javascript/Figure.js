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

    Figure.prototype.move = function (board) {
        var activeCells = this.getActiveCells();
        var self = this;
        var currentCell = self.getCell();
        for(var i = 0; i < activeCells.length; i++){
            (function (activeCell) {
                $(activeCell.getDom()).on('click.moveFigure', function () {
                    //console.log('Clicked!');
                    if(activeCell.getFigure() != null){
                        $(".my-taken-figures").append('span').html(activeCell.getFigure().getDom());
                        activeCell.getDom().html(self.getDom());
                    }
                    activeCell.setFigure(self);
                    $(this).append(self.getDom());
                    self.setCell(activeCell);
                    self.setActiveCells([]);
                    currentCell.setFigure(null);
                    console.log(self);
                    $(currentCell.getDom()).html('');
                    for(var j = 0; j < activeCells.length; j++){
                        activeCells[j].notActive();
                        $(activeCells[j].getDom()).off('click.moveFigure');
                    }
                })
            })(activeCells[i])
        }
        if(activeCells.length > 0){
            for(var i = 0; i < 8; i ++){
                for(var j = 0; j < 8; j++){
                    var currentCell = board.getCells()[i][j];
                    (function (currentCell){
                        if(!currentCell.getDom().hasClass('active')){
                            $(currentCell.getDom()).on('click', function(){
                                for(var k = 0; k < activeCells.length; k++){
                                    $(activeCells[k].getDom()).removeClass('active');
                                }
                            })
                        }
                    }(currentCell))
                }
            }
        }

    }

    return Figure;

}())

