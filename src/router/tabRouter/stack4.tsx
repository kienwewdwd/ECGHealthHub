import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SCREEN_NAME } from '../../constants';
import { ProfileScreen } from 'screens';

const Stack01Router = createNativeStackNavigator();

const Stack4 = () => {
  return (
    <Stack01Router.Navigator screenOptions={{ headerShown: false }}>
      <Stack01Router.Screen name={SCREEN_NAME.PROFILE_SCREEN} component={ProfileScreen} />
    </Stack01Router.Navigator>
  );
};

export default Stack4;
