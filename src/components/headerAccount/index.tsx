import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IMG_Ellipse } from 'assets';

const HearderAccount = () => {
  return (
    <View>
      <View>
        <Image source={IMG_Ellipse} />
      </View>
      <View>
        <Text> Patient Name </Text>
      </View>
    </View>
  );
};

export default HearderAccount;

const styles = StyleSheet.create({});
