var Cell = (function() {

    function Cell($dom) {

        var __coordinates = '';

        var _figure = null;

        var _isFigureOn = false;
        var _$dom = $dom;

        var _isActive = false;

        this.getCoordinates = function () {
            return $($dom).attr('id');
        }

        this.setCoordinates = function (coordinates) {
            __coordinates = coordinates;
        }

        this.getFigure = function () {
            return _figure;
        }

        this.setFigure = function (figure) {
            _figure = figure;
        }

        this.isFigureOn = function () {
            return _isFigureOn;
        }

        this.setIsFigureOn = function (isFigureOn) {
            _isFigureOn = isFigureOn;
        }

        this.getDom = function () {
            return _$dom;
        }

        this.setDom = function ($dom) {
            _$dom = $dom;
        }

        this.getIsActive = function () {
            return _isActive;
        }

        this.setIsActive = function (isActive) {
            _isActive = isActive;
        }
    }

    Cell.prototype.active = function () {
        $(this.getDom()).addClass('active');
    }

    Cell.prototype.notActive = function () {
        this.getDom().removeClass('active');
    }



    return Cell;

}())