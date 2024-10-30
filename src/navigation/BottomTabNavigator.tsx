import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '@screens/AddScreen';
import CollectionsScreen from '../screens/CollectionsScreen';
import { NavigatorScreenParams } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type RootStackParamList = {
  Home: undefined;
  Add: { id?: string; title?: string; description?: string };
  Collections: undefined;
  Configs: undefined;
};


const Tab = createBottomTabNavigator<RootStackParamList>();

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
        name="Collections"
        component={CollectionsScreen}
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
