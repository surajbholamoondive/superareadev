import React, { useState, useEffect } from 'react';

function CameraSwitcher({ zoomMediaStream }) {
    const [cameras, setCameras] = useState([]);
    const [currentCamera, setCurrentCamera] = useState();

    // Fetch available video devices
    useEffect(() => {
        async function getDevices() {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setCameras(videoDevices);
                if (videoDevices.length > 0) {
                    setCurrentCamera(videoDevices[0]);  // Set initial camera
                }
            } catch (error) {
                console.error("Failed to get devices:", error);
            }
        }
        getDevices();
    }, []);

    // Function to switch camera
    const switchCameraFunction = async (camera) => {
        console.log("Switching to camera:", camera.label);
        if (currentCamera?.deviceId === camera.deviceId) {
            console.log("Already on this camera:", camera.label);
            return;  // Return if the selected camera is already active
        }
        try {
            await zoomMediaStream.switchCamera() 
            // console.log("Starting video with device ID:", camera.deviceId,camera.label);
            // await zoomMediaStream.startVideo({ videoDeviceId: camera.deviceId });
            // setCurrentCamera(camera);
            console.log("Switched to camera:", camera.label);
        } catch (error) {
            console.error("Error switching cameras:", error);
        }
    };

    return (
        <div className='bg-black'>
            <select
                id="cameraSelect"
                value={currentCamera?.deviceId || ''}
                onChange={(e) => switchCameraFunction(cameras.find(cam => cam.deviceId === e.target.value))}
            >
                {cameras.map(camera => (
                    <option key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || 'Camera'}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CameraSwitcher;
