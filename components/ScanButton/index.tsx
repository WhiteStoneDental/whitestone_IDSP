import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { tw } from "@/lib/tailwind";
import ScanArrow from "@/assets/scan-arrow.svg"

export default function ScanButton() {
    const router = useRouter();
    return (
        <View>
        <Pressable 
        onPress={() => router.push("/scan")}
        style={tw`bg-white w-20 h-20 rounded-4 flex items-center justify-center active:bg-e2e2e2`}
        accessibilityLabel="Start your scan button">
            <ScanArrow />
        </Pressable>
        </View>
    )
}

