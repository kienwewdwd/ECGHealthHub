import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_NAME } from '../../constants/screenNames';
import React from 'react';
import { HomeScreen } from 'screens';




const Stack01Router = createNativeStackNavigator();

const Stack1 = () => {
  return (
    <Stack01Router.Navigator screenOptions={{ headerShown: false }}>
      <Stack01Router.Screen name={SCREEN_NAME.HOME_SCREEN} component={HomeScreen}  />
    </Stack01Router.Navigator>
  );
};

export default Stack1;