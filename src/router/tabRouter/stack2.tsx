import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SCREEN_NAME } from '../../constants';
import { HistoryScreen, StatisticScreen } from 'screens';


const Stack01Router = createNativeStackNavigator();

const Stack2 = () => {
  return (
    <Stack01Router.Navigator screenOptions={{ headerShown: false }}>
      <Stack01Router.Screen name={SCREEN_NAME.HISTORY_SCREEN} component={HistoryScreen} />
    </Stack01Router.Navigator>
  );
};

export default Stack2;