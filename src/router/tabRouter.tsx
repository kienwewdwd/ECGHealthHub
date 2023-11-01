import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Stack1 from './tabRouter/stack1';
import Stack2 from './tabRouter/stack2';
import Stack3 from './tabRouter/stack3';
import Stack4 from './tabRouter/stack4';
import { Image, View } from 'react-native';
import { IMG_Avatar,IMG_HistoryGif, IMG_Home, IMG_HomeGif, IMG_chat } from '../assets/images';
import { IMG_Stat } from '../assets/images';
import { IMG_History } from '../assets/images';
import { IMG_Profile } from '../assets/images';
import { COLORS } from '../assets/color';
import { useRoute } from '@react-navigation/native';

const TabStack = createBottomTabNavigator();
const iconSize = 35;

const TabRouter = () => {
  const route = useRoute(); 
  const {email} = route.params ?? {};
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          if (route.name === 'DashBoard') {
            iconSource = focused ? IMG_HomeGif : IMG_Home;
          } else if (route.name === 'History') {
            iconSource = focused ? IMG_HistoryGif : IMG_History;
          } else if (route.name === 'ChatBox') {
            iconSource = focused ? IMG_chat:IMG_Stat;
          } else if (route.name === 'Profile') {
            iconSource = focused ? IMG_Avatar: IMG_Profile;
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
    
      <TabStack.Screen name={'DashBoard'} component={Stack1} initialParams={{ email: email }}/>
      <TabStack.Screen name={'History'} component={Stack2} initialParams={{ email: email }} />
      <TabStack.Screen name={'ChatBox'} component={Stack3} />
      <TabStack.Screen name={'Profile'} component={Stack4} />
    </TabStack.Navigator>
  );
};

export default TabRouter;
