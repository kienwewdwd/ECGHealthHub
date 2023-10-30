import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import database from '@react-native-firebase/database';
import {
  IMG_Connect,
  IMG_Decrease,
  IMG_Disconnect,
  IMG_Increase,
  IMG_Save
} from '../../../assets/images';
import { IMG_Clear } from '../../../assets/images';
import { COLORS } from '../../../assets/color';
import LineGraph from '@chartiful/react-native-line-graph';

const HRChartExample = () => {
  const [chartData, setChartData] = useState([]);
  const [isConnected, setIsConnected] = useState(false); // Trạng thái kết nối
  const [width, setWidth] = useState (330);
  const [height, setHeight] = useState (165);

  const [chartData1, setChartData1] = useState();
  const [dataHistory, setDataHistory] = useState([0,0]);

  useEffect(() => {
    const reference = database().ref('/BPM');
  
    if (isConnected) {
      const listener = reference.on('value', snapshot => {
        const value = snapshot.val();
        if (value !== null) {
          const intValue = parseInt(value, 10);
          setChartData1(intValue);
          setDataHistory(prevData => {
            if (prevData.length >= 10) {
              prevData = prevData.slice(1);
            }
            return [...prevData, intValue];
          });
        }
      });
  
      return () => reference.off('value', listener);
    }
  }, [isConnected]);

  // console.log(dataHistory); 

  useEffect(() => {
    const reference = database().ref('/test/heartrate');
    if (isConnected === true) {
      reference.on('value', snapshot => {
        const value = snapshot.val();
        if (value) {
          const chartData = Object.values(value);
          setChartData(chartData);
        }
      });
    } else {
      reference.off('value'); // Ngắt kết nối Firebase
    }
  }, [isConnected]);

  const toggleConnection = () => {
    setIsConnected(!isConnected); // Đảo ngược trạng thái kết nối
  };
  const clearData = () => {
    Alert.alert(
      'Clear Data',
      'Are you sure you want to clear the data?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            const dataRef = database().ref('/test/heartrate');
            dataRef
              .remove()
              .then(() => {
                Alert.alert('Data cleared successfully.');
              })
              .catch(error => {
                Alert.alert('Error clearing data:', error);
              });
          }
        }
      ],
      { cancelable: false }
    );
  };
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + '-' + month + '-' + year);
    setCurrentTime(hours + ':' + min + ':' + sec);
  }, []);
  const pushDataToFirebase = () => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    const dataRef = database().ref(`/history/heartRateStore/${currentDate}/${hours}:${min}:${sec}`);
    dataRef
      .set(dataHistory)
      .then(() => {
        Alert.alert('Data pushed to Firebase successfully.');
      })
      .catch(error => {
        Alert.alert('Error pushing data to Firebase:', error);
      });
  };
  const increaseContentInset = () => {
    const newWidth = width + 5;
    const newHeight = height + 5;
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const decreaseContentInset = () => {
    const newWidth = width - 5;
    const newHeight = height - 5;
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <View>
      <View style={{ marginBottom: 12, marginLeft: 16 }}>
        <TouchableOpacity onPress={toggleConnection}>
          <Image source={isConnected ? IMG_Connect : IMG_Disconnect} />
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <View style={styles.rowing}>
          <View style={styles.container}>
            <LineGraph
              data={dataHistory}
              width={width}
              height={height}
              lineColor= {COLORS.LightBlue}
              dotColor={COLORS.DarkBlue}
              lineWidth={3}
              isBezier
              hasDots={true}
              baseConfig={{
                startAtZero: false,
                hasXAxisBackgroundLines: false,
                xAxisLabelStyle: {
                  // prefix: '',
                  // offset: 30


                }

              }}
              style={{
                marginBottom: 20,
                padding: 10,
                paddingTop: 20,
                borderRadius: 20,
                width: '100%',
                backgroundColor: 'transparent'
              }}
            />
          </View>
          <View style={styles.spacing1} />
          <View>
            <TouchableOpacity onPress={decreaseContentInset}>
              <View>
                <Image source={IMG_Increase} />
              </View>
            </TouchableOpacity>
            <View style={styles.spacing2} />
            <View />
            <TouchableOpacity onPress={increaseContentInset}>
              <View>
                <Image source={IMG_Decrease} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.spacing} />
      <View style={styles.panding}>
        <View style={styles.rowing}>
          <TouchableOpacity onPress={clearData}>
            <Image source={IMG_Clear} style={styles.Image} />
          </TouchableOpacity>
          <View style={styles.spacing1} />
          <TouchableOpacity onPress={pushDataToFirebase}>
            <Image source={IMG_Save} style={styles.Image} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HRChartExample;

const styles = StyleSheet.create({
  container1: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    borderRadius: 10,
    width: '90%',
    height: 200,
    borderWidth: 2,
    borderColor: COLORS.LightBlue
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgb(0, 0, 0)'
  },
  inforContainer: {
    borderRadius: 10,
    width: 60,
    height: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spacing: {
    height: 15
  },
  panding: {
    // alignItems: 'center'
    marginHorizontal: 16
  },
  rowing: {
    flexDirection: 'row'
  },
  spacing1: {
    width: 10
  },
  Image: {
    height: 31,
    width: 61
  },
  spacing2: {
    height: 20
  },
  spacing3: {
    height: 5
  }
});
