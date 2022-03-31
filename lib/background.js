// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation

browser.webNavigation.onCompleted.addListener((details) => {showPopup(details.tabId)});
browser.webNavigation.onBeforeNavigate.addListener(onBeforeNavigateToSite);
//use webNavigation.onBeforeNavigate to find out if leaving site? -> does not detect a page leave, it only logs that a new page is about to be accessed
//implicitly use this to replace tab/site information in tabArray
function onBeforeNavigateToSite(details) {
	if(details.frameId === 0){
		//TODO:
		// create a data storage object for each page visited that stores tracking found DONE
		// clear this tracking data object each time a new page is visited, i.e. RIGHT HERE DONE
		updateTabToNewSite(details.tabId, details.url);
		// setTimeout(() => {showPopup(details.tabId)},700);
		// correctly connect tracking information to the correct tab/page DONE
	}	
	else {
		// console.log("[onBeforeNavigate]: ##-- caught potential in frame loading", details);
	}
}
//---------- webrequest handling ----------------
browser.runtime.onMessage.addListener(handleMessage);
//get messages from content scripts or popup
//request contains the data we sent from the content script
//sender contains info about tab attributes like id, url, title or active
function handleMessage(request, sender, sendResponse) {
	if(request.message_payload.source === "site"){
		switch(request.message_payload.flag ) {
			case 10: //injecting script into site was succesful
				setInjectStatusToTrue(sender.tab.id);
				break;
			default:
				handleMethod(request.message_payload.method, request.message_payload.flag,sender.tab.id)
				break;
		}
			return Promise.resolve({type:"ack", response: "Acknowledged"});
	}
	else if(request.message_payload.source === "popup"){
		switch(request.message_payload.flag ) {
			case 0: //flow control
			case 1: //requesting background script to classify site and send new data
				let classification = classifySite(request.message_payload.tabId);
				return Promise.resolve({site: classification});
			case 10: //ask for injection status
				let s = getInjectionStatus(request.message_payload.tabId);
				return Promise.resolve({response: s});
				break;
	
		}
	}

}		

