import { Link } from "expo-router";
import { View, Text } from "react-native";

import { tw } from "@/lib/tailwind";
import WhitestoneLogo from "@/assets/whitestone-black.svg";

export default function Landing() {
    return (
        <View style={tw`flex-1 items-center justify-center`}>
     
          <WhitestoneLogo width="50%" height="50%" style={tw`py-4`} />
     
        <Link href="/scan">
            <Text style={tw`font-mulish text-xl`}>Scan</Text>
        </Link>
        <Text style={tw`font-mulish text-navy-blue text-lg`}>Your personal dental assistant</Text>
      </View>
    );
}