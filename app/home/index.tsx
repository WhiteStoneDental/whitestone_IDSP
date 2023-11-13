import { View, Text } from "react-native";
import { Link } from "expo-router";

import { tw } from "@/lib/tailwind";

import GradientBackground from "@/components/GradientBackground";
import ScanButton from "@/components/ScanButton";


export default function Home() {
  return (
    <GradientBackground>
      <View style={tw`flex items-center`}>
      <Text style={tw`font-mulish text-9 text-white`}>Start Your Scan</Text>
      <ScanButton />
      </View>
    </GradientBackground>
  );
}
