import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export const API_URL = "https://netcetera.mobi/solukeg/api";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    authenticated: false,
    error: null,
    loading: true, // Add loading property
  });

  const loadUser = async () => {
    const user = await AsyncStorage.getItem("user");

    console.log("loadUser user:", user);

    if (user) {
      setAuthState({
        user,
        authenticated: true,
        error: null,
        loading: false, // Set loading to false when user is loaded
      });
    } else {
      setAuthState({
        user: null,
        authenticated: false,
        loading: false, // Set loading to false if no user is found
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    setAuthState({ ...authState, loading: true }); // Set loading to true during login

    try {
      const response = await fetch(
        `${API_URL}/login.php?email=${email}&password=${password}`,
        { method: "POST" }
      );

      const userData = await response.json();

      if (userData) {
        await AsyncStorage.setItem("user", JSON.stringify(userData));

        setAuthState({
          user: userData,
          authenticated: true,
          error: null,
          loading: false, // Set loading to false when login is successful
        });
      }

      return userData;
    } catch (error) {
      if (error.response) {
        setAuthState({
          user: null,
          authenticated: false,
          error: error.response || error.message, // Set a generic error message
          loading: false, // Set loading to false if login fails due to an error
        });
      }

      return false; // Login failed due to an error
    }
  };

  const logout = async () => {
    setAuthState({ ...authState, loading: true }); // Set loading to true during logout

    // Delete user from storage
    await AsyncStorage.removeItem("user");

    // Reset auth state
    setAuthState({
      user: null,
      authenticated: false,
      error: null,
      loading: false, // Set loading to false when logout is complete
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
