import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";

interface Coordinates {
  [key: string]: number;
}

const denormalizeCoordinates = (
  coordinates: Coordinates,
  width: number,
  height: number
) => {
  const newCoords = { x: 0, y: 0 };

  newCoords.x = coordinates.x * width;
  newCoords.y = coordinates.y * height;

  return newCoords;
};

export default function FaceLandmarker() {
  const webcamRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  function cropImg(landmarkManager: FaceLandmarkManager, imageSrc: ImageData) {
    const landmarkCoordinates =
      landmarkManager.getResults().faceLandmarks[0][35];
    console.log(landmarkCoordinates)
    const ctx = canvasRef.current.getContext("2d");
    const denormalizedCoordinates = denormalizeCoordinates(
      { x: landmarkCoordinates.x, y: landmarkCoordinates.y },
      600,
      600
    );
    ctx.drawImage(
      imageRef.current,
      denormalizedCoordinates.x + 12,
      denormalizedCoordinates.y - 25,
      100,
      100,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  }

  const capture = useCallback(() => {
    // yea too lazy to fix rn
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    if (imgSrc) {
      try {
        const faceLandmarkManager = FaceLandmarkManager.getInstance();
        console.log(imageRef.current)
        setTimeout(() => {
          faceLandmarkManager.detectLandmarks(imageRef.current);
          cropImg(faceLandmarkManager, imgSrc);
        }, 1000)
      } catch (e) {
        console.log(e);
      }
    }
  }, [imgSrc]);

  return (
    <div className="container">
      {imgSrc ? (
        <Image ref={imageRef} src={imgSrc} alt="webcam" width={600} height={600} />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <canvas ref={canvasRef}></canvas>
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
}
