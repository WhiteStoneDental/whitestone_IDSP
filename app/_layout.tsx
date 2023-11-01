import { useCallback, useEffect } from "react";
import { View, useColorScheme } from "react-native";
import { useFonts, Mulish_400Regular } from "@expo-google-fonts/mulish";
import { SplashScreen, Slot } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import tw from "@/lib/tailwind";

SplashScreen.preventAutoHideAsync();

export default function Layout({ children }: { children: React.ReactNode[] }) {
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
      <Slot />
    </ThemeProvider>
  );
}
