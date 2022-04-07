# Project TODO
Gestion d'une liste de tâches

![forthebadge](src/made-for-efrei-project.svg)  ![forthebadge](src/training-sg-reskilling---web-developer.svg)

Cette application fonctionne à partir d'un navigateur web, permet à l'utilisateur de créer des tâches et de les marquer comme terminées.

## Pour commencer

Elle utilise une base de données Postgres pour enregistrer les données de façon persistante.
L'application utilise la techno nodejs pour le backend et du html/css généré en server side pour l'interface utilisateur. Une page sera également disponible avec du front-end Reactjs.

### Pré-requis

Les pré-requis pour utiliser ce projet :

- Installer un navigateur internet sur le poste de travail
- Installer le sgbd postgresql (local ou serveur)
- Installer nodejs (local ou serveur)
- Installer les librairies node : express, pg, react

### Installation

* Créer une base de données dans votre sgbd postgres
* Executez le script sql ``script creation tables - pg.sql`` pour créer la table des tâches
* Adaptez le code de la fonction "function connectToSQL()" dans le source "taches_utils.js" pour personnaliser : nom de la BDD, nom et le mot de passe utilisateur, le serveur et le port 

## Démarrage

Dans le répertoire racine du projet, ouvrez une fenêtre de commandes et lancez la commande "node app_taches.js" :
* Pour les fonctions principales du projet en SSR, indiquez l'url http://localhost:3000 dans votre nabigateur web
* Pour visualiser la page react, utilisez l'url http://localhost:3000/task_react.html dans votre navigateur

## Fabriqué avec

* [Visual Studio Code](https://code.visualstudio.com/) - Environnement de développement
* [React](https://fr.reactjs.org/) - Librairie front end

## Versions
**Dernière version stable :** 1.0
**Dernière version :** 1.0

## Auteurs
* **Nabil AICI** _cybernaboo_ [@cybernaboo](https://github.com/cybernaboo)


