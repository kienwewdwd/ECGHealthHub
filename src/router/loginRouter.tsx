import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_NAME } from '../constants/screenNames';
import SignInScreen from '../screens/login/signIn';
import SignUpScreen from '../screens/login/signUp';

const MainStack = createNativeStackNavigator();

const LoginRouter = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none'
      }}>
      <MainStack.Screen name={SCREEN_NAME.SIGNIN_SCREEEN} component={SignInScreen} />
      <MainStack.Screen name={SCREEN_NAME.SIGNUP_SCREEN} component={SignUpScreen} />
    </MainStack.Navigator>
  );
};

export default LoginRouter;
