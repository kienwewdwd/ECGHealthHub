import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Title = ({title}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Title;

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
});
