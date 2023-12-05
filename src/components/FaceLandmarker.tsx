import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";
import { submitImage } from "../../util/send-to-api";
import ScanBox from "./ScanBox";

const isMouthOpen = (score: number) => {
  return score >= 0.2;
};

const mouthOpenArrayIndex = 44;

export default function FaceLandmarker() {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [mouthOpen, setMouthOpen] = useState<string | null>("Loading face detection...");
  const [message, setMessage] = useState("");
  const [tip, setTip] = useState<string | null>("");
  const [imageURL, setImageURL] = useState("");
  const [isAbleToCapture, setIsAbleToCapture] = useState<boolean | null>(false);
  const [sending, setSending] = useState(false);
  const [verifiedSelection, setVerifiedSelection] = useState<boolean | null>(
    null
  );
  const [activeWebcam, setActiveWebcam] = useState(true);
  const [loadingWebcam, setLoadingWebcam] = useState(true);

  const capture = useCallback(() => {
    setIsAbleToCapture(true);

    if (webcamRef.current && canvasRef.current) {
      try {
        const faceLandmarkManager = FaceLandmarkManager.getInstance();
        const results = faceLandmarkManager.getResults();
        const mouthOpenScore =
          results.faceBlendshapes[0].categories[mouthOpenArrayIndex].score;

        if (isMouthOpen(mouthOpenScore)) {
          const imageSrc = webcamRef.current.getScreenshot();
          setImgSrc(imageSrc);
        } else {
          setIsAbleToCapture(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [webcamRef]);

  const handleSubmit = async () => {
    setSending(true);

    try {
      // console.log(message);
      // console.log(imageURL);
      const streamIterator = await submitImage("/api", message, imageURL);
      let result = "";
      for await (const chunk of streamIterator) {
        result += chunk;
      }
      localStorage.setItem("imageURL", imageURL);
      localStorage.setItem("results", result);
      router.push("/results");
      // setResult(result);
    } catch (error) {
      console.error("Error submitting image:", error);
      // setResult("Error submitting image");
    }
  };

  const reset = () => {
    setImgSrc(null);
    setVerifiedSelection(null);
    setActiveWebcam(true);
  };

  useEffect(() => {
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
            // console.log("START -----------------------------------------------------------------")
            // console.log("mouthClose: ", results.faceBlendshapes[0].categories[27].score)
            // console.log("mouthLeft: ", results.faceBlendshapes[0].categories[33].score)
            // console.log("mouthRight: ", results.faceBlendshapes[0].categories[39].score)
            // console.log("mouthSmileLeft: ", results.faceBlendshapes[0].categories[44].score)
            // console.log("mouthSmileRight: ", results.faceBlendshapes[0].categories[45].score)
            setIsAbleToCapture(false);
            const mouthOpenScore =
              results.faceBlendshapes[0].categories[mouthOpenArrayIndex].score;
            if (isMouthOpen(mouthOpenScore)) {
              setMouthOpen("mouth open");
              setTip(null);
            } else {
              setMouthOpen("mouth not open");
              setTip("try getting closer or farther from the camera");
            }
          } else {
            setMouthOpen("face not detected");
            setIsAbleToCapture(null);
            setTip(null);
          }
        } catch (error) {
          console.log(error);
        }
      }
      requestRef.current = requestAnimationFrame(getResults);
    };

    const waitForWebcam = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (webcamRef.current) {
          requestRef.current = requestAnimationFrame(getResults);
        }
      } catch (error) {
        console.log(error);
        alert("failed to load webcam, refresh maybe");
      }
    };

    waitForWebcam();

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
        375,
        350,
        200,
        200,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    };

    if (imgSrc) {
      try {
        setTimeout(() => {
          cropImg();

          if (canvasRef.current) {
            setImageURL(canvasRef.current.toDataURL());
            setIsAbleToCapture(false);
          }
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  }, [imgSrc]);

  useEffect(() => {
    if (imageURL) {
      // handleSubmit();
      setActiveWebcam(false);
      setMouthOpen(null);
      setTip(null);
      setIsAbleToCapture(null);
      setVerifiedSelection(false);
    }
  }, [imageURL]);

  if (loadingWebcam) {
    return (
      <>
        <Webcam className="invisible absolute" onUserMedia={() => setLoadingWebcam(false)} onUserMediaError={() => alert("Failed to load webcam, maybe refresh")} />
        <h1>Loading webcam...</h1>
      </>
    );
  }

  return (
    <div className="container">
      <div className="relative w-full flex justify-center items-center">
        {activeWebcam && (
          <Webcam
            className="rounded-xl shadow-xl dark:bg-[var(--box-color)]"
            height="auto"
            width="60%"
            ref={webcamRef}
            screenshotFormat="image/png"
            playsInline={true}
            mirrored={true}
            screenshotQuality={1}
          />
        )}
        <div className="absolute bottom-36">
          <ScanBox />
        </div>
      </div>
      {imgSrc && (
        <Image
          className="invisible absolute"
          ref={imageRef}
          src={imgSrc}
          alt="webcam image"
          fill
          sizes="100%"
        />
      )}
      <canvas
        className={imgSrc ? "" : "invisible absolute"}
        ref={canvasRef}
      ></canvas>
      {mouthOpen && <p>{mouthOpen}</p>}
      {tip && <p>{tip}</p>}
      <div className="btn-container">
        {isAbleToCapture !== null && (
          <button onClick={capture}>
            {isAbleToCapture ? "Cropping..." : "Capture photo"}
          </button>
        )}
      </div>
      {verifiedSelection !== null && (
        <div className="flex justify-center items-center">
          <h2 className="pr-4">Do you want to use this image to scan?</h2>
          <button
            className="pr-8"
            onClick={() => {
              setVerifiedSelection(null);
              handleSubmit();
            }}
          >
            Yes
          </button>
          <button onClick={() => reset()}>No</button>
        </div>
      )}
      {sending && <h2>Scanning...</h2>}
    </div>
  );
}
