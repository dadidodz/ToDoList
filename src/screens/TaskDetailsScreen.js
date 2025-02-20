import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Menu, Divider, TextInput, IconButton } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';

const TaskDetailsScreen = ({ route }) => {
  const { task } = route.params;
  const { updateTaskStatus, editTask } = useContext(TaskContext);
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
              <TextInput 
                label="Titre"
                value={newTitle} 
                onChangeText={setNewTitle} 
                style={styles.input} 
                maxLength={50}
              />
              <TextInput
                label="Description"
                value={newDescription}
                onChangeText={setNewDescription}
                style={styles.input}
                maxLength={200}
              />
              <Button mode="contained" onPress={handleEditTask} style={styles.button}>Enregistrer</Button>
            </>
          ) : (
            <>
              <Text style={styles.title}>Titre : <Text style={styles.titleText}>{newTitle}</Text></Text>
              <Text style={styles.label}>Description :</Text>
              <View style={styles.descriptionBox}>
                <Text style={styles.description}>{newDescription}</Text>
              </View>

              <Text style={styles.label}>Statut :</Text>
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity onPress={openMenu} style={styles.dropdown}>
                    <Text>{status === 'Todo' ? 'À faire' : status === 'InProgress' ? 'En cours' : 'Terminé'}</Text>
                    <IconButton 
                      icon="chevron-down" 
                      size={20} 
                      style={styles.iconButton} 
                      onPress={openMenu} 
                    />
                  </TouchableOpacity>
                }
                style={styles.menu}
              >
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
  },
  titleText: {
    fontSize: 18,
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
  iconButton: {
    marginLeft: 'auto',
  },
  menu: {
    marginTop: 50,
    marginLeft: 0,
    borderRadius: 8,
    backgroundColor: '#ffffff', 
    elevation: 5,
  },
  dropdown: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft : 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    height: 40,
  },
  descriptionBox: {
    borderLeftWidth: 3, 
    borderColor: "lightgrey", 
    padding: 5,
  },
  description: {
    fontSize: 15,
    color: '#666',
  },
});

export default TaskDetailsScreen;