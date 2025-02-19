import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNavigator from './BottomTabsNavigator';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tasks" component={BottomTabsNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: 'Détails de la tâche' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
