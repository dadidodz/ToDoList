import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';

const ToDoScreen = ({ navigation }) => {
  const { tasks } = useContext(TaskContext);
  // const filteredTasks = tasks.filter(task => task.status === 'Todo');
  const filteredTasks = tasks
  .filter(task => task.status === 'Todo')
  .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const [modalVisible, setModalVisible] = useState(false);
  

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tâches à faire",
      headerRight: () => (
        <IconButton icon="plus" size={28} onPress={() => setModalVisible(true)} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => <TaskCard key={task.id} task={task} navigation={navigation} />)
        ) : (
          <Text style={styles.emptyText}>Aucune tâche à faire</Text>
        )}
      </ScrollView>
      <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContent: {
    paddingTop : 5,
    paddingRight : 5,
    paddingBottom : 15,
    paddingLeft : 5,
  },
  emptyText: {
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ToDoScreen;