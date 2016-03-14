/**
 * 
 */

function Box(dom, value, events) {
	this.value = value;
	this.events = events;
	this.dom = dom;
}

Box.prototype = Object.create(Observer.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function(event, data) {
	console.log(event, data);
	if (this.events.indexOf(event) != -1) {
		this.value = data;
		this.render();
	}
}

Box.prototype.render = function() {
	this.dom.innerHTML = this.value;
}