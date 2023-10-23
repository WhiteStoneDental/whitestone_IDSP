import { useFonts, Mulish_400Regular } from "@expo-google-fonts/mulish";
import { Text } from "react-native";

import tw from '../lib/tailwind.js';


export default function Scan() {
  const [fontsLoaded, fontError] = useFonts({
    Mulish_400Regular
  });

  return (
    <Text>Hi</Text>
  );
}