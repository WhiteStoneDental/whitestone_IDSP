import { Text, View } from "react-native";
import { Link } from 'expo-router';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import GradientBackground from "@/components/GradientBackground";
import { tw } from "@/lib/tailwind";

import Home from "@/components/Home";
import Landing from "@/components/Landing";

const AppNavigator = createStackNavigator(
  {
    Landing: Landing,
    Home: Home,
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);
