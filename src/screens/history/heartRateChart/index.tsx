import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Line } from 'react-native-svg';
import database from '@react-native-firebase/database';
import { COLORS } from '../../../assets/color';

const AreaChartExample = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const reference = database().ref('/history/heartRateDataStore/10:14:2023/23:31:57');
    reference.on('value', snapshot => {
      const value = snapshot.val();
      if (value) {
        const chartData = Object.values(value);
        setChartData(chartData);
      }
    });
    return () => reference.off('value');
  }, []);

  const contentInset = { top: 30, bottom: 30 };

  return (
    <View style={styles.container}>
      <View style={{ height: 200, flexDirection: 'row' }}>
        <YAxis
          data={chartData}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}`} // Customize the format as needed
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <AreaChart
            style={styles.chart}
            data={chartData}
            contentInset={contentInset}
            curve={shape.curveNatural}
            svg={{ fill: COLORS.LightBlue }}>
            <Grid />
            <Line x1="0" x2="100%" y1="90%" y2="90%" stroke={'black'} strokeWidth={4} />
            <Line x1="0" x2="0" y1="0" y2="90%" stroke={'black'} strokeWidth={4}  />
          </AreaChart>
          {/* <XAxis
            style={{ marginTop: 10 }}
            data={chartData}
            formatLabel={(value, index) => `Day ${index + 1}`} // Customize the format as needed
            contentInset={{ left: 20, right: 20 }}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
          /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    height: 200,
    width: '95%',
  },
});

export default AreaChartExample;
