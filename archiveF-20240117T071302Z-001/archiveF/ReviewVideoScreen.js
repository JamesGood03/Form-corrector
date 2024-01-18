// ReviewVideoScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';

export default function ReviewVideoScreen({ route }) {
  const { videoUri } = route.params;

  const uploadVideo = () => {
    // Implement your video uploading logic here
    console.log('Uploading video:', videoUri);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        style={{ flex: 1 }}
      />
      <TouchableOpacity onPress={uploadVideo}>
        <View style={styles.button}>
          <Text>Upload Video</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});
