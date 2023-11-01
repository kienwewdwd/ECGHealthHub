import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SCREEN_NAME } from '../../constants';
import { HistoryScreen, StatisticScreen } from 'screens';
import { useRoute } from '@react-navigation/native';


const Stack01Router = createNativeStackNavigator();

const Stack2 = () => {
  const route = useRoute(); 
  const {email} = route.params ?? {};
  return (
    <Stack01Router.Navigator screenOptions={{ headerShown: false }}>
      <Stack01Router.Screen name={SCREEN_NAME.HISTORY_SCREEN} component={HistoryScreen} initialParams={{ email: email }} />
    </Stack01Router.Navigator>
  );
};

export default Stack2;