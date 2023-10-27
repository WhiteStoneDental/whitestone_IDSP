import { useEffect } from "react";
import { useFonts, Mulish_400Regular } from "@expo-google-fonts/mulish";
import { SplashScreen, Slot } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Mulish_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return <Slot />;
}
