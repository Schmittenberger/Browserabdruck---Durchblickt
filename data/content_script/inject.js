//chrome incompatibily, to be able to open the popup in chrome we have to activate it for every page each time
//of course the mozilla polyfill is converting this to chrome.runtime
// chrome.runtime.sendMessage({"message": "activate_icon"});
function handleError(error) {
  console.log(`[ERROR]: Caught error: ${error}`);
}

function handleResponse(message) {
	// do nothing
  }

function sendToBackground(data){
  	var sending = browser.runtime.sendMessage({
    message_payload: data
  });
  sending.then(handleResponse, handleError);
}
	
window.addEventListener("message", function(event) {
	//DISABLED TO CATCH TRACKING FROM INSIDE IFRAMES
    // if (event.source != window)
        // return;
		
	//  -T-DETECTR-7 is a custom event identifier I made up 
	//  to avoid potential conflicts with other extensions/ pages using the same event identifier 
	//  and by mistake picking up their messages
	
	//	if event.data exists and if it comes from this extension
    if (event.data.type && (event.data.type == "-T-DETECTR-7")) {
		sendToBackground(event.data.text);
    } else{
		// console.log("[Inject.js] rejecting data from unkown identifier",event)
	}
});
	
//circumvent Content Security Policy blocking my scripts
//https://stackoverflow.com/questions/45767434/chrome-extension-inject-script-with-dynamic-value-into-page-with-strict-csp
// but now google chrome does not support this kind of injection
// fix for google chrome:
// https://stackoverflow.com/questions/10527625/google-chrome-extension-script-injections
// https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources/
// this is actually a security feature that I have to circumvent -> it is supposed to prevent websites finding out which extensions are used
// tl;dr: add all the needed scripts to the manifest file under "web_accessible_resources": ['data/content_script/features/injectTest.js', ...]
// and add them here in scriptsToInject

let script = document.createElement('script');
script.src = browser.runtime.getURL('data/content_script/injectTest.js');
script.onload = function() {
  this.remove();
};

(document.head || document.documentElement).appendChild(script);

let scriptsToInject = [	
"data/content_script/handleMessages.js",
"data/content_script/features/fingerprinting/canvas-fingerprint.js",
"data/content_script/features/fingerprinting/webgl-fingerprint.js",
"data/content_script/features/fingerprinting/audio-fingerprint.js",
"data/content_script/features/fingerprinting/getContext-type.js",
"data/content_script/features/geolocation.js",
"data/content_script/features/battery.js",
"data/content_script/features/sensors.js"
]

scriptsToInject.forEach(file => {
	let scriptTmp= document.createElement('script');
	scriptTmp.src = browser.runtime.getURL(file);
	scriptTmp.onload = function() {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(scriptTmp);
})