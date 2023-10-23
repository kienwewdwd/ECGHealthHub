import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import database from '@react-native-firebase/database';
import { IMG_Decrease, IMG_Increase, IMG_Save } from '../../../assets/images';
import { IMG_Clear } from '../../../assets/images';
import { COLORS } from '../../../assets/color';
import { useRoute } from '@react-navigation/native';



const LineChartExample = () => {
  const [chartData, setChartData] = useState([]);
  const [contentInset, setContentInset] = useState({ top: 30, bottom: 30 });
  // const route = useRoute();
  // const email = route.params?.email;
  // console.log(email)
  useEffect(() => {
    const reference = database().ref('/heartRateData');
    reference.on('value', snapshot => {
      const value = snapshot.val();
      if (value) {
        const chartData = Object.values(value);
        setChartData(chartData);
      }
    });
    return () => reference.off('value');
  }, []);

  // const createPDFFromChart = async () => {
  //   try {
  //     // Tạo biểu đồ từ dữ liệu chartData, ở đây bạn có thể sử dụng thư viện 'react-native-svg-charts' để vẽ biểu đồ
  //     const chartSvg = '<LineChartExample />'; // Thay thế bằng mã để vẽ biểu đồ thực tế

  //     const htmlContent = `
  //       <html>
  //         <head>
  //           <meta charset="utf-8">
  //           <title>Chart Report</title>
  //         </head>
  //         <body>
  //           <h1>Chart Report</h1>
  //           <div>
  //             ${chartSvg}
  //           </div>
  //         </body>
  //       </html>
  //     `;

  //     const options = {
  //       html: htmlContent,
  //       fileName: 'chart_report',
  //       directory: 'Download',
  //       base64: true
  //     };

  //     const file = await RNHTMLtoPDF.convert(options);

  //     Alert.alert('PDF Created', `Path: ${file.filePath}`);
  //   } catch (error) {
  //     Alert.alert('Error', `Failed to create PDF: ${error}`);
  //   }
  // };

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
            const dataRef = database().ref('/heartRateData');
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
    setCurrentDate(
      date + '-' + month + '-' + year 
    );
    setCurrentTime(
      hours + ':' + min + ':' + sec
    );
  }, []);
  const pushDataToFirebase = () => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    const dataRef = database().ref(
      `/history/heartRateDataStore/${currentDate}/${hours}:${min}:${sec}`
    );
    dataRef
      .set(chartData)   
      .then(() => {
        Alert.alert('Data pushed to Firebase successfully.');
      })
      .catch(error => {
        Alert.alert('Error pushing data to Firebase:', error);
      });
  };
  // const saveDataAutomatically = () => {
  //   const pushDataToFirebaseAutomatically = () => {
  //     var hours = new Date().getHours(); //Current Hours
  //   var min = new Date().getMinutes(); //Current Minutes
  //   var sec = new Date().getSeconds(); //Current Seconds
  //     const dataRef = database().ref(`/history/heartRateDataStoreAutomatically/${currentDate}/${hours}:${min}:${sec}`);
  //     dataRef
  //       .set(chartData)
  //       .then(() => {
  //       })
  //       .catch(error => {
  //         console.error('Error pushing data to Firebase', error);
  //       });
  //   };
  // //   pushDataToFirebaseAutomatically();
  // //   const intervalID = setInterval(pushDataToFirebaseAutomatically, 300000);
  // // };
  // // saveDataAutomatically();

  // useEffect (() => {
  //   const timer =  setTimeout(pushDataToFirebaseAutomatically, 5000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // });
  const increaseContentInset = () => {
    const newTop = contentInset.top + 10;
    const newBottom = contentInset.bottom + 10;
    setContentInset({ top: newTop, bottom: newBottom });
  };

  const decreaseContentInset = () => {
    const newTop = contentInset.top - 10;
    const newBottom = contentInset.bottom - 10;
    setContentInset({ top: newTop, bottom: newBottom });
  };

  return (
    <View>
      <View style={styles.container1}>
        <View style={styles.rowing}>
          <View style={styles.container}>
            <LineChart
              style={{ flex: 1 }}
              data={chartData}
              animate
              numberOfTicks={5}
              contentInset={contentInset}
              yAccessor={({ item }) => item} // Replace 'y' with the actual field name for the y-axis in your data
              xAccessor={({ index }) => index} // Provide the index as xAccessor
              svg={{ stroke: COLORS.LightBlue }}>
              <Grid
                svg={{
                  stroke: 'transparent',
                  strokeOpacity: 0.3
                }}
                direction="BOTH"
              />
            </LineChart>
          </View>
          <View style = {styles.spacing1}/>
          <View>
          <TouchableOpacity onPress={decreaseContentInset}>
         <View >
          <Image source={IMG_Increase}/>
          </View>
        </TouchableOpacity>
        <View style = {styles.spacing2}/>
        <View/>
        <TouchableOpacity onPress={increaseContentInset}>
          <View >
            <Image source={IMG_Decrease}/>
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

export default LineChartExample;

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
