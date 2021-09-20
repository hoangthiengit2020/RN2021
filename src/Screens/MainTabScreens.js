import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Home} from './Home';
import {Details} from './Details';
import Explorer from './Explorer';
import {Profile} from './Profile';
import Notification from './Notification';

const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const MainTabScreens = ({route}) => {
  console.log('route from home:', route);
  return (
    <Tab.Navigator
      // initialRouteName="Home"
      activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#8B40E8',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explorer"
        component={Explorer}
        options={{
          tabBarLabel: 'Explorer',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Notification}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#d02860',
          tabBarIcon: ({color}) => (
            <Feather name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackScreen = ({navigation, route}) => {
  // console.log(
  //   'route and navigation from home stack      : ',
  //   route,
  //   '--navigation---',
  //   navigation,
  // );
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#8B40E8',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          flexDirection: 'row',
          justifyContent: 'center',
          //   textAlign: 'center',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        // initialParams={{
        //   id_kvhc: route.params == undefined ? 26377 : route.params.id_kvhc,
        // }}
        options={{
          //   title: 'Overview',
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              backgroundColor="#8B40E8"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={Details}
        options={({route}) => ({
          // title: route.params.name,
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              backgroundColor="#6000D2"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        })}
        // initialParams={{
        //   id: route.params == undefined ? 26377 : route.params.id_kvhc,
        // }}
      />
    </HomeStack.Navigator>
  );
};

export default MainTabScreens;
