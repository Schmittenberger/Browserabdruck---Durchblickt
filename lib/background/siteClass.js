//website class
// in the beginning everything is set to false
// if something is detected ONLY then is it set to true 
class siteClass {
	constructor(url, tabId) {
		this.__url = (typeof url == 'undefined') ? '' : url
        this.__tabId = tabId

		this.properties = { 
			injectSuccessful:false, // flag 10
			// fingerprinting uses the payload flag of 3
			fingerprinting :{
				canvas:false, // flag 31
				webgl:false, // flag 32
				audio:false, // flag 33
				canvasCollected:[],
			},
			// sensors use flag 5
			sensors:{
				orientation:false,
				motion:false
			},
			// other use flag 1
			// the method name is directly matched here
			// so method -> "battery" is matched by properties[method]
			battery:false,
			geolocation: false,
		};
	}
    get injectStatus(){
        return this.properties.injectSuccessful
    }
	set setInjectStatus(status){
		this.properties.injectSuccessful = status
	}
    get url(){
        return this.__url
    }
	set url(url){
		this.__url = url
	}
    get tabId(){
        return this.__tabId
    }	

	classifyCanvasFingerprint(){
		if(!this.properties.fingerprinting.canvas){
			let criteria = ["fillStyle","fillText","toDataURL"];
				let critBoolArray = [false,false,false];
				for (let method of this.properties.fingerprinting.canvasCollected) {
					if (method.indexOf(criteria[0]) > -1) critBoolArray[0] = true; 
					if (method.indexOf(criteria[1]) > -1) {
						critBoolArray[1] = true;
					}
					if (method.indexOf(criteria[2]) > -1) {
						critBoolArray[2] = true;
					}
					if (critBoolArray[0] && critBoolArray[1] && critBoolArray[2]){
						this.properties.fingerprinting.canvas = true;

						this.properties.fingerprinting.canvasCollected = [];
						break;
					} 
				}	
		}
	}
}