import { Text, View } from "react-native";

import GradientBackground from "@/components/GradientBackground";
import tw from "@/lib/tailwind";

export default function Home() {
  return (
    <GradientBackground>
      <Text>This is some text</Text>
    </GradientBackground>
  );
}
