//test if injecting javascript into site was successful (check for Content Security Policy blocking injection)
let payload_data = {
    "url":document.URL,
    "flag":10,  //injecting script into site was succesful
    "source": "site"
};
var payload = { type: "-T-DETECTR-7", text: payload_data};
window.postMessage(payload, "*");