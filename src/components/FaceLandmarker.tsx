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
  const [mouthOpen, setMouthOpen] = useState<string | null>(
    "Loading face detection..."
  );
  const [tip, setTip] = useState<string | null>("");
  const [imageURL, setImageURL] = useState("");
  const [isAbleToCapture, setIsAbleToCapture] = useState<boolean | null>(false);
  const [sending, setSending] = useState(false);
  const [verifiedSelection, setVerifiedSelection] = useState<boolean | null>(
    null
  );
  const [activeWebcam, setActiveWebcam] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
      const streamIterator = await submitImage("/api", imageURL);
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
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              setMouthOpen("Mouth open 😁");
              setTip(null);
            } else {
              setMouthOpen("Mouth not open 😐");
              setTip("Try getting closer or farther from the camera");
            }
          } else {
            setMouthOpen("Face not detected");
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
        alert("Failed to load webcam, refresh maybe");
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
        imageRef.current.width / 2 / 1.8,
        imageRef.current.height / 1.5,
        imageRef.current.width / 3,
        imageRef.current.height / 3,
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

  return (
    <div className="container">
      <div className="relative w-full flex justify-center items-center">
        {activeWebcam && windowSize && (
          <Webcam
            className="rounded-xl shadow-xl dark:bg-[var(--box-color)]"
            height={windowSize.height / 2}
            width={windowSize.width / 2}
            ref={webcamRef}
            screenshotFormat="image/png"
            playsInline={true}
            mirrored={true}
            screenshotQuality={1}
          />
        )}
        <div
          className="absolute"
          style={{
            bottom: windowSize.height / 100,
          }}
        >
          <ScanBox />
        </div>
      </div>
      {imgSrc && (
        <Image
          className="invisible absolute"
          ref={imageRef}
          src={imgSrc}
          alt="webcam image"
          width={windowSize.width / 2}
          height={windowSize.height / 2}
        />
      )}
      <div className="flex justify-center items-center ">
        <canvas
          className={imgSrc ? "" : "invisible absolute"}
          ref={canvasRef}
        ></canvas>
        {sending && <h2>Scanning...</h2>}
      </div>
      {mouthOpen && <p>{mouthOpen}</p>}
      {tip && <p>{tip}</p>}
      <div className="btn-container flex justify-center mt-4">
                {isAbleToCapture !== null && (
          <button
            onClick={capture}
            className="bg-gray-200 hover:bg-gray-400 text-black font-semibold flex justify-center items-center  p-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            style={{ width: "64px", height: "64px", borderRadius: "50%" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </button>
        )}
      </div>
      {verifiedSelection !== null && (
        <div className="flex flex-col items-center mt-10">
          <h2 className="text-white font-bold text-center text-2xl mb-5 dark:text-white">
            Do you want to use this image to scan?
          </h2>
          <div className="flex space-x-4">
            <button
              className="inline-block px-4 py-2 text-sm font-bold text-white bg-purple-600 rounded transition duration-300 hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple"
              onClick={() => {
                setVerifiedSelection(null);
                handleSubmit();
              }}
            >
              Yes
            </button>
            <button
              className="inline-block px-4 py-2 text-sm font-bold text-white bg-purple-600 rounded transition duration-300 hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple"
              onClick={() => reset()}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
