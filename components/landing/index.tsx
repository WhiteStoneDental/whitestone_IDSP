import { useRouter, useFocusEffect, Link } from "expo-router";
import { View, Text } from "react-native";

import { tw } from "@/lib/tailwind";
import WhitestoneLogo from "@/assets/whitestone-black.svg";

export default function Landing() {
    const router = useRouter();

    useFocusEffect(() => {
        setTimeout(() => {
            router.replace("/home");
        }, 3000)
    })

    return (
        <View style={tw`flex-1 items-center justify-center`}>
        <Link href="/home" style={tw`mb-10`}>
          <WhitestoneLogo width="100%" height="100%" style={tw`py-4`} />
        </Link>
        <Link href="/scan">
            <Text style={tw`font-mulish text-xl`}>Scan</Text>
        </Link>
        <Text style={tw`font-mulish text-navy-blue text-lg`}>Your personal dental assistant</Text>
      </View>
    );
}