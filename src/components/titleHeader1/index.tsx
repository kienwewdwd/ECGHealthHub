import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TitleHeader1 = ({title}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default TitleHeader1;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 16,
    marginTop: -10
  },
  text: {
    fontSize: 30,
    fontWeight: '600',
    color: 'rgb(0, 0, 0)'
  }
});
