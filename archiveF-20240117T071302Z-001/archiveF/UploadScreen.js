import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const UploadScreen = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [videoUri, setVideoUri] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const pickVideo = async () => {
    console.log('Picking a video...');

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      console.log('Media Library permission status:', status);

      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });

      console.log('ImagePicker result:', result);

      if (!result.cancelled) {
        setVideoUri(result.uri);
      } else {
        console.log('Video picking cancelled.');
      }
    } catch (error) {
      console.error('Error picking video:', error);
    }
  };

  const uploadVideo = async () => {
    if (videoUri) {
      const formData = new FormData();
      formData.append('videoFile', {
        uri: videoUri,
        videoFile: 'video.mp4',
        type: 'video/mp4',
      });

      try {
        const response = await axios.post("https://upload.storage.im/uppy/python11.php", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
		  body: 'id=2&what=forehand',
        });

        console.log('Server response:', response.data);

        // Check the server's response
        if (response.status === 200) {
          console.log('File uploaded successfully.');
          // Reset videoUri after successful upload
          setVideoUri(null);
        } else {
          console.log('File upload failed.');
        }
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    }
  };

  useFocusEffect(() => {
    console.log('Screen focused');
    // Add any logic here that needs to run when the screen comes into focus
  });

  return (
    <View style={styles.container}>
      <Text>Upload Screen</Text>
      <StatusBar style="none" />
      <View>
        <Button title="Pick a Video" onPress={pickVideo} />
        {videoUri && <Button title="Upload Video" onPress={uploadVideo} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default UploadScreen;





