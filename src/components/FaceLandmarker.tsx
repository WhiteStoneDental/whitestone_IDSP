import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";


export default function FaceLandmarker() {
  const webcamRef = useRef<Webcam>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState(null);
  const faceLandmarkManager = FaceLandmarkManager.getInstance();

  const capture = useCallback(() => {
    const results = faceLandmarkManager.getResults();
    console.log(results)
  }, [webcamRef]);

  useEffect(() => {
    if (imgSrc && webcamRef.current) {
      try {
        setTimeout(() => {
          faceLandmarkManager.detectLandmarks(webcamRef.current.video, Date.now());
          const blendshapeObject = faceLandmarkManager.getResults().faceBlendshapes;
          if (blendshapeObject[0].categories[35].score >= 0.14) {
          } else {
            alert("confidence score was not high enough, retake picture");
            setImgSrc(null);
          }
        }, 1000)
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <div className="container">
      {imgSrc ? (
        <Image ref={imageRef} src={imgSrc} alt="webcam image" width={600} height={600} />
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
