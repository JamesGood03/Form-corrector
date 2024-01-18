import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

const HomeScreen = () => {
  // useFocusEffect will run the effect when the screen comes into focus
  useFocusEffect(() => {
    // Lock the screen orientation to Portrait
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    // Clean up when the component is unmounted
    return () => {
      ScreenOrientation.unlockAsync();
    };
  });

  const navigation = useNavigation();

  const cards = [
    {
      title: 'Videos',
      imageUri: 'https://netcetera.mobi/upload/uploads/videos.jpg',
      description: 'View your videos and analyze them to improve.',
    },
    {
      title: 'Record',
      imageUri: 'https://app.faidue.com/img/photo-1530712024539-ecd73dfb1c9d.jpg',
      description: 'Record your tennis coaching sessions and matches.',
    },
	{
      title: 'Upload',
      imageUri: 'https://app.faidue.com/img/photo-1545809074-59472b3f5ecc.jpg',
      description: 'Upload your videos and share them with others.',
    },
  ];

  const MyComponent = () => (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={() => navigation.navigate('Record')}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cards.map((card, index) => (
        <Card key={index} style={styles.card} onPress={() => navigation.navigate(card.title)}>
          <Card.Content style={styles.cardContent}>
            <Image source={{ uri: card.imageUri }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </Card.Content>
        </Card>
      ))}
      <MyComponent />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    width: '80%',
    height: 'auto',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'left',
  },
  cardImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;







