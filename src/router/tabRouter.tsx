import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Stack1 from './tabRouter/stack1';
import Stack2 from './tabRouter/stack2';
import Stack3 from './tabRouter/stack3';
import Stack4 from './tabRouter/stack4';
import { Image, StyleSheet, View } from 'react-native';
import { IMG_DashBoard } from '../assets/images';
import { IMG_Stat } from '../assets/images';
import { IMG_History } from '../assets/images';
import { IMG_Profile } from '../assets/images';
import { COLORS } from '../assets/color';

const TabStack = createBottomTabNavigator();
const iconSize = 30;

const TabRouter = () => {
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          if (route.name === 'DashBoard') {
            iconSource = IMG_DashBoard;
          } else if (route.name === 'History') {
            iconSource = IMG_History;
          } else if (route.name === 'ChatBox') {
            iconSource = IMG_Stat;
          } else if (route.name === 'Profile') {
            iconSource = IMG_Profile;
          }
          return (
            <View >
              <Image
              source={iconSource}
              style={{ width: iconSize, height: iconSize, tintColor: color }}
            />
            </View>
          );
        }
      })}
      tabBarOptions={{
        style: {
         
        },

        labelStyle: {
          fontSize: 13,
          fontWeight: '600'
        },
        activeTintColor: COLORS.DarkBlue,
        inactiveTintColor: '#4F4C4C'
      }}>
    
      <TabStack.Screen name={'DashBoard'} component={Stack1} />
      <TabStack.Screen name={'History'} component={Stack2} />
      <TabStack.Screen name={'ChatBox'} component={Stack3} />
      <TabStack.Screen name={'Profile'} component={Stack4} />
    </TabStack.Navigator>
  );
};

export default TabRouter;
