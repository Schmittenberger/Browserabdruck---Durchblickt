	
	//Battery api checker battery
	//check if it is supported by browser first
	if (typeof navigator.getBattery === "function") {
		const batGet = navigator.__proto__.getBattery;
		Object.defineProperty(navigator.__proto__, "getBattery", {
			"value": function () {
				handleDetection("battery",1);
				return batGet.apply(this, arguments);
			}
		}); 
	}

	