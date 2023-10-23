import { useCallback } from "react";
import { Text, View } from "react-native";
import { useDeviceContext, useAppColorScheme } from "twrnc";
import { useFonts, Mulish_400Regular } from "@expo-google-fonts/mulish";
import { Link } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import tw from '../lib/tailwind.js';
import Button from "../components/button"
import WhitestoneLogo from "../assets/whitestone-black.svg";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useDeviceContext(tw, { withDeviceColorScheme: false });
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

  const [fontsLoaded, fontError] = useFonts({
    Mulish_400Regular
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={tw`flex-1 items-center justify-center`} onLayout={onLayoutRootView}>
      <WhitestoneLogo width="40%" height="40%" style={tw`py-4`} />
      <Link href="/scan">
          <Text style={tw`font-mulish text-xl`}>Scan</Text>
      </Link>
      <Text style={tw`font-mulish text-navy-blue text-lg`}>Your personal dental assistant</Text>
    </View>
  );
}