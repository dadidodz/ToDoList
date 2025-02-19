import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal } from 'react-native';
import { Card, Text, Button, Menu, Divider, IconButton } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';

const TaskCard = ({ task, navigation }) => {
  const { deleteTask, updateTaskStatus } = useContext(TaskContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    updateTaskStatus(task.id, newStatus);
    closeMenu();
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setDeleteModalVisible(false);
  };

  return (
    <Card style={styles.card}>
      <Card.Title 
        title={task.title} 
        titleStyle={styles.title} 
        style={styles.cardTitle}
      />
      <Card.Content>
        <Text style={styles.label}>Description :</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>{task.description}</Text>
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
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('TaskDetails', { task })}>Voir</Button>
        <Button 
          style={{ backgroundColor: '#FF6347' }} 
          onPress={openDeleteModal}
        >
          Supprimer
        </Button>
      </Card.Actions>

      {/* Modal de confirmation */}
      <Modal 
        visible={isDeleteModalVisible} 
        animationType="fade"
        transparent
        onRequestClose={closeDeleteModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Êtes-vous sûr de vouloir supprimer cette tâche ?</Text>
            <View style={styles.modalActions}>
              <Button mode="outlined" onPress={closeDeleteModal}>Annuler</Button>
              <Button mode="contained" onPress={handleDelete}>Supprimer</Button>
            </View>
          </View>
        </View>
      </Modal>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
  },
  title: {
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 30,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
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
  iconButton: {
    marginLeft: 'auto',
  },
  descriptionBox: {
    borderLeftWidth: 3, 
    borderColor: "lightgrey", 
    padding: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  menu: {
    marginTop: 50,
    marginLeft: 0,
    borderRadius: 8,
    backgroundColor: '#ffffff', 
    elevation: 5,
  },

  // Styles pour le modal de confirmation
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default TaskCard;
