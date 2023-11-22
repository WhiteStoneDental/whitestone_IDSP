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

const isMouthOpen = (score: number) => {
  return score >= 0.005;
};

export default function FaceLandmarker() {
  const webcamRef = useRef<Webcam>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasBoxRef = useRef<HTMLCanvasElement>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [mouthOpen, setMouthOpen] = useState("mouth not open");

  const cropImg = () => {
    if (
      canvasRef.current === null ||
      imgSrc === null ||
      imageRef.current === null
    ) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.drawImage(
      imageRef.current,
      250,
      300,
      120,
      100,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const getResults = () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.currentTime !== lastVideoTimeRef.current
    ) {
      lastVideoTimeRef.current = webcamRef.current.video.currentTime;

      try {
        const faceLandmarkManager = FaceLandmarkManager.getInstance();
        faceLandmarkManager.detectLandmarks(
          webcamRef.current.video,
          Date.now()
        );
        const results = faceLandmarkManager.getResults();
        if (results.faceBlendshapes[0]) {
          const mouthOpenScore =
            results.faceBlendshapes[0].categories[27].score;
          if (isMouthOpen(mouthOpenScore)) {
            setMouthOpen("mouth open");
          } else {
            setMouthOpen("mouth not open");
          }
        } else {
          setMouthOpen("mouth not open");
        }
      } catch (error) {
        console.log(error);
      }
    }
    requestRef.current = requestAnimationFrame(getResults);
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      try {
        const faceLandmarkManager = FaceLandmarkManager.getInstance();
        const results = faceLandmarkManager.getResults();
        const mouthOpenScore = results.faceBlendshapes[0].categories[27].score;

        if (isMouthOpen(mouthOpenScore)) {
          const imageSrc = webcamRef.current.getScreenshot();
          setImgSrc(imageSrc);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [webcamRef]);

  useEffect(() => {
    if (canvasBoxRef.current) {
      console.log("1");
      const ctx = canvasBoxRef.current.getContext("2d");

      if (ctx) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.rect(85, 88, 120, 60);
        ctx.stroke();
      }
    }
  }, [canvasBoxRef]);

  useEffect(() => {
    const getUserWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (webcamRef.current) {
          requestRef.current = requestAnimationFrame(getResults);
        }
      } catch (error) {
        console.log(error);
        alert("failed to load webcam");
      }
    };
    getUserWebcam();
    // if (imgSrc && webcamRef.current) {
    //   try {
    //     setTimeout(() => {
    //       faceLandmarkManager.detectLandmarks(webcamRef.current.video, Date.now());
    //       const blendshapeObject = faceLandmarkManager.getResults().faceBlendshapes;
    //       if (blendshapeObject[0].categories[35].score >= 0.14) {
    //       } else {
    //         alert("confidence score was not high enough, retake picture");
    //         setImgSrc(null);
    //       }
    //     }, 1000)
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    if (imgSrc) {
      try {
        setTimeout(() => {
          cropImg();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  }, [imgSrc]);

  return (
    <div className="container">
      <canvas
        ref={canvasBoxRef}
        className="absolute"
        style={{ width: 600, height: 450, transform: "scaleX(-1)" }}
      ></canvas>
      <Webcam
        height={600}
        width={600}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        playsInline={true}
      />
      {imgSrc && (
        <Image
          className="invisible"
          ref={imageRef}
          src={imgSrc}
          alt="webcam image"
          width={600}
          height={600}
        />
      )}
      <canvas ref={canvasRef}></canvas>
      <h2>{mouthOpen}</h2>
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
}
