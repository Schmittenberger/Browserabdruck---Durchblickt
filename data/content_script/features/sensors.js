	// -----  Sensor checker
	const elistener = window.addEventListener;
	Object.defineProperty(window, "addEventListener", {
	"value": function () {
		switch(arguments[0]){
			case "deviceorientation":
				handleDetection("orientation",5);
				break;
			case "devicemotion":
				handleDetection("motion",5);
				break;
			default:
				break;
		}
	  
	  return elistener.apply(this, arguments);  
	},
	writable:true
	}); 