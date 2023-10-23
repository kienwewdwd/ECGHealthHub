import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SCREEN_NAME } from '../../constants';
import { HistoryScreen, StatisticScreen } from 'screens';


const Stack01Router = createNativeStackNavigator();

const Stack3 = () => {
  return (
    <Stack01Router.Navigator screenOptions={{ headerShown: false }}>
      <Stack01Router.Screen name={SCREEN_NAME.STATISTIC_SCREEN} component={StatisticScreen} />
    </Stack01Router.Navigator>
  );
};

export default Stack3;