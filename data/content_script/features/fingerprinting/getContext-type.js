//the getContext() function is used to access a canvas element
// it can be either used for canvas fingerprinting - by asking for a 2D context
// or for webgl fingerprinting - by asking for a webgl context
const getContext_ = HTMLCanvasElement.prototype.getContext;
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
"value": function () {
    let copiedArguments = []
    for(var i =0; i < arguments.length;i++){
        if(typeof arguments[i] != "function")
            copiedArguments[i] = arguments[i]
    }
    if(copiedArguments[0] == "2d") 
        // canvas fingerprinting
        handleDetection(["getContext",copiedArguments],31); 
    if(copiedArguments[0] == "webgl" || copiedArguments[0] == "experimental-webgl" || copiedArguments[0] == "webgl2" || copiedArguments[0] == "experimental-webgl2") 
        // webgl fingerprinting
        handleDetection(["getContext",,copiedArguments],32);
  return getContext_.apply(this, arguments);
},
writable:true
});