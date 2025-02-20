import React, { useState, useContext } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';

const AddTaskModal = ({ visible, onClose }) => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      addTask(title, description);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nouvelle tâche</Text>
          <TextInput
            label="Titre"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            maxLength={50}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            maxLength={200}
          />
          <Button mode="contained" onPress={handleAddTask} style={styles.button}>Créer</Button>
          <Button onPress={onClose}>Annuler</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AddTaskModal;