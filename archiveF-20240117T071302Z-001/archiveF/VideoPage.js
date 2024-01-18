import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Video } from 'expo-av';
import { Card } from 'react-native-paper';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'; // Added import

const Playscreen = () => {
  // useFocusEffect will run the effect when the screen comes into focus
  useFocusEffect(() => {
    // Lock the screen orientation to Portrait
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    // Clean up when the component is unmounted
    return () => {
      ScreenOrientation.unlockAsync();
    };
  });

  const VideoCard = ({ video, onPress }) => (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.videoContainer}>
        <Image
          source={{ uri: video.thumb }}
          style={styles.videoThumbnail}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Card.Content>
        <Text style={styles.title}>{video.name}</Text>
        <Text style={styles.description}>
          {`${video.datetime}`}
        </Text>
      </Card.Content>
    </Card>
  );

  const VideoPage = () => {
    const navigation = useNavigation();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const response = await axios.get(
            "https://netcetera.mobi/ladder/api/videos.php?api=a12345678987654321!!&id=2"
          );
          setVideos(response.data.videos);
        } catch (error) {
          console.error('Error fetching videos: ', error);
        }
      };

      fetchVideos();
    }, []);

    const handleVideoPress = (videoUrl) => {
      navigation.navigate('Play', { videoUrl });
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {videos.map((video) => (
          <TouchableOpacity key={video.id} onPress={() => handleVideoPress(video.url)}>
            <VideoCard video={video} onPress={() => handleVideoPress(video.url)} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    card: {
      margin: 10,
      width: '80%',
      height: 'auto',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
    },
    videoContainer: {
      width: '100%',
      aspectRatio: 16 / 9,
      overflow: 'hidden',
    },
    videoThumbnail: {
      flex: 1,
    },
  });

  return <VideoPage />;
};

export default Playscreen;




