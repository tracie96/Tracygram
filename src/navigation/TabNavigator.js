import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  HomeStackNavigator,
  ProjectsStackNavigator,
  MoreStackNavigator,
  CommunityStackNavigator,
} from './StackNavigator';
import {SvgIcon} from '../components/svg-icon';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={props => <BottomTabNav {...props} />}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size, focused}) => {
          return <SvgIcon name="Tab1" size={20} />;
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Projects" component={ProjectsStackNavigator} />
      <Tab.Screen name="Community" component={CommunityStackNavigator} />
      <Tab.Screen name="More" component={MoreStackNavigator} />
      <Tab.Screen name="Profile" component={MoreStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
