# ToDoList

ToDoList est une application mobile développée en React-Native. Elle permet de tenir à jour votre liste de tâches "A faire", "En cours" et "Terminées".

## Documentation

### 📱 Navigation

À l'ouverture de l'application, l'écran d'accueil est l'onglet des tâches "À faire".
<p style="text-align: center;">
    <img src="assets/images/ToDoScreen.png" width="300" alt="To do screen">
</p>


Il est possible de se déplacer entre les 3 onglets, "À faire", "En cours" et "Terminées", grâce à la barre de navigation en bas de l'écran.

### ➕ Ajout d'une tâche

Depuis chaque onglet, il est possible créer une nouvelle tâche grâce au bouton "+" situé en haut à droite de l'écran.
<p style="text-align: center;">
    <img src="assets/images/AddTaskButton.png" width="300" alt="Add task button">
</p>

Deux données obligatoires, le titre et la description, doivent être saisies pour créer cette nouvelle tâche.
<p style="text-align: center;">
    <img src="assets/images/AddTask.png" width="300" alt="Add task screen">
</p> 

A sa création, la nouvelle tâche se retrouve dans l'onglet "À faire".
<p style="text-align: center;">
    <img src="assets/images/NewTask.png" width="300" alt="New task">
</p> 

### ✏️ Modification d'une tâche

Les détails d'une tâche peuvent être consultés en cliquant sur l'icône d'oeil <img src="assets/images/EyeButton.png" alt="Eye button"> à droite de la tâche. Un nouvel écran apparait alors avec les détails de la tâche. Il est ici possible de modifier le statut de la tâche entre "A faire", "En cours" et "Terminées".

<p style="text-align: center;">
    <img src="assets/images/EditTaskScreen.png" width="300" alt="Edit task screen">
</p>

Lorsqu'un nouveau statut est sélectionné, la tâche est instantannément déplacée dans l'écran correspondant.
<p style="text-align: center;">
    <img src="assets/images/InProgressTask.png" width="300" alt="In progress task">
</p>

Il est également possible de modifier les détails de la tâche en cliquant sur le bouton "Modifier", puis en cliquant sur le bouton "Enregistrer".
<p style="text-align: center;">
    <img src="assets/images/EditingTask.png" width="300" alt="Editing task">
</p>

### 📌 Mise en avant d'une tâche

En cliquant sur l'icône de punaise <img src="assets/images/EmptyPinButton.png"  alt="Empty screen button"> à droite de la tâche, elle est remontée tout en haut de la liste des tâches. Pour retirer la tâche épinglée, il suffit de re-cliquer sur l'icône de punaise <img src="assets/images/FullPinButton.png" alt="Selection pin button">. Attention, qu'une seule tâche peut-être épinglée à la fois. Si une autre tâche est épinglée, alors la précédente ne le sera plus et retrouvera sa place antérieur dans la liste.

### ❌ Suppression d'une tâche

À tout moment, une tâche peut être supprimée simplement en cliquant sur la croix <img src="assets/images/CrossButton.png" alt="Delete cross button"> à droite de la tâche. Il suffit en suite de confirmer la suppression en cliquant sur le bouton "Supprimer".
<p style="text-align: center;">
    <img src="assets/images/DeleteScreen.png" width="300" alt="Delete task screen">
</p>



## Demo

[Testez-la vous même](https://expo.dev/accounts/dadidodz/projects/ToDoList/updates/38bb3f15-ee24-4815-a102-b88552f21362)

