
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { TaskProvider } from './src/context/TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <PaperProvider>
        <AppNavigator/>
      </PaperProvider>
    </TaskProvider>
  );
};

export default App;