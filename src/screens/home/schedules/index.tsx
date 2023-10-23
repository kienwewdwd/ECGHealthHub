import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { constants } from 'buffer';
import { useNavigation } from '@react-navigation/native';
import LineChartExample from '../lineChart/ecgChart';


const Schedule1 = () => {
  const dataTimes = [
    { id: 1, day: 1, date: 'Thu' },
    { id: 2, day: 2, date: 'Fri' },
    { id: 3, day: 3, date: 'Sat' },
    { id: 4, day: 4, date: 'Sun' },
    { id: 5, day: 5, date: 'Mon' },
    { id: 6, day: 6, date: 'Tue' },
    { id: 7, day: 7, date: 'Wed' },
    { id: 8, day: 8, date: 'Thu' },
    { id: 9, day: 9, date: 'Fri' },
    { id: 10, day: 10, date: 'Sat' },
    { id: 11, day: 11, date: 'Sun' },
    { id: 12, day: 12, date: 'Mon' },
    { id: 13, day: 13, date: 'Tue' },
    { id: 14, day: 14, date: 'Wed' },
    { id: 15, day: 15, date: 'Thu' },
    { id: 16, day: 16, date: 'Fri' },
    { id: 17, day: 17, date: 'Sat' },
    { id: 18, day: 18, date: 'Sun' },
    { id: 19, day: 19, date: 'Mon' },
    { id: 20, day: 20, date: 'Tue' },
    { id: 21, day: 21, date: 'Wed' },
    { id: 22, day: 22, date: 'Thu' },
    { id: 23, day: 23, date: 'Fri' },
    { id: 24, day: 24, date: 'Sat' },
    { id: 25, day: 25, date: 'Sun' },
    { id: 26, day: 26, date: 'Mon' },
    { id: 27, day: 27, date: 'Tue' },
    { id: 28, day: 28, date: 'Wed' },
    { id: 29, day: 29, date: 'Thu' },
    { id: 30, day: 30, date: 'Fri' },
    { id: 31, day: 31, date: 'Sat' }
  ];

  const navigation = useNavigation();

  const [dateCurrent, setDateCurrent] = useState(dataTimes[0]);
  const changeDateCurrent = time => {
    setDateCurrent(time);
    // navigation.navigate(LineChartExample)
  };
  return (
    <View>
       <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{
        flexDirection: 'row',
        paddingVertical: 8,
        padding: 20,
        marginLeft: 1,
      }}>
      {dataTimes.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            style={{
              borderRadius: 10,
              width: 60,
              height: 60,
              borderWidth: 1,
              padding: 5,
              borderColor: dateCurrent.id === item.id ? 'transparent' : '#0000004D',
              alignItems: 'center',
              backgroundColor: dateCurrent.id === item.id ? 'rgb(255, 0, 0)' : 'white',
              marginRight: 16,
            }}
            onPress={() => changeDateCurrent(item)}>
            <Text
              style={{
                color: dateCurrent.id === item.id ? 'white' : '#0000004D',
                fontSize: 16,
                fontWeight: '500'
              }}>
              {item.date}
            </Text>
            <Text
              style={{
                color: dateCurrent.id === item.id ? 'white' : 'black',
                fontWeight: '500',
                fontSize: 20
              }}>
              {item.day}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
    </View>
  );
};

export default Schedule1;
const styles = StyleSheet.create({
  container: {
      marginHorizontal: 16,
      marginVertical: 8,
      marginTop: -10
  }, 
  text: {
      fontSize: 20,
      fontWeight: '600',
      color: 'rgb(0, 0, 0)'
  }
})
