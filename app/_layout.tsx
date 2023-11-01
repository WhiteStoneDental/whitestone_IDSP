import {  useEffect } from "react";
import { useColorScheme } from "react-native";
import { useFonts, Mulish_400Regular } from "@expo-google-fonts/mulish";
import { SplashScreen, Slot } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "@/lib/tailwind";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
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

  return (
    <ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
      <LinearGradient
      colors={["#9D32A5", "#641A99", "#24008C"]}
      style={tw`flex-1`}
    >

      <Slot />
    </LinearGradient>
    </ThemeProvider>
  );
}
