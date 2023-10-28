import { Text, View } from "react-native";
import { Link } from 'expo-router';

import tw from '@/lib/tailwind.js';
import WhitestoneLogo from "@/assets/whitestone-black.svg";

export default function App() {

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <WhitestoneLogo width="40%" height="40%" style={tw`py-4`} />
      <Link href="/scan">
          <Text style={tw`font-mulish text-xl`}>Scan</Text>
      </Link>
      <Text style={tw`font-mulish text-navy-blue text-lg`}>Your personal dental assistant</Text>
    </View>
  );
}