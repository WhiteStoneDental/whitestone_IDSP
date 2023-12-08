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
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [mouthOpen, setMouthOpen] = useState("mouth not open");
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
        const streamIterator = await submitImage("/api", imageURL);
        let result = "";
        const date = new Date();
        for await (const chunk of streamIterator) {
          result += chunk;
        }
        localStorage.setItem("results", result);
        localStorage.setItem("imageURL", imageURL);
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
      <div className="relative w-full flex justify-center items-center">
        <Webcam
          className="rounded-xl shadow-xl dark:bg-[var(--box-color)]"
          height={600}
          width={600}
          ref={webcamRef}
          screenshotFormat="image/png"
          playsInline={true}
          mirrored={true}
          
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
        <button onClick={capture}>
          {loading ? "Cropping..." : "Capture photo"}
        </button>
      </div>
      {sending && <h2>Scanning...</h2>}
    </div>
  );
}
