import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRouter from './tabRouter';
import { SCREEN_NAME } from '../constants/screenNames';
import { HomeScreen, LoginScreen, WelcomeScreen } from 'screens';
import LoginRouter from './loginRouter';
import Stack1 from './tabRouter/stack1';

const MainStack = createNativeStackNavigator();

const MainRouter = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none'
      }}>
   
      <MainStack.Screen name={SCREEN_NAME.WElCOME_SCREEN} component={WelcomeScreen} />
      <MainStack.Screen name={'LoginRouter'} component={LoginRouter} />
      <MainStack.Screen name={'TabRouter'} component={TabRouter} />
      <MainStack.Screen name={'Stack1'} component={Stack1} />
    </MainStack.Navigator>
  );
};

export default MainRouter;
