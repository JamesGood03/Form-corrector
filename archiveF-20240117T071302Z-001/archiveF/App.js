// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import UploadScreen2 from './UploadScreen';
import UploadScreen from './UploadScreen2';
import BackhandUpload from './BackhandUpload';
import RecordScreen from './RecordScreen';
import VideoPage from './VideoPage';
import PlayScreen from './PlayScreen';
import ReviewScreen from './ReviewVideoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Hide header on HomeScreen
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
          initialParams={{ onLoginSuccess: () => setIsLoggedIn(true) }}
        />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
		<Stack.Screen name="Upload2" component={UploadScreen2} />
		<Stack.Screen name="BackhandUpload" component={BackhandUpload} />
        <Stack.Screen name="Videos" component={VideoPage} />
        <Stack.Screen name="Play" component={PlayScreen} />
		<Stack.Screen name="ReviewVideo" component={ReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}





