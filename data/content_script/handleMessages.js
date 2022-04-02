var __upperLimitObject_JSFL0__ = {}
const __upperLimitSending_JSFL0__ = 10

//optionally insert the value the detected function returns
function handleDetection(method,flagNumber){
	let payload = {
		"url":document.URL,
		"flag":flagNumber, 
		// 0 = flow control, info message like site visit
		// 1 = (general) detection of js function
		// 3 = fingerprinting
		// 5 = sensors
		//10 = injecting script into site was succesful
		"method":method,
		"source":"site"
	};
	let newMethod = "";
	if(typeof method == "object" && method.length > 0){
		newMethod = method[0];
	} else{
		newMethod = method;
	}

	if (typeof __upperLimitObject_JSFL0__[newMethod] == "undefined") {
		__upperLimitObject_JSFL0__[newMethod] = 0;
		sendToExtension(payload);
	}
	else {
		__upperLimitObject_JSFL0__[newMethod]++;
		if(__upperLimitObject_JSFL0__[newMethod] < __upperLimitSending_JSFL0__)
			sendToExtension(payload);
	}
	
}
// -----------------------------------------------------
// sendToExtension() sends data from 'within' the site to the content site running in the background
// of the TAB (tab specific) via posting a message. This message is picked up by inject.js (content script that injects all the files to detect tracking) and passed on to the 
// script running in the background of the BROWSER (called lib/background.js and is active browser-wide)
function sendToExtension(data){
	var payload = { type: "-T-DETECTR-7", text: data};
	window.postMessage(payload, "*");
}
//---------------------------------------------------------
	//  -T-DETECTR-7 is a custom event identifier I made up 
	//  to avoid potential conflicts with other extensions/ pages using the same event identifier 
	//  and by mistake picking up their messages
