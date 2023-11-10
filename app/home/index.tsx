import { Text } from "react-native";
import { Link } from "expo-router";

import GradientBackground from "@/components/GradientBackground";
import { tw } from "@/lib/tailwind";

export default function Home() {
  return (
    <GradientBackground>
      <Link href="/scan">
        <Text style={tw`font-mulish text-xl`}>Scan</Text>
      </Link>
    </GradientBackground>
  );
}
