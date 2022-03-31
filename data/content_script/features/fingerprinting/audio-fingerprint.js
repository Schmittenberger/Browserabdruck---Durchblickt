//check https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
// https://github.com/fingerprintjs/fingerprintjs/blob/master/src/sources/audio.ts

// [
//     [AudioContext.prototype.__proto__,"createAnalyser ",AudioContext.prototype.__proto__.createAnalyser ],
//     [OfflineAudioContext.prototype.__proto__,"createAnalyser ",OfflineAudioContext.prototype.__proto__.createAnalyser ],
//     [AudioContext.prototype,"createOscillator ",AudioContext.prototype.createOscillator ],
//     [OfflineAudioContext.prototype,"createOscillator ",OfflineAudioContext.prototype.createOscillator ], 
//     [AudioContext.prototype,"createDynamicsCompressor ",AudioContext.prototype.createDynamicsCompressor ],
//     [OfflineAudioContext.prototype,"createDynamicsCompressor ",OfflineAudioContext.prototype.createDynamicsCompressor],
//     // [OfflineAudioContext.prototype,"getChannelData ",OfflineAudioContext.prototype.getChannelData ],
//     // [AudioBuffer.prototype,"getChannelData ",AudioBuffer.prototype.getChannelData ],
//     ].forEach(function (currentValue, index, array) {
//         Object.defineProperty(currentValue[0], currentValue[1], {
//         "value": function () {

//             handleDetection(currentValue[1],33);	
//             return currentValue[2].apply(this, arguments);
//         }
//         });
//     });



// somehow the clean array construction method for redefining these methods does not work for the audio api?
    const createAnalyser = OfflineAudioContext.prototype.__proto__.createAnalyser;
    Object.defineProperty(OfflineAudioContext.prototype.__proto__, "createAnalyser", {
      "value": function () {
          handleDetection("createAnalyser",33);
        return createAnalyser.apply(this, arguments);
      }
    });

    const createAnalyserAA = AudioContext.prototype.__proto__.createAnalyser;
    Object.defineProperty(AudioContext.prototype.__proto__, "createAnalyser", {
      "value": function () {
          handleDetection("createAnalyser",33);
        return createAnalyserAA.apply(this, arguments);
      }
    });

    const createOscillator = AudioContext.prototype.__proto__.createOscillator;
    Object.defineProperty(AudioContext.prototype.__proto__, "createOscillator", {
      "value": function () {
        handleDetection("createOscillator",33);
        return createOscillator.apply(this, arguments);
      }
    }); 
    
    const createOscillatorAA = OfflineAudioContext.prototype.__proto__.createOscillator;
    Object.defineProperty(OfflineAudioContext.prototype.__proto__, "createOscillator", {
      "value": function () {
        handleDetection("createOscillator",33);
        return createOscillatorAA.apply(this, arguments);
      }
    });  
    
    const createDynamicsCompressor = AudioContext.prototype.__proto__.createDynamicsCompressor;
    Object.defineProperty(AudioContext.prototype.__proto__, "createDynamicsCompressor", {
      "value": function () {
        handleDetection("createDynamicsCompressor",33);
        return createDynamicsCompressor.apply(this, arguments);
      }
    }); 
    
    const createDynamicsCompressorAA = OfflineAudioContext.prototype.__proto__.createDynamicsCompressor;
    Object.defineProperty(OfflineAudioContext.prototype.__proto__, "createDynamicsCompressor", {
      "value": function () {
        handleDetection("createDynamicsCompressor",33);
        return createDynamicsCompressorAA.apply(this, arguments);
      }
    });
    
    const getChannelDataAA = AudioBuffer.prototype.__proto__.getChannelData;
    Object.defineProperty(AudioBuffer.prototype.__proto__, "getChannelData", {
      "value": function () {
        handleDetection("getChannelData",33);
        return getChannelDataAA.apply(this, arguments);
      }
    });

