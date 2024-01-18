import React from 'react';
import { Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const TestComponent = () => {
  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: false,
      });

      console.log('DocumentPicker result:', result);

      if (result.type === 'success') {
        console.log('Video picked:', result.uri);
      } else {
        console.log('Document picking cancelled or failed.');
      }
    } catch (error) {
      console.error('Error picking video:', error);
    }
  };

  return <Button title="Pick a Video" onPress={pickVideo} />;
};

export default TestComponent;


