import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";
import { twMerge } from "tailwind-merge";
import { submitImage } from "../../util/send-to-api";

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
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [mouthOpen, setMouthOpen] = useState("mouth not open");
  const [message, setMessage] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current && canvasRef.current) {
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
            setMouthOpen("face not detected");
          }
        } catch (error) {
          console.log(error);
        }
      }
      requestRef.current = requestAnimationFrame(getResults);
    };
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

    const handleSubmit = async () => {
      try {
        // console.log(message);
        // console.log(imageURL);
        const streamIterator = await submitImage(
          "/api/route",
          message,
          imageURL
        );
        let result = "";
        for await (const chunk of streamIterator) {
          result += chunk;
        }
        setResult(result);
      } catch (error) {
        console.error("Error submitting image:", error);
        setResult("Error submitting image");
      }
    };

    if (imgSrc) {
      try {
        setTimeout(() => {
          cropImg();
          if (canvasRef.current) {
            setImageURL(canvasRef.current.toDataURL());
            handleSubmit();
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  }, [imgSrc, imageURL, message]);

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

      <input
        type="text"
        placeholder="What is your question"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={twMerge(
          "w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        )}
      />
      <input
        type="text"
        placeholder="Enter an image url"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        className={twMerge(
          "w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        )}
      />
      <div></div>
      {result && (
        <div>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
