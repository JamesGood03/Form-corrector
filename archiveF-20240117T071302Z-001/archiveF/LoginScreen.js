import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = "https://netcetera.mobi/ladder/api";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('chris.j.butler@live.com');
  const [password, setPassword] = useState('Chris32az');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const clearErrorOnFocus = () => {
      setError(null); // Clear error when the screen comes into focus
    };

    const unsubscribeFocus = navigation.addListener('focus', clearErrorOnFocus);

    return () => {
      // Cleanup: Remove the focus event listener when the component unmounts
      unsubscribeFocus();
    };
  }, [navigation]);

  const extractUserId = (url) => {
    // Extract user ID from the URL
    // Adjust the regular expression based on the actual structure of your API response URL
    const matches = url.match(/\/user\/(\d+)/);
    return matches ? matches[1] : null;
  };

const login = async () => {
  setLoading(true);

  try {
    const response = await fetch(
      `${API_URL}/login.php?email=${email}&password=${password}`,
      { method: "POST" }
    );

    const userData = await response.json();

    if (userData && userData.id) {
      const userId = userData.id;
      console.log("User ID:", userId);

      const userWithId = { ...userData, userId };
      await AsyncStorage.setItem("user", JSON.stringify(userWithId));
      navigation.navigate('Home');
    }
  } catch (error) {
    setError(error.response || error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.loginButton} onPress={login} disabled={loading}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;




