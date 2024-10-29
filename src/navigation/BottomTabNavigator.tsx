import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddScreen from '@screens/AddScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, 
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Configs"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-outline"
              size={24}
              color={focused ? '#EFE5DC' : '#3E3E3E'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="folder-outline"
              size={24}
              color={focused ? '#EFE5DC' : '#3E3E3E'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add"
              size={24}
              color={focused ? '#EFE5DC' : '#3E3E3E'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#181818',
    borderTopWidth: 0,
    height: 60,
  },
  fabButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFE5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default BottomTabNavigator;
