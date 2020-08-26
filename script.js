const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

console.log = msg => logElem.innerHTML += `${msg}<br>`;
console.error = msg => logElem.innerHTML += `<span class="error">${msg}</span><br>`;
console.warn = msg => logElem.innerHTML += `<span class="warn">${msg}<span><br>`;
console.info = msg => logElem.innerHTML += `<span class="info">${msg}</span><br>`;

var displayMediaOptions = {
    video: {
      cursor: "always"
    },
    audio: false
  };

  async function startCapture() {
    
    logElem.innerHTML = "";
    try {
      videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      videoElem.onloadedmetadata = () => {
        videoElem.play();
        dumpOptionsInfo();

      }
      
    } catch(err) {
      console.error("Error: " + err);
    }
  }

  function stopCapture(evt) {
    let tracks = videoElem.srcObject.getTracks();
  
    tracks.forEach(track => track.stop());
    videoElem.srcObject = null;
  }

  function dumpOptionsInfo() {
    const videoTrack = videoElem.srcObject.getVideoTracks()[0];
   
    console.info("Track settings:");
    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.info("Track constraints:");
    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
  }

  // Set event listeners for the start and stop buttons
startButton.addEventListener("click", async function(evt) {
    startButton.disabled = true;
    await videoElem.requestPictureInPicture()
    startButton.disabled = false;
  }, false);
  
stopButton.addEventListener("click", function(evt) {
    stopCapture();
}, false);


// On Load
startCapture();
