import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Menu, Divider, TextInput, IconButton } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';

const HomeScreen = ({ navigation }) => {
  const { tasks, addTask, deleteTask, updateTaskStatus } = useContext(TaskContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      addTask(title, description);
      setTitle('');
      setDescription('');
      setModalVisible(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="plus" size={28} onPress={() => setModalVisible(true)} />
      ),
    });
  }, [navigation]);

  const renderTaskList = (status) => {
    const filteredTasks = tasks.filter(task => task.status === status);
    return (
      <>
        <Text style={styles.sectionTitle}>{status}</Text>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => <TaskCard key={task.id} task={task} navigation={navigation} />)
        ) : (
          <Text style={styles.emptyText}>Aucune tâche</Text>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderTaskList('Todo')}
        {renderTaskList('InProgress')}
        {renderTaskList('Done')}
      </ScrollView>

      {/* Modal d'ajout de tâche */}
      <Modal visible={modalVisible} animationType="slide" transparent>
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
      </Modal>
    </View>
  );
};

const TaskCard = ({ task, navigation }) => {
  const { deleteTask, updateTaskStatus } = useContext(TaskContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [status, setStatus] = useState(task.status);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    updateTaskStatus(task.id, newStatus);
    closeMenu();
  };

  return (
    <Card style={styles.card}>
      <Card.Title title={task.title} />
      <Card.Content>
        <Text>{task.description}</Text>

        <Text style={styles.label}>Statut :</Text>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.dropdown}>
              <Text>{status === 'Todo' ? 'À faire' : status === 'InProgress' ? 'En cours' : 'Terminé'}</Text>
            </TouchableOpacity>
          }>
          <Menu.Item onPress={() => handleStatusChange('Todo')} title="À faire" />
          <Divider />
          <Menu.Item onPress={() => handleStatusChange('InProgress')} title="En cours" />
          <Divider />
          <Menu.Item onPress={() => handleStatusChange('Done')} title="Terminé" />
        </Menu>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('TaskDetails', { task })}>Voir</Button>
        <Button onPress={() => deleteTask(task.id)}>Supprimer</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptyText: {
    fontStyle: 'italic',
    color: 'gray',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
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

export default HomeScreen;
