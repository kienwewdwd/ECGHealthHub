import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_NAME } from '../../constants/screenNames';
import React from 'react';
import { HomeScreen } from 'screens';
import { useRoute } from '@react-navigation/native';




const Stack01Router = createNativeStackNavigator();


const Stack1 = () => {
  const route = useRoute(); 
  const {email} = route.params ?? {};

  return (
    <Stack01Router.Navigator screenOptions={{ headerShown: false }}>
      <Stack01Router.Screen name={SCREEN_NAME.HOME_SCREEN} component={HomeScreen} initialParams={{ email: email}} />
    </Stack01Router.Navigator>
  );
};

export default Stack1;