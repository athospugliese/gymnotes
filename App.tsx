import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/COMPONENTS/Button'
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export default function App() {
  return (
    <>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </>
  );
}

