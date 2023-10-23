import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import React, { useEffect } from 'react';
import MainRouter from './router/mainRouter';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <MainRouter />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
