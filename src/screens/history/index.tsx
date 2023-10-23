import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import HistoryComponent from './component'
import HeartRateChart from './heartRateChart'




const HistoryScreen = () => {
  return (
    <SafeAreaView style = { styles.container}>
      <Header/>
      <HistoryComponent/>
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