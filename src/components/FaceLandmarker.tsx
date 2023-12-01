import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";
import { twMerge } from "tailwind-merge";
import { getResponse } from "@/app/actions";
import Prompt from "./ScanPrompt";

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
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const createOutlineBox = () => {
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
  };

  const handleSubmit = async () => {
    setSending(true);
    const result = await getResponse(message, imageURL);
    if (!result.error && result.response) {
      setResult(result.response);
      localStorage.setItem("imageURL", imageURL);
      localStorage.setItem("results", result.response);
      router.push("/results");
    }
  };

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
    createOutlineBox();
  }, [canvasBoxRef]);

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
        className="rounded-xl shadow-xl dark:bg-[var(--box-color)]"
        height={600}
        width={600}
        ref={webcamRef}
        screenshotFormat="image/png"
        playsInline={true}
      />
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
        <button onClick={capture}>
          {loading ? "Cropping..." : "Capture photo"}
        </button>
      </div>
      {sending && <h2>Scanning...</h2>}
      <Prompt
        message={message}
        imageURL={imageURL}
        onMessageChange={(e) => setMessage(e.target.value)}
        onImageChange={(e) => setImageURL(e.target.value)}
      />
    </div>
  );
}
