import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IMG_Heart, IMG_heart } from '../../../assets/images';
import { IMG_Line } from '../../../assets/images';
import { COLORS } from './../../../assets/color';
import database from '@react-native-firebase/database';
import { LineChart, Grid } from 'react-native-svg-charts';


const HeartRateTab = () => {
  const [chartData1, setChartData1] = useState();
  const [dataHistory, setDataHistory] = useState([]);
  

  useEffect(() => {
    const reference = database().ref('/BPM');
    reference.on('value', snapshot => {
      const value = snapshot.val();
      if (value !== null) {
        const intValue = parseInt(value, 10);
        setChartData1(intValue);
        setDataHistory(prevData => {
          // Ensure the array only contains the last 10 data points
          if (prevData.length >= 10) {
            prevData.shift(); // Remove the oldest data point from the beginning
          }
          // Add the new value to the end of the array
          prevData.push(intValue);
          return [...prevData]; // Create a new array to trigger a state update
        }
        );
      }
    });
    
    return () => reference.off('value');
  }, []);

  // console.log(dataHistory); 
  return (
    <View style={styles.container1}>
      <View style={styles.infoContainer}>
        <View style={styles.container}>
          <Image source={IMG_heart} style={styles.image} />
          <View>
            <Text style={styles.text}>Heart Rate</Text>
          </View>
          <View style={styles.spacing} />
          <Image source={IMG_Line} style={styles.image1} />
          <View style={styles.spacing} />
          <View>
            <Text style={styles.text}>{chartData1}  bpm</Text>
          </View>
        </View>
        
      </View>
    </View>
  );
};

export default HeartRateTab;

const styles = StyleSheet.create({
  infoContainer: {
    borderRadius: 15,
    width: 330,
    height: 60,
    alignItems: 'center',
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
});
