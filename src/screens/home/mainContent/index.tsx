import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../assets/color';
import LineChartExample from '../lineChart/ecgChart';
import { IMG_ECGChartTilte } from '../../../assets/images';
import { IMG_HRChartTitle } from '../../../assets/images';
import HeartRateTab from '../tackHeartRate';
import HRChartExample from '../lineChart/heartRateChart';

const MainComponent = ({email}) => {
  const emailName = email;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.spacing} />
        <HeartRateTab />
        <Image source={IMG_ECGChartTilte} style={styles.Image} />
        <LineChartExample email={email}/>
        <Image source={IMG_HRChartTitle} style={styles.Image} />
        <HRChartExample email={email} />
      </View>
      <View style={styles.spacing} />
    </ScrollView>
  );
};

export default MainComponent;

const styles = StyleSheet.create({
  container: {
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
  }
});
