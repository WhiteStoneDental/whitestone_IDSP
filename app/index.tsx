import React from "react";
import { Text, View } from "react-native";
import tw from '../lib/tailwind.js';
import { useFonts, Mulish_400Regular } from "@expo-google-fonts/mulish";

import WhitestoneLogo from "../assets/whitestone-black.svg";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Mulish_400Regular
  });

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <WhitestoneLogo width="30%" height="30%" />
      <Text style={tw`font-mulish text-navy-blue text-lg`}>Your personal dental assistant</Text>
    </View>
  );
}