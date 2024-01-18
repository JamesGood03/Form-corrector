// RecordScreen.js
import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';

export default function RecordScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);

  // ... (useEffect and useFocusEffect remain the same)

  const startRecording = async () => {
    if (cameraRef.current) {
      setRecording(true);
      const options = { maxDuration: 60 };
      try {
        const data = await cameraRef.current.recordAsync(options);
        setVideoUri(data.uri);
      } catch (error) {
        console.error("Error recording video:", error);
      } finally {
        setRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  const retakeVideo = () => {
    setVideoUri(null);
  };

  const uploadVideo = () => {
    if (videoUri) {
      navigation.navigate('ReviewVideo', { videoUri });
    } else {
      console.warn('No video to review.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="none" />

      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          {!recording ? (
            <Button title="Start Recording" onPress={startRecording} />
          ) : (
            <Button title="Stop Recording" onPress={stopRecording} />
          )}
          {videoUri && (
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewText}>Review your video</Text>
              <TouchableOpacity onPress={retakeVideo}>
                <Text style={styles.retakeText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={uploadVideo}>
                <Text style={styles.reviewButton}>Review Video</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  reviewText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  retakeText: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  reviewButton: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});


