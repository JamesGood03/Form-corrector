import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BackhandUpload from './BackhandUpload';  // Import the BackhandUploadScreen component

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    marginBottom: 20,
    width: '90%',
    aspectRatio: 18 / 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '85%',
  },
});

const UploadScreen = () => {
  const navigation = useNavigation();

  const data = [
    {
      title: 'Forehand',
      image: require('./assets/Forehand.jpg'),
    },
    {
      title: 'Backhand',
      image: require('./assets/Backhand.jpg'),
    },
    {
      title: 'Serve',
      image: require('./assets/Serve.jpg'),
    },
    {
      title: 'Smash',
      image: require('./assets/Smash.jpg'),
    },
    {
      title: 'Freestyle',
      image: require('./assets/Freestyle.jpg'),
    },
    {
      title: 'Match',
      image: require('./assets/Match.jpg'),
    },
  ];

  const handleCardPress = (title) => {
    if (title === 'Backhand') {
      navigation.navigate('BackhandUpload');  // Navigate to BackhandUploadScreen for Backhand
    } else {
      navigation.navigate('Upload2');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleCardPress(item.title)}>
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Image source={item.image} style={styles.cardImage} />
              <Title>{item.title}</Title>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default UploadScreen;


