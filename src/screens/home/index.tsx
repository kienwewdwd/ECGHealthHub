import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainComponent from './mainContent';
import { useRoute } from '@react-navigation/native';

const HomeScreen = () => {
  const route = useRoute(); 
  const {email} = route.params ?? {};
  // console.log('homeScreen', email)

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MainComponent email = {email}/>
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
