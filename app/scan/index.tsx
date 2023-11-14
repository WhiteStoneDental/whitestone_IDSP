import { Text, useColorScheme } from "react-native";
import { Platform } from "react-native";
import { tw } from "@/lib/tailwind";
import FaceLandmarker from "@/components/Facelandmarker";

export default function Scan() {
  const colorScheme = useColorScheme();

  if (Platform.OS === 'web') {
    return (
     <FaceLandmarker />
    );
  }
  
  return (
    <Text style={tw`font-mulish`}>Color scheme: {colorScheme}</Text>
  );
}