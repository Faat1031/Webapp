var frontCamera = false;
var currentStream;

// Define constants
// Get the element in the document with id="camera-view", "camera-device", "photo-display", "take-photo-button" and "front-camera-button"
const
    cameraView = document.querySelector("#camera-view");
    cameraDevice = document.querySelector("#camera-device");
    photoDisplay = document.querySelctor("#photo-display");
    takePhotoButton = document.querySelector("#take-photo-button");
    frontPhotoButton = document.querySelector("#front-camera-button");
    
function cameraStart(){
    if(typeof currentStream !=="undefined"){
        currentStream.getTracks().forEach(track =>{
            track.stop();
        })
    }
}

var constraints = {video:{facingMode:(frontCamera?"user":"environment")},audio:false};

navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream){
        currentStream =stream;
        cameraDevice.srcObject = stream;
    })
    .catch(function(error){
        console.error("Error happened.",error);
});

takePhotoButton.onclick=function(){
    cameraView.width = cameraDevice.videoWidth;
    cameraView.height = cameraDevice.videoHeight;
    caneraView.getContext("2d").drawImage(cameraDevice,0,0);
    photoDisplay.src = cameraView.toDataURL("image/webp");
    photoDisplay.classList.add("photo-taken");
};

frontCameraButton.onclick=function(){
    frontCamera =!frontCamera;
    if(frontCamera){
        frontCameraButton.textContent ="Back Camera";
    }
    else{
        frontCameraButton.textContent = "Front Camera";
    }
    cameraStart();
};

window.addEventListener("load",cameraStart);