import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet, Modal } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';

const ToDoScreen = ({ navigation }) => {
    const { tasks, addTask, deleteTask, updateTaskStatus } = useContext(TaskContext);
  const filteredTasks = tasks.filter(task => task.status === 'Todo');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

//   const handleAddTask = () => {
//     if (title.trim() && description.trim()) {
//       addTask(title, description);
//       setTitle('');
//       setDescription('');
//       setModalVisible(false);
//     }
//   };

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
          <Text style={styles.emptyText}>Aucune tâche à faire</Text>
        )}
      </ScrollView>

      {/* <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nouvelle tâche</Text>
            <TextInput
              label="Titre"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              label="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
            <Button mode="contained" onPress={handleAddTask} style={styles.button}>
              Ajouter
            </Button>
            <Button onPress={() => setModalVisible(false)}>Annuler</Button>
          </View>
        </View>
      </Modal> */}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
});

export default ToDoScreen;
