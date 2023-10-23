import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Chatbox from './medicalChatScreen'
import Header from 'components/header'

const StatiticScreen = () => {
  return (
    <View style = { styles.container}>
      <Header/>
      <Chatbox/>
    </View>
  )
}

export default StatiticScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})