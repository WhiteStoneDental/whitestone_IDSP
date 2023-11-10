import { Text, View } from "react-native";
import { Link } from 'expo-router';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import GradientBackground from "@/components/GradientBackground";
import { tw } from "@/lib/tailwind";

import Landing from "@/components/Landing";

export default function Home() {
  return (
    <Link href="/scan">
    <Text style={tw`font-mulish text-xl`}>Scan</Text>
</Link>
  );
}