/*
 * File:   ui-point.js
 * Author: Li XianJing <xianjimli@hotmail.com>
 * Brief:  foot print
 * 
 * Copyright (c) 2014 - 2015  Li XianJing <xianjimli@hotmail.com>
 * 
 */

function UIPoint() {
	return;
}

UIPoint.prototype = new UIElement();
UIPoint.prototype.isUIPoint = true;

UIPoint.prototype.initUIPoint = function(type, w, h, bg) {
	this.initUIElement(type);	

	this.setDefSize(w, h);
	this.setTextType(Shape.TEXT_NONE);
	this.images.display = UIElement.IMAGE_DISPLAY_CENTER;
	this.setImage(UIElement.IMAGE_DEFAULT, bg);

	return this;
}

UIPoint.prototype.paintSelfOnly = function(canvas) {
	var fillIt = !this.isFillColorTransparent();
	var strokeIt = !this.isStrokeColorTransparent();

	if(fillIt || strokeIt) {
		var x = this.w >> 1;
		var y = this.h >> 1;
		canvas.beginPath();
		canvas.arc(x, y, 10, 0, 2 * Math.PI);
		
		if(fillIt) {
			canvas.fillStyle = this.style.fillColor;
			canvas.fill();
		}

		if(strokeIt) {
			canvas.strokeStyle = this.style.lineColor;
			canvas.lineWidth = this.style.lineWidth;
			canvas.stroke();
		}

		if(this.showIndex) {
			canvas.font = "12px";
			canvas.textAlign = "center";
			canvas.textBaseline = "middle";
			canvas.fillStyle = this.style.textColor || "Black";
			canvas.fillText(this.getIndex(), x, y);
		}
	}

	return;
}

UIPoint.prototype.setShowIndex = function(showIndex) {
	this.showIndex = showIndex;

	return this;
}

UIPoint.prototype.isUserResizable = function() {
	return false;
}

UIPoint.prototype.shapeCanBeChild = function(shape) {
	return false;
}

function UIPointCreator() {
	var args = ["ui-point", "ui-point", null, 1];
	
	ShapeCreator.apply(this, args);
	this.createShape = function(createReason) {
		var g = new UIPoint();
		return g.initUIPoint(this.type, 20, 20, null);
	}
	
	return;
}

ShapeFactoryGet().addShapeCreator(new UIPointCreator());

