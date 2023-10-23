import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRouter from './tabRouter';
import { SCREEN_NAME } from '../constants/screenNames';
import { LoginScreen, WelcomeScreen } from 'screens';

const MainStack = createNativeStackNavigator();

const MainRouter = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none'
      }}>
      {/* <MainStack.Screen name={SCREEN_NAME.LOGIN_SCREEN} component={LoginScreen} /> */}
      <MainStack.Screen name={SCREEN_NAME.WElCOME_SCREEN} component={WelcomeScreen} />
      <MainStack.Screen name={'TabRouter'} component={TabRouter} />
    </MainStack.Navigator>
  );
};

export default MainRouter;
