import Image from "next/image";
import ScanBoxSvg from "@/../public/ScanBox.svg";

export default function ScanBox({ width } : { width?: number }) {
  return (
    <Image 
      src={ScanBoxSvg}
      alt="Scan box image"
      width={width}
    />
  );
}
