import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const PlayScreen = ({ route }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    loadVideo();

    // Lock the screen orientation to LANDSCAPE when the component is mounted
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      if (videoRef.current) {
        videoRef.current.unloadAsync().catch((error) => console.warn('Error unloading video:', error));
      }

      // Unlock the screen orientation when the component is unmounted
      ScreenOrientation.unlockAsync();
    };
  }, [route.params.videoUrl]);

  const loadVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.unloadAsync();

      await videoRef.current.loadAsync(
        { uri: route.params.videoUrl },
        { shouldPlay: true } // Add shouldPlay option to start playing automatically
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Video
        ref={videoRef}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        source={{ uri: route.params.videoUrl }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default PlayScreen;






