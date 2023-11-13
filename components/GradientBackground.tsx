import { LinearGradient } from "expo-linear-gradient";
import { tw, fullConfig } from "@/lib/tailwind";

export default function GradientBackground({
  children,
}: {
  children: React.ReactNode
}) {
  // this exists, idk how to fix
  const colors = fullConfig.theme.colors;
  const chosenColors = [colors["pinkish-purple"], colors["custom-purple"], colors["custom-blue"]] as string[];
    return <LinearGradient
    colors={chosenColors}
    style={tw`flex-1`}
    >
        {children}
    </LinearGradient>
}