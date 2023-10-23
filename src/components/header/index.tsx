import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { IMG_HeaderLogo } from  '../../assets/images'


const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={IMG_HeaderLogo}/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
   
    buttonSearch: {}
  });