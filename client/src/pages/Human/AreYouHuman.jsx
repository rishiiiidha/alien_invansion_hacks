import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import Join from "../Chat/Join"; // Import the Join component

const FaceApi = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  const videoRef = useRef();
  const canvasRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: videoWidth, height: videoHeight } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        if (detections.length > 0) {
          setIsHuman(true);
          setTimeout(() => {
            closeWebcam();
            navigate("/join"); 
          }, 5000);
        } else {
          setIsHuman(false);
        }

        if (canvasRef.current) {
          canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
            videoRef.current
          );
          faceapi.matchDimensions(canvasRef.current, {
            width: videoWidth,
            height: videoHeight,
          });

          const resizedDetections = faceapi.resizeResults(detections, {
            width: videoWidth,
            height: videoHeight,
          });

          const ctx = canvasRef.current.getContext("2d");
          ctx.clearRect(0, 0, videoWidth, videoHeight);
          faceapi.draw.drawDetections(ctx, resizedDetections);
          faceapi.draw.drawFaceLandmarks(ctx, resizedDetections);
        }
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setCaptureVideo(false);
  };

  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        {captureVideo && modelsLoaded ? (
          <button
            onClick={closeWebcam}
            className="bg-gray-800 text-white py-3 px-6 rounded-lg text-lg cursor-pointer hover:bg-gray-800"
          >
            Close Webcam
          </button>
        ) : (
          <button
            onClick={startVideo}
            className="bg-gray-800 text-white py-3 px-6 rounded-lg text-lg cursor-pointer hover:bg-gray-700"
          >
            Open Webcam
          </button>
        )}
      </div>
      {captureVideo && modelsLoaded ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <video
              ref={videoRef}
              height={videoHeight}
              width={videoWidth}
              onPlay={handleVideoOnPlay}
              style={{ borderRadius: "10px" }}
            />
            <canvas
              ref={canvasRef}
              style={{ position: "absolute", borderRadius: "10px" }}
            />
          </div>
          <div
            style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}
            className="text-center mt-6 font-bold text-3xl text-slate-100"
          >
            {isHuman
              ? "You are human"
              : "You are not allowed to use this website"}
          </div>
        </div>
      ) : captureVideo && !modelsLoaded ? (
        <div>Loading models...</div>
      ) : null}

      {/* Render the Join component conditionally */}
      {isHuman && <Join />}
    </div>
  );
};

export default FaceApi;
