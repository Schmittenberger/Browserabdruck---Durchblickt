//--------- Show page action (popup) on all pages for chrome -------------------------


chrome.tabs.onActivated.addListener(function(activeInfo) {
	// console.log("activated tab: ",activeInfo)
	showPopup(activeInfo.tabId);
  });

  chrome.tabs.onCreated.addListener(function(activeInfo) {
	// console.log("created tab: ", activeInfo)
	showPopup(activeInfo.id);
  });

  function showPopup(tabId) {
	try{
		chrome.tabs.get(tabId, function(tab){
			if (chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError.message);
			} else {
			if(parseInt(tabId) < 10000)
				chrome.pageAction.show(tabId);
			}
		
		});
	} catch(err){
		console.log("[Chrome Popup Error]: Caught error while setting up page action",err)
	}
  };

  // Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(err, tabs) {
	if(typeof tabs != "undefined")
		showPopup(tabs[0].id);
  });
  // ---------------------------------------------
