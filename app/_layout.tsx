import { useEffect } from "react";
import { useFonts, Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useDeviceContext, useAppColorScheme } from "twrnc";
import { SplashScreen, Slot } from "expo-router";

import tw from '../lib/tailwind.js';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    useDeviceContext(tw, { withDeviceColorScheme: false });
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  
    const [fontsLoaded, fontError] = useFonts({
      Mulish_400Regular
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
          }
    }, [fontsLoaded, fontError])
  
    if (!fontsLoaded && !fontError) {
      return null;
    }
    return <Slot />
}