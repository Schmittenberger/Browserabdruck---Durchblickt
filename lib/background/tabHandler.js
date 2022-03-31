let tabArray = []
//----- startup handling -----
installActions()

function installActions(){
//perform necassary steps when first installing/loading this extension
//in most cases starting a new browsing session
console.log("[Startup]: Extension loaded ...")
let querying = browser.tabs.query({});
querying.then(populateTabArrayWithTabs, onError);
}

function populateTabArrayWithTabs(tabs) {
    for (let tab of tabs) {
      // tab.url requires the `tabs` permission or a matching host permission.
      addNewTabToTabArray(tab.url, tab.id)
    }
  }
  
  function onError(error) {
    console.log(`Error: ${error}`);
  }
// ------------ site array handling -------------
browser.tabs.onCreated.addListener(handleNewTab) // add new item to tabArray when new tab is opened
browser.tabs.onRemoved.addListener(tabClosedRemoveItem) // remove item in tabArray when the tab is closed  

function handleNewTab(tab) {
    addNewTabToTabArray("blank", tab.id);
  }

function tabClosedRemoveItem(tabId, removeInfo){
    const index = getIndexByTabIdFromTabArray(tabId)
    if(index > -1) {
        tabArray.splice(index,1);
    } else{
        console.log("[TAB]: item at index not found");
    }

}

function getIndexByTabIdFromTabArray(tabId){
  return tabArray.findIndex((site) => site.tabId === tabId);
}

function addNewTabToTabArray(url, tabId){
    let tmpSite = new siteClass(url, tabId);
    tabArray.push(tmpSite)
}

function updateTabToNewSite(tabId, url){
    const index = getIndexByTabIdFromTabArray(tabId);
    tabArray[index] = new siteClass(url, tabId);
}

function setInjectStatusToTrue(tabId){
    tabArray[getIndexByTabIdFromTabArray(tabId)].setInjectStatus = true;
}

function getInjectionStatus(tabId){
    const index = getIndexByTabIdFromTabArray(tabId);
    return {inject: tabArray[index].injectStatus, url: tabArray[index].url};
}

function classifySite(tabId){
    const index = getIndexByTabIdFromTabArray(tabId);
    tabArray[index].classifyCanvasFingerprint();
    return tabArray[index].properties;
}

function handleMethod(method, flag, tabId){
    const index = getIndexByTabIdFromTabArray(tabId);
    switch(flag ) {
        case 1: //function detection
            tabArray[index].properties[method] = true
            break;
        // fingerprinting info
        case 31: // canvas fingerprinting
            tabArray[index].properties.fingerprinting.canvasCollected.push(method)
            break;
        case 32: //webgl fingerprinting
            tabArray[index].properties.fingerprinting.webgl = true;
            break;
        case 33: //audio fingerprinting
            tabArray[index].properties.fingerprinting.audio = true;
            break;
        case 4:  //storage info
            tabArray[index].properties.storage[method] = true
            break;
        case 5: //sensors
            tabArray[index].properties.sensors[method] = true
            break;
        case 10: //injecting script into site was succesful
            setInjectStatusToTrue(sender.tab.id);
            break;
        default:
            //do nothing
            break;

    }
}