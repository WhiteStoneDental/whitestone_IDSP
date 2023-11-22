import NavBar from "@/components/NavBar";
import Accordion from "@/components/Accordion";
import LoginButton from "@/components/LoginButton";

export default function ResourcePage() {
  return (
    <div className="flex flex-col p-5 h-screen" style={{ backgroundImage: "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)" }}>
      <LoginButton/>
      <div className="flex flex-col items-center mt-20 mb-10 text-6xl text-center text-white">
        Health Resources
      </div>
      <div className="bg-white p-8 rounded-xl h-screen w-full overflow-hidden">
        <div className="placeholder-content dark:text-black text-center font-bold text-xl mt-5 mb-8">
          Learn More About Oral Health
        </div>
        <Accordion />
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}
