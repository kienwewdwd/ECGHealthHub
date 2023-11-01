import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../assets/color';
// import HeartRateTab from '../../../screens/home/tackHeartRate';
import { IMG_ECGHistory, IMG_ddmmyy } from '../../../assets/images';
import { IMG_HRHistory } from '../../../assets/images';
import LineChartExample1 from '../../home/lineChart/ecgChartHistory';
import AreaChartExample from '../heartRateChart';
import HRChartHistory from '../../../screens/home/lineChart/hrHistory';

const HistoryComponent = ({email}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.spacing} />
        <Image source={IMG_ECGHistory} style={styles.Image} />
        {/* <Image source={IMG_ddmmyy} style={styles.Image1} /> */}
        <LineChartExample1 email = {email}/>
        <Image source={IMG_HRHistory} style={styles.Image} />
        <HRChartHistory email = {email}/>
        {/* <AreaChartExample/> */}
      </View>
      <View style={styles.spacing} />
    </ScrollView>
  );
};

export default HistoryComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderRadius: 20,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.BackGround
  },
  Image: {
    marginHorizontal: 16,
    marginVertical: 16
  },
  spacing: {
    height: 20
  },
  Image1: {
    marginHorizontal: 12,
    marginTop: -5
  }
});
