import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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

const BackhandUploadScreen = () => {
  const navigation = useNavigation();

  const data = [
    {
      title: 'Single Handed',
      image: require('./assets/Backhand.jpg'),
    },
    {
      title: 'Double Handed',
      image: require('./assets/Backhand.jpg'),
    },
    {
      title: 'Slice',
      image: require('./assets/Backhand.jpg'),
    },
  ];

  const handleCardPress = () => {
    navigation.navigate('Upload2');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity key={index} onPress={handleCardPress}>
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

export default BackhandUploadScreen;



