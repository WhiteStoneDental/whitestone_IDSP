import React from "react";
import { Text, View, Pressable } from "react-native";
import { useDeviceContext, useAppColorScheme } from "twrnc";
import { useFonts, Mulish_400Regular } from "@expo-google-fonts/mulish";
import { Link } from "expo-router";

import tw from '../lib/tailwind.js';
import WhitestoneLogo from "../assets/whitestone-black.svg";


export default function App() {
  useDeviceContext(tw, { withDeviceColorScheme: false });
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

  const [fontsLoaded, fontError] = useFonts({
    Mulish_400Regular
  });

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Link href="/scan">
        <Pressable>
          <WhitestoneLogo width="100%" height="100%" style={tw`py-5`}/>
        </Pressable>
      </Link>
      <Text style={tw`font-mulish text-navy-blue text-lg`}>Your personal dental assistant</Text>
    </View>
  );
}