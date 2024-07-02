import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FaceApi = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate();

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

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
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
    const intervalId = setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        if (detections.length > 0) {
          setIsHuman(true);
          clearInterval(intervalId);
          setTimeout(() => {
            closeWebcam();
            navigate("/join");
          }, 5000);
        } else {
          setIsHuman(false);
        }

        if (canvasRef.current) {
          const canvas = faceapi.createCanvasFromMedia(videoRef.current);
          faceapi.matchDimensions(canvas, {
            width: videoWidth,
            height: videoHeight,
          });

          const resizedDetections = faceapi.resizeResults(detections, {
            width: videoWidth,
            height: videoHeight,
          });

          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, videoWidth, videoHeight);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

          canvasRef.current.innerHTML = "";
          canvasRef.current.append(canvas);
        }
      }
    }, 100);

    return () => clearInterval(intervalId);
  };

  const closeWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setCaptureVideo(false);
  };

  useEffect(() => {
    if (isHuman) {
      toast("Congrats, you are eligible to make use of this website.");
    }
  }, [isHuman]);

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
              position: "relative",
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
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: "10px",
              }}
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
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default FaceApi;
