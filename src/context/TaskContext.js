import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    };

    loadTasks();
  }, []);

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des tâches:', error);
    }
  };

  const addTask = (title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: 'Todo',
      createdAt: new Date().toISOString(), 
      inProgressAt: null,
      completedAt: null 
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editTask = (taskId, newTitle, newDescription) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, title: newTitle, description: newDescription } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          let updatedFields = {};
  
          if (newStatus === 'InProgress' && !task.inProgressAt) {
            updatedFields.inProgressAt = new Date().toISOString();
          }
  
          if (newStatus === 'Done' && !task.completedAt) {
            updatedFields.completedAt = new Date().toISOString();
          }
  
          return { ...task, status: newStatus, ...updatedFields };
        }
        return task;
      })
    );
  };

  const togglePinTask = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map(task => ({
        ...task,
        pinned: task.id === taskId ? !task.pinned : false
      }));
    });
  };
  

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTaskStatus, editTask, togglePinTask }}>
      {children}
    </TaskContext.Provider>
  );
};
