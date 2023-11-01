import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import HistoryComponent from './component'
import { useRoute } from '@react-navigation/native'




const HistoryScreen = () => {
  const route = useRoute(); 
  const {email} = route.params ?? {};
  return (
    <SafeAreaView style = { styles.container}>
      <Header/>
      <HistoryComponent email = {email} />
    </SafeAreaView>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})