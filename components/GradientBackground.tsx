import { LinearGradient } from "expo-linear-gradient";
import tw from "@/lib/tailwind";

export default function GradientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
    return <LinearGradient
    colors={["#9D32A5", "#641A99", "#24008C"]}
    style={tw`flex-1`}
    >
        {children}
    </LinearGradient>
}
