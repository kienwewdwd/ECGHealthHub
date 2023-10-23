import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainComponent from './mainContent';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MainComponent />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
