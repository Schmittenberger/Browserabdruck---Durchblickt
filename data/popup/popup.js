main()
let currentTabId = undefined
let firstTimeLoading = true

function main(){
	let querying = browser.tabs.query({currentWindow: true, active: true});
	querying.then(loadPopupData, handleError);
}

function loadPopupData(tabs){
	currentTabId = tabs[0].id;
	setTimeout(getInjectStatus, 350);
	setInterval(getInjectStatus, 5000);
	setInterval(startLoadingCircle, 5000)
}
// loading circle
function startLoadingCircle(){
	toggleLoadingCircle();
	const timer = setTimeout(toggleLoadingCircle, 500);
}

function toggleLoadingCircle(){
	document.getElementById("loading").classList.toggle("hide");
}

// message handling
browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {
  	sendResponse({response: "popup receieved message."});
}

function handleResponse(message) {
  console.log(`[Popup]: Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`[Popup]: Error: ${error}`);
}

// get inject status of extension in current website
function getInjectStatus(){
	var sending = browser.runtime.sendMessage({
  message_payload: {
		  "flag":10, // 10 = ask for injection status
		  "source":"popup",
		  "tabId":currentTabId != undefined ? currentTabId : -1
	  }
});
sending.then(handleSiteStatus, handleError);
}

function handleSiteStatus(message) {
	if(firstTimeLoading) {
		toggleLoadingCircle();
		firstTimeLoading = false;
	}
	let url = message.response.url;
	let splitUrl = message.response.url.split("/");
	if(splitUrl.length > 3) url = splitUrl[2];
	document.getElementById("url").innerHTML = url.replace("www.", "");

	if(message.response.inject){
		getSiteClassification()
	} else{
		document.getElementById("url").innerHTML = " Seite aktuell nicht analysierbar"
		injectedFailed();
	}
}

// ----------------------------------------------------------------------------------------
function getSiteClassification(){
	var sending = browser.runtime.sendMessage({
		message_payload: {
				"flag":1, // 1= requesting background script to classify site and send new data
				"source":"popup",
				"tabId":currentTabId != undefined ? currentTabId : -1
			}
	  });
	  sending.then(handleSiteClassification, handleError);
}

function handleSiteClassification(message){
	unsetAll();
	const site = message.site;
	if(site.fingerprinting.canvas) setTrackingToTrue("canvas-d");
	if(site.fingerprinting.webgl) setTrackingToTrue("webgl-d");
	if(site.fingerprinting.audio) setTrackingToTrue("audio-d");

	if(site.sensors.orientation) setTrackingToTrue("orientation-d");
	if(site.sensors.motion) setTrackingToTrue("motion-d");

	if(site.battery) setTrackingToTrue("battery-d");
	if(site.geolocation) setTrackingToTrue("geolocation-d");
}

function unsetAll(){
	setTrackingToFalse("battery-d");
	setTrackingToFalse("geolocation-d");
	setTrackingToFalse("canvas-d");
	setTrackingToFalse("webgl-d");
	setTrackingToFalse("audio-d");
	setTrackingToFalse("orientation-d");
	setTrackingToFalse("motion-d");
}

function injectedFailed(){
	setTrackingToUndefined("battery-d");
	setTrackingToUndefined("geolocation-d");
	setTrackingToUndefined("canvas-d");
	setTrackingToUndefined("webgl-d");
	setTrackingToUndefined("audio-d");
	setTrackingToUndefined("orientation-d");
	setTrackingToUndefined("motion-d");
}

// ----------------------------------------------------------------------------------------

function setTrackingToTrue(domId){
	const element = document.getElementById(domId)
	element.innerHTML = "Ja";
	element.classList.add("yes");
	element.title = "Ja, diese Art von Tracking wurde erkannt"
}

function setTrackingToUndefined(domId){
	const element = document.getElementById(domId)
	element.innerHTML = "---";
	element.title = "Leider keine Erkenntnis hierzu"
}

function setTrackingToFalse(domId){
	const element = document.getElementById(domId)
	element.innerHTML = "Nein";
	element.title = "Nein, diese Art von Tracking wurde nicht erkannt"
}
// ----------------------------------------------------------------------------------------
//adding event listeners because in-line (onclick) javascript is not allowed for popups
//alternativily the popup could be sandboxed but then I cant use the mozilla browser polyfill on the popup
// toggle info fields
document.getElementById("canvasInfoChip").addEventListener("click", () => {toggleInfo("canvas-info")});
document.getElementById("webglInfoChip").addEventListener("click", () => {toggleInfo("webgl-info")});
document.getElementById("audioInfoChip").addEventListener("click", () => {toggleInfo("audio-info")});

document.getElementById("orientationInfoChip").addEventListener("click", () => {toggleInfo("orientation-info")});
document.getElementById("motionInfoChip").addEventListener("click", () => {toggleInfo("motion-info")});

document.getElementById("batteryInfoChip").addEventListener("click", () => {toggleInfo("battery-info")});
document.getElementById("geolocationInfoChip").addEventListener("click", () => {toggleInfo("geolocation-info")});

document.getElementById("spoiler").addEventListener("click", () => {toggleSpoiler("spoilerContent")});

// ------------------------------

function toggleSpoiler(domId){
	elem = document.getElementById(domId);
	if(elem.classList.contains("infoOpen")) {
		closeInfoField(elem);
		document.getElementById("spoiler").innerHTML = "▼ Weitere Information ▼"
		
	} else{
		closeAllOtherInfoFields();
		openInfoField(elem);
		document.getElementById("spoiler").innerHTML = "▲ Weitere Information ▲"
		
	}
}

function toggleInfo(domId){
	elem = document.getElementById(domId);
	if(elem.classList.contains("infoOpen")) {
		closeInfoField(elem);
	} else{
		closeAllOtherInfoFields();
		openInfoField(elem);
	}	
}

function closeAllOtherInfoFields(){
	const openFieldsList = document.getElementsByClassName("infoOpen");
	for(var index=0;index < openFieldsList.length;index++){
		console.log("all fields", openFieldsList[index])
		if(openFieldsList[index].id === "spoilerContent")
			document.getElementById("spoiler").innerHTML = "▼ Weitere Information ▼"
		closeInfoField(openFieldsList[index]);
	 }
}

// hide and show (info) spoliers by adding and removing css classes
function openInfoField(elem){
	elem.classList.add("infoOpen");
	elem.classList.remove("infoClosed");
}

function closeInfoField(elem){
	elem.classList.toggle("infoClosed");
	elem.classList.remove("infoOpen");
}

