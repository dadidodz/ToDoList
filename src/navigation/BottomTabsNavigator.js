import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import ToDoScreen from '../screens/ToDoScreen';
import InProgressScreen from '../screens/InProgressScreen';
import DoneScreen from '../screens/DoneScreen';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="ToDo" shifting={true} barStyle={{ backgroundColor: '#6200ea' }}>
      <Tab.Screen 
        name="ToDo" 
        component={ToDoScreen} 
        options={{
          tabBarLabel: 'À faire',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clipboard-text" color={color} size={26} />,
        }} 
      />
      <Tab.Screen 
        name="InProgress" 
        component={InProgressScreen} 
        options={{
          tabBarLabel: 'En cours',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="progress-clock" color={color} size={26} />,
        }} 
      />
      <Tab.Screen 
        name="Done" 
        component={DoneScreen} 
        options={{
          tabBarLabel: 'Terminé',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="check-circle" color={color} size={26} />,
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
