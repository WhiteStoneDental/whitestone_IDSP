import Image from "next/image";

export default function Logo2() {
  return (
      <div className="flex justify-center mt-14">
       
        <Image
          src="/images/NoScansDark.png"
          alt="NoScans- Dark"
          width={350}
          height={65}
          className="mb-4 hidden dark:block"
        />
         <Image
          src="/images/NoScansLight.png"
          alt="NoScans- Light"
          width={350}
          height={65}
          className="mb-4 dark:hidden"
        />
      </div>
    
  );
}
