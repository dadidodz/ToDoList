import React, { useContext, useState } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';


const TaskCard = ({ task, navigation }) => {
  const { deleteTask, togglePinTask } = useContext(TaskContext);

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

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

  const getStatusColor = () => {
    switch (task.status) {
      case "Todo":
        return "#1a0da3";
      case "InProgress":
        return "#d9640b";
      case "Done":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <View style={[styles.cardContainer,  { borderLeftColor: getStatusColor() }]}>
      <Card style={styles.card}>
        <Card.Title 
          title={task.title} 
          titleStyle={styles.title} 
          style={styles.cardTitle}
          right={() => (
            <View style={styles.iconsContainer}>
              <IconButton 
                style={styles.iconsButton}
                icon="eye" 
                size={24} 
                onPress={() => navigation.navigate('TaskDetails', { task })} 
              />
              <IconButton 
                style={styles.iconsButton}
                icon={task.pinned ? "pin" : "pin-outline"} 
                size={24} 
                onPress={() => togglePinTask(task.id)} 
                iconColor={task.pinned ? "red" : "gray"} 
              />
              <IconButton 
                style={styles.iconsButton}
                icon="close" 
                size={24} 
                onPress={openDeleteModal} 
                iconColor="#FF6347"
              />
            </View>
          )}
        />
        <Card.Content>
          {task.status === 'Todo' && (
            <Text style={styles.dateText}>Créée le : {new Date(task.createdAt).toLocaleDateString('fr-FR')}</Text>
          )}
          
          {task.status === 'InProgress' && task.inProgressAt && (
            <Text style={styles.dateText}>En cours depuis le : {new Date(task.inProgressAt).toLocaleDateString('fr-FR')}</Text>
          )}

          {task.status === 'Done' && task.completedAt && (
            <Text style={styles.dateText}>Terminée le : {new Date(task.completedAt).toLocaleDateString('fr-FR')}</Text>
          )}
        </Card.Content>
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
                <Button style={styles.deleteButton} mode="contained" onPress={handleDelete}>Supprimer</Button>
              </View>
            </View>
          </View>
        </Modal>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginRight: 0,
  },
  card: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    elevation: 3,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  title: {
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconButton: {
    marginLeft: 'auto',
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderLeftWidth: 8,
    borderRadius: 8,
    marginBottom: 10,
    padding : 0
  },
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
  deleteButton: {
    backgroundColor: 'red',
  },
  iconsButton: {
    padding: 0,
    margin: 0,
  },
  
});

export default TaskCard;