import React, { useState, useRef, useEffect } from "react";
import Dropzone from "react-dropzone";
import Webcam from "react-webcam";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [name, setName] = useState("");
  const [fallbackImage, setFallbackImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const webcamRef = useRef(null);
  const nameInputRef = useRef();

  const handleImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFallbackImage(reader.result);
      localStorage.setItem("fallbackImage", reader.result);
    };
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    if (/^[A-Za-z ]{1,30}$/.test(newName)) {
      setName(newName);
      localStorage.setItem("name", newName);
    }
  };

  const handleSave = () => {
    // Your code to download the image (e.g., using canvas and FileSaver.js).
    // You can create a canvas and draw the images onto it and then use FileSaver.js to save it as a file.
  };

  // Load initial data from local storage on component mount
  useEffect(() => {
    const storedFallbackImage = localStorage.getItem("fallbackImage");
    if (storedFallbackImage) {
      setFallbackImage(storedFallbackImage);
    }
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleCameraClick = () => {
    setCameraActive(!cameraActive);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFallbackImage(imageSrc);
    setCameraActive(false); // Disable camera after capture
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Assignment</h1>
        <div className="image-container">
          <div className="image-wrapper" style={{width: '450px', height:'350px'}}>
            {cameraActive ? (
              <Webcam
                audio={false}
                height={300}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={400}
              />
            ) : (
              <Dropzone onDrop={handleImageDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {fallbackImage && <img src={fallbackImage} alt="Fallback" />}
                  </div>
                )}
              </Dropzone>
            )}
          </div>
          <div className="camera-toggle">
            <button onClick={handleCameraClick}>
              {cameraActive ? (
                <i className="bi bi-arrow-counterclockwise"></i>
              ) : (
                <i className="bi bi-camera"></i>
              )}
            </button>
          </div>
          <div className="bottom-text">
            <p>Click or drag an image here</p>
          </div>
        </div>
        { !fallbackImage?<button onClick={handleCapture}>capture</button>:<button >retake</button>}
        <div className="edit-container">
          <label>Name:</label>
          <input
            type="text"
            ref={nameInputRef}
            value={name}
            onChange={handleNameChange}
            maxLength={30}
            placeholder="Enter your name"
          />
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default App;
