import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import database from '@react-native-firebase/database';
import { IMG_Decrease, IMG_LineRow, IMG_LineRowngan, IMG_LineRowvua } from '../../../../assets/images';
import { IMG_Increase } from '../../../../assets/images';
import { COLORS } from '../../../../assets/color';
import LineGraph from '@chartiful/react-native-line-graph'


const HRChartHistory = ({email}) => {
  const [chartData, setChartData] = useState([]);
  const [paths, setPaths] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  const [paths1, setPaths1] = useState([]);
  const [selectedPath1, setSelectedPath1] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [contentInset, setContentInset] = useState({ top: 30, bottom: 30 });
  const [width, setWidth] = useState (330);
  const [height, setHeight] = useState (165);
  const userName = email.replace(/[^a-zA-Z0-9]/g, '');



  useEffect(() => {
    // Fetch the top-level paths from Firebase
    const reference = database().ref(`/history/${userName}/heartRateStore`);
    reference.on('value', snapshot => {
      const value = snapshot.val();
      if (value) {
        const pathList = Object.keys(value);
        setPaths(pathList);
      }
    });
    return () => reference.off('value');
  }, []);

  useEffect(() => {
    if (selectedPath) {
      // Fetch the subpaths under the selected top-level path
      const reference1 = database().ref(`/history/${userName}/heartRateStore/${selectedPath}`);
      reference1.on('value', snapshot => {
        const value = snapshot.val();
        if (value) {
          const pathList1 = Object.keys(value);
          setPaths1(pathList1);
        }
      });
      return () => reference1.off('value');
    }
  }, [selectedPath]);

  useEffect(() => {
    if (selectedPath1) {
      // Fetch the data associated with the selected subpath
      const dataReference = database().ref(
        `/history/${userName}/heartRateStore/${selectedPath}/${selectedPath1}`
      );
      dataReference.on('value', snapshot => {
        const value = snapshot.val();
        if (value) {
          const chartData = Object.values(value);
          setChartData(chartData);
        }
      });
      return () => dataReference.off('value');
    }
  }, [selectedPath1]);

  const handlePathSelection = path => {
    setSelectedPath(path);
    setSelectedPath1(null); // Reset selected subpath when selecting a new top-level path
  };

  const handlePathSelection1 = path1 => {
    setSelectedPath1(path1);
  };
   // Function to increase the top and bottom contentInset
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
    <View style={styles.container1}>
      <View style = {styles.infoCotainer3}>
      <FlatList
        data={paths}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.container2}>
            <TouchableOpacity
              onPress={() => {
                handlePathSelection(item);
                setSelectedItem1(item); // Đánh dấu item được chọn
              }}>
                <View
                style={{
                  borderRadius: 10,
                  width: 100,
                  height: 30,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: selectedItem1 === item ? COLORS.LightBlue : 'white',
                  borderColor: selectedItem1 === item ? 'transparent' : '#0000004D'
                }}>
                <Text
                  style={{
                    color: selectedItem1 === item ? 'white' : 'black',
                    fontSize: 16,
                    fontWeight: '700'
                  }}>
                  {item}
                </Text>
              </View>  
            </TouchableOpacity>
          </View>
        )}
      />

      </View>
     
      {selectedPath && (
        <View style = {styles.infoCotainer4}>
           <Image source={IMG_LineRow}/>
           <FlatList
          data={paths1}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.container2}>
              <TouchableOpacity
                onPress={() => {
                  handlePathSelection1(item);
                  setSelectedItem2(item);
                }}>
                <View style = {{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: selectedItem2 === item ? COLORS.LightBlue : 'black',
                      fontWeight: selectedItem2 === item ? '800' : '500',
                      fontSize: selectedItem2 === item  ? 17 : 14
                    }}>
                    | {item} |
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />

        </View>
       
      )}
        <View style = {styles.spacing2}/>
      <View style = {styles.rowing}>
      <View style={styles.container}>
      <LineGraph
              data={chartData}
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
                yAxisLabelCount: false
                // hasYAxisLabels: false
              

              }}
              style={{
                
                marginBottom: 20,
                padding: 10,
                paddingTop: 20,
                borderRadius: 20,
                width: '100%',
                backgroundColor: 'transparent',
                flex : 1
              }}
            />
        </View>
        <View style = {styles.spacing1}/>
        <View >
         <View >
         <TouchableOpacity onPress={decreaseContentInset}>
         <View >
          <Image source={IMG_Increase} style = {styles.image}/>
          </View>
        </TouchableOpacity>
        <View style = {styles.spacing}/>
        <View/>
        <TouchableOpacity onPress={increaseContentInset}>
          <View >
            <Image source={IMG_Decrease} style = {styles.image}/>
          </View>
        </TouchableOpacity>
         </View>
      </View>
        
      </View>
      
      </View>
  );
};

export default HRChartHistory;

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
    fontSize: 20,
    fontWeight: '600',
    color: 'rgb(0, 0, 0)'
  },
  infoContainer: {
    borderRadius: 10,
    width: 70,
    height: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    // flexDirection: 'row',
    margin: 10
  },
  infoCotainer2: {
    borderRadius: 10,
    width: 70,
    height: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowing: {
    flexDirection: 'row'
  },
  image: {
    
    // tintColor: 'transparent'
  },
  spacing: {
    height: 20
  },
  spacing2: {
    height: 5
  },
  spacing1: {
    width: 5
  },
  infoCotainer3: {
    borderRadius: 10,
    width: '90%',
    // height: 25,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoCotainer4: {
    borderRadius: 10,
    width: '85%',
    // height: 25,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
