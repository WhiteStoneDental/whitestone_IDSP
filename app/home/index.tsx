import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "@/lib/tailwind";

export default function Home() {
  return (
    <View style={tw`flex-1`}>
      <LinearGradient
        colors={["#9D32A5", "#641A99", "#24008C"]}
        style={tw`flex-1`}
      >
      </LinearGradient>
    </View>
  );
}
