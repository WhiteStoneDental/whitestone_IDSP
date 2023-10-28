import { Text, useColorScheme } from "react-native";


export default function Scan() {
  const colorScheme = useColorScheme();
  
  return (
    <Text>Color scheme: {colorScheme}</Text>
  );
}