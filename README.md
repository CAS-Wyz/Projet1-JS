Ma To-Do List 📝
Cette application est une to-do list interactive développée avec React et TypeScript. Elle permet de créer, modifier, filtrer et gérer facilement ses tâches, avec une sauvegarde locale sur le navigateur.

Fonctionnalités
Ajout de tâches avec titre et description optionnelle.

Modification des tâches existantes via un mode édition intégré.

Suppression de tâches avec confirmation avant action.

Changement de statut (« fait » ou « à faire ») par case à cocher.

Filtrage des tâches : toutes, faites, à faire.

Statistiques dynamiques (nombre de tâches totales, faites, restantes).

Persistance locale grâce au stockage via localStorage (restauration après rechargement).

Installation
Clone le projet :

git clone <URL_DU_REPO>
cd <nom_du_dossier>

Installe les dépendances :

npm install
Lance l'application en développement :

npm start
Accède à l’application via http://localhost:3000

Structure des fichiers
App.tsx : contient toute la logique de la to-do list.

App.css : styles de l'interface utilisateur.

Utilisation
Saisis le titre d'une tâche et, si tu le souhaites, une description.

Clique sur « Ajouter » pour ajouter une tâche à la liste.

Utilise les cases à cocher pour marquer une tâche comme faite ou non.

Clique sur « Modifier » pour éditer une tâche, puis sur « Enregistrer » ou « Annuler ».

Clique sur « Supprimer » puis confirme l’action pour effacer une tâche.

Filtre la liste pour afficher toutes les tâches, seulement celles terminées ou celles à faire.

Dépendances principales
react

typescript

Personnalisation
Styles : modifie App.css pour adapter l’apparence à tes besoins.

Logiciel : améliore les fonctions (ex. : ajout de catégories, deadlines, etc.) selon tes exigences métiers.