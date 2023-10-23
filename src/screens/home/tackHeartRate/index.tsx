import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMG_Heart } from '../../../assets/images'
import { IMG_Line } from '../../../assets/images'
import { COLORS } from './../../../assets/color'

const HeartRateTab = () => {
  return (
    <View style = {styles.container1}>
         <View style = { styles.infoContainer}>
        <View style = {styles.container}>
        <Image source={IMG_Heart} style = {styles.image}/>
        <View>
            <Text style = {styles.text}>Heart Rate</Text>
        </View>
        <View style = {styles.spacing} />
        <Image source={IMG_Line} style = {styles.image1}/>
        <View style = {styles.spacing} />
        <View>
            <Text style = {styles.text}>__ __ bpm</Text>
        </View>
        </View>
    </View>

    </View>                             
  )
}

export default HeartRateTab

const styles = StyleSheet.create({
    infoContainer: {
        borderRadius: 15,
        width: 330,
        height: 60,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: COLORS.LightBlue,
        shadowColor: 'black', // Màu của bóng
        shadowOffset: { width: 0, height: 4 }, // Độ dịch chuyển của bóng
        shadowRadius: 4, // Độ rộng của bóng
        shadowOpacity: 1 // Độ trong suốt của bóng
    },
    container: {
        flexDirection: 'row'
    },
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10

    },
    image: {
        width: 50,
        height: 50,
    
        tintColor: 'white'
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
        marginLeft: 10,
        color: 'white'
    },
    image1: {
        width: 4,
        height: 50,
        tintColor: 'white'
    },
    spacing: {
        width: 10
    }
})