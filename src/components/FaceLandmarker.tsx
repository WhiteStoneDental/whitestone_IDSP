import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";
import { twMerge } from "tailwind-merge";
import ScanPrompt from "./ScanPrompt";
import { submitImage } from "../../util/send-to-api";
import ScanBox from "./ScanBox";

const isMouthOpen = (score: number) => {
  return score >= 0.0001;
};

export default function FaceLandmarker() {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasBoxRef = useRef<HTMLCanvasElement>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [mouthOpen, setMouthOpen] = useState("mouth not open");
  const [message, setMessage] = useState("");
  const [tip, setTip] = useState<string | null>("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const capture = useCallback(() => {
    setLoading(true);

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

    setLoading(false);
  }, [webcamRef]);

  useEffect(() => {
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
            const mouthOpenScore =
              results.faceBlendshapes[0].categories[27].score;
            if (isMouthOpen(mouthOpenScore)) {
              setMouthOpen("mouth open");
              setTip(null);
            } else {
              setMouthOpen("mouth not open");
              setTip("try getting closer or farther from the camera");
            }
          } else {
            setMouthOpen("face not detected");
            setTip(null);
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

    if (imgSrc) {
      try {
        setTimeout(() => {
          cropImg();

          if (canvasRef.current) {
            setImageURL(canvasRef.current.toDataURL());
          }
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  }, [imgSrc]);

  useEffect(() => {
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

    if (imageURL) {
      handleSubmit();
    }
  }, [imageURL]);

  return (
    <div className="container">
      <div className="relative">
        <Webcam
          className="rounded-xl shadow-xl dark:bg-[var(--box-color)]"
          height={600}
          width={600}
          ref={webcamRef}
          screenshotFormat="image/png"
          playsInline={true}
        />
        <div className="absolute bottom-4 left-44">
          <ScanBox />
        </div>
      </div>
      {imgSrc && (
        <Image
          className="invisible absolute"
          ref={imageRef}
          src={imgSrc}
          alt="webcam image"
          width={600}
          height={600}
        />
      )}
      <canvas
        className={twMerge(imgSrc ? "" : "invisible absolute")}
        ref={canvasRef}
      ></canvas>
      <h2>{mouthOpen}</h2>
      {tip && <h2>{tip}</h2>}
      <div className="btn-container">
        {isAbleToCapture !== null && (
        <button 
        onClick={capture} 
        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold flex justify-center items-center  p-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        style={{ width: '64px', height: '64px', borderRadius: '50%' }}
      >
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
</svg>

      </button>
        )}
        <button onClick={capture}>
          {loading ? "Cropping..." : "Capture photo"}
        </button>
      </div>
      {sending && <h2>Scanning...</h2>}
      <ScanPrompt
        message={message}
        imageURL={imageURL}
        onMessageChange={(e) => setMessage(e.target.value)}
        onImageChange={(e) => setImageURL(e.target.value)}
      />
    </div>
  );
}
