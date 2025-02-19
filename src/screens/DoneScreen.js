import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';

const DoneScreen = ({ navigation }) => {
  const { tasks } = useContext(TaskContext);
  const filteredTasks = tasks.filter(task => task.status === 'Done');
  const [modalVisible, setModalVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
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
          <Text style={styles.emptyText}>Aucune tâche terminée</Text>
        )}
      </ScrollView>
      <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyText: {
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DoneScreen;
