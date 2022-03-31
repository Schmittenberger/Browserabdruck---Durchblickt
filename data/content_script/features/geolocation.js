
	//Geolocation Checker
	try{
		if (navigator) {
			if (navigator.geolocation) {
			//this const has to be declared here after checking if geolocation is accepted!!
			const getCurrentPosition = navigator.geolocation.__proto__.getCurrentPosition;
			  if (navigator.geolocation.__proto__) {
				Object.defineProperty(navigator.geolocation.__proto__, "getCurrentPosition", {
				  "value": function () {
					handleDetection("geolocation",1);
					return getCurrentPosition.apply(this, arguments);
				  }
				});
				
				//watchPosition() is also used to get a users location
				Object.defineProperty(navigator.geolocation.__proto__, "watchPosition", {
				  "value": function () {
					handleDetection("geolocation",1)
					return getCurrentPosition.apply(this, arguments);
				  }
				});
			  }
			}
		}
	}
	catch{
		// console.log("navigator failed");
	}
