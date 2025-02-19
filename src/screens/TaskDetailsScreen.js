import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button, Menu, Divider, TextInput } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const { deleteTask, updateTaskStatus, editTask } = useContext(TaskContext);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [menuVisible, setMenuVisible] = useState(false);
  const [status, setStatus] = useState(task.status);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    updateTaskStatus(task.id, newStatus);
    closeMenu();
  };

  const handleEditTask = () => {
    editTask(task.id, newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          {isEditing ? (
            <>
              <TextInput label="Titre" value={newTitle} onChangeText={setNewTitle} style={styles.input} />
              <TextInput label="Description" value={newDescription} onChangeText={setNewDescription} style={styles.input} />
              <Button mode="contained" onPress={handleEditTask} style={styles.button}>Enregistrer</Button>
            </>
          ) : (
            <>
              <Text style={styles.title}>{newTitle}</Text>
              <Text>{newDescription}</Text>

              <Text style={styles.label}>Statut :</Text>
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <Button mode="outlined" onPress={openMenu}>
                    {status === 'Todo' ? 'À faire' : status === 'InProgress' ? 'En cours' : 'Terminé'}
                  </Button>
                }>
                <Menu.Item onPress={() => handleStatusChange('Todo')} title="À faire" />
                <Divider />
                <Menu.Item onPress={() => handleStatusChange('InProgress')} title="En cours" />
                <Divider />
                <Menu.Item onPress={() => handleStatusChange('Done')} title="Terminé" />
              </Menu>
            </>
          )}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => deleteTask(task.id) && navigation.goBack()}>Supprimer</Button>
          <Button onPress={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Annuler' : 'Modifier'}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default TaskDetailsScreen;
