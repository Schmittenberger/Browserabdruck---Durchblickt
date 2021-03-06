
	//this is the shorthand version for redefining the methods, the longer more explicit code is below
	//I decided to shorten the code with this method to avoid long and repeating code sequences
	//based on https://github.com/fingerprintjs/fingerprintjs/blob/master/src/sources/canvas.ts 
	// and https://browserleaks.com/canvas#how-does-it-work

	
	[
	[HTMLCanvasElement.prototype,"toBlob",HTMLCanvasElement.prototype.toBlob],
	[HTMLCanvasElement.prototype,"toDataURL",HTMLCanvasElement.prototype.toDataURL],
	[CanvasRenderingContext2D.prototype,"getImageData",CanvasRenderingContext2D.prototype.getImageData], // used in the Web Never Forgets paper from G. Acar
	[CanvasRenderingContext2D.prototype,"fillText",CanvasRenderingContext2D.prototype.fillText],
	[CanvasRenderingContext2D.prototype,"fillRect",CanvasRenderingContext2D.prototype.fillRect]
	].forEach(function (currentValue, index, array) {
		Object.defineProperty(currentValue[0], currentValue[1], {
		"value": function () {
			let copiedArguments = []
			for(var i =0; i < arguments.length;i++){
				if(typeof arguments[i] != "function")
					copiedArguments[i] = arguments[i]
			}
		  		handleDetection([currentValue[1],copiedArguments],31);	
			return currentValue[2].apply(this, arguments);
		},
		writable:true
		});
	});
	
	//some functions dont take arguments but are assignments (e.g. ctx.font = "14px 'Arial'";)
	//these functions need to be handled differently
	[
	[CanvasRenderingContext2D.prototype,"fillStyle",Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "fillStyle").set],
	].forEach(function (currentValue, index, array) {
		Object.defineProperty(currentValue[0], currentValue[1], {
		set() {
			handleDetection([currentValue[1]],31);
			return currentValue[2].apply(this,arguments);
		},
		configurable:true
		});
	});	
