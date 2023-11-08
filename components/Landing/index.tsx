import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import { Link } from 'expo-router';
import { Image } from "expo-image";
import { tw } from '@/lib/tailwind';


const Landing = ({ navigation }) => {
  useEffect(() => {
    // Redirect to the home page after 3 seconds
    const redirectTimeout = setTimeout(() => {
      navigation.navigate('Home'); // Replace 'Home' with the name of your home screen
    }, 3000); // 3000 milliseconds (3 seconds)

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(redirectTimeout);
  }, [navigation]);

  return (
    <View style={tw`flex-1 items-center justify-center`}>
   
    <Image source={require('@/assets/whitestone-black.svg')} style={tw`py-4 w-60 h-28` } />

     <Text style={tw`font-mulish text-navy-blue text-lg`}>Your personal dental assistant</Text>
    </View>
  );
};

export default Landing;
