import { Text, useColorScheme } from "react-native";
import tw from "@/lib/tailwind";


export default function Scan() {
  const colorScheme = useColorScheme();
  
  return (
    <Text style={tw`font-mulish`}>Color scheme: {colorScheme}</Text>
  );
}