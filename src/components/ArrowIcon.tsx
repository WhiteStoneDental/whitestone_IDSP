import Link from "next/link";
import Image from "next/image";

export default function ArrowIcon() {
  return (
      <>
          {/* Black Arrow Icon for Light Mode */}
          <svg 
              className="dark:hidden"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
          >
              <path d="M5 12h14M12 5l7 7-7 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* White Arrow Icon for Dark Mode */}
          <svg 
              className=" hidden dark:block"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
          >
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
      </>
  );
}

