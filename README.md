Road to ninja !
==

## Présentation 
Road to ninja, est un projet qui permettra d'améliorer les compétences techniques, plus particulièrement dans le domaine de la programmation/coding. Mais aussi dans les domaines de l'infrastucture (réseaux/systèmes), sécurité informatique, IA et design graphique.

Le but du project est de créer une app web, qui va répertorier tout nos projects qu'on souhaite réaliser. La particularité, pour passer à un autre projet, nous devons finir celui en cours.

Pour le moment, il n'y a pas de délai (temps) pour terminer un projet, mais nous pourrions mettre en place une régle, avec 1 semaine par exemple.

## Pourquoi ?

Résoudre un problème de procastination, d'organisation et focus. 

Quand on a plusieurs idées de projets, on ne sait pas par où commencer, et une fois qu'on a terminé un projet, on abondonne les prochains par lassitude. On perds la motivation et on procrastine par manque de motivation et par un manque d'orientation.

On n'arrive pas à garder un focus, sur un objectif précis.

Le but du projet est aussi de garder une trace pour voir son évolution.


## Comment ?
### ce projet va améliorer mes compétences ?

grâce à cette liste: 

- Projects type exercices (*)
- Projets solo
- Projets groupe
- Tutoriels/Explications/Documentation
- Utilisation d'outils collaboratifs

Le but dans les exercices et de comprendre une techno de manière rapide avant de passer aux projects.

Les tutoriels et documentation servent à synthétiser le savoir et acquis, car si on n'arrive pas à expliquer ce qu'on apprends, c'est que le sujet n'as pas été bien compris. Le deuxième avantage est de garder une trace de ce qu'on a pu faire, les erreurs/problèmes rencontrées pour revenir plus tard et gagner du temps.

Les projets en groupe, vont nous permettre d'apprendre à travailler avec d'autres personnes, connaitre et utiliser des outils collaboratifs du moment, comme git, trello etc...

:::info
Projects type exercice (*)
On pourra se donner comme project, 1 semaine max entière pour terminer 30 exercices sur un thème, comme javascript, poo etc... A nous de trouver les exercices avec les corrections. C'est un exemple.
:::

### Il va résoudre le problème de focus et procrastination ? 

Le fait d'avoir une interface qui nous bloque les prochains project et nous demande de terminer 1 ET 1 seul projet, va nous obliquer à nous concentrer uniquement sur ce projet pour évoluer. L'accomplissement des project et l'avancé, vont nous donner envie de continuer ... en tout cas j'espère :+1: 

Structure 
==

- Le site web, permettra à l'utilisateur de créer des projets. 
- Chaque projet à un/plusieurs projects à finir avant de pouvoir débuter celui en question.
- Un projet a un thème ou domaine précis (à voir). 
- Les projects ont des rendues : soit des documentation, des tutos, ou des explications tout simplement.
- Tout les documents du projet se trouvent sur le lien git.

## Structure d'un model project
Un projet est composé des attributs suivants

| attribut | description | 
| -------- | -------- | 
| requires | Liste des projects requis pour début ce projet | 
| data |Liens vers les documents (rendus, app, description)|
|title|Titre du projet|
|description | Une petite description du projet|
|domains | Liste des domaines que le projet recouvre|
|status| type de status (en cours) (non started) (finished) |
|code| code unique|

MVP User Stories
===
Ici c'est les fonctionnalités principales, pour une version 0.1

:::info
ETA = En tant que admin
ETU = En tant que utilisateur
:::

### ETU je peux accéder à la liste de tous les projets
- Les projets qui n'ont pas 

### ETU je peux trier les projets par domaine
- On début seulement les grand domaines seront affichés ('programming' et 'infrastucture').
- Par status ou/et par code de project

### ETU je peux modifier un project
- la description, lien, titre d'un projet et projets requis.

### ETU je peux accéder au lien de la data d'un projet
- Le lien renvoie vers un lien git 

### ETU je peux commencer un project
- Avec un button 'démarrer', je pourrai commencer un project
- Dans une v2 du site, on pourra ajouter une date de démarre, pour faire un tracking

### ETU je peux terminer un project
- Avec un bouton 'finished', je peux terminer un project, ce qui me débloque les projects qui ont comme requis celui-ci.

### ETU je peux débloquer un project
- Les projects sont débloqués une fois que les (ou le) projects requis sont marqués comme 'terminés'

## Stats, path domaines
Exercices
- C Jutsu = 30 exercices 
- Python Sennin 
- Structuresoi = 1 semaine d'exercices + doc structures, même si on termine pas.

Architecture technique
===

## Technos 

## Procésus

Idées de project et sujets
===
Computer Architecture
Algorithmic complexity / Big-O / Asymptotic analysis
Data Structures
- Arrays
- Linked Lists
- Stack
- Queue
- Hash table
Binary search
Bitwise operations
Trees,Sorting,Graphs
Recursion
Dynamic Programming
Object-Oriented Programming
Design patterns
Networking
Compiler 
see here : https://github.com/jwasham/coding-interview-university#table-of-contents

## Projects 
- The corewar
- 42SH
- bistromatic
- Tiger
- Tetris game 
- Snake 
- TicTacToe
- Battleship
- Space Invaders 
- Pong
- Démineur 


Dans les futures versions
 ===
### ETA je peux créer un domaine en dessous d'un domaine
- Un mode 'change' peut être activé pour afficher les boutons de modification, ajout et suppression à côté de chaque domaine
### ETA je peux modifier le parent du domaine, nom
- Un mode 'change' peut être activé pour afficher les boutons de modification, ajout et suppression à côté de chaque domaine
### ETA je peux supprimer un domaine (*)
- Un mode 'change' peut être activé pour afficher les boutons de modification, ajout et suppression à côté de chaque domaine

### ETA je peux accéder à la liste des domaines
- On peut dérouler un domaine pour voir les sous domaines.

(*) mais cela implique supprimer tous les autres sous domaines récursivement

## Bonus user stories
### ETU je peux rechercher un projet par son id 

### ETU je peux accéder au projets requis d'un projet


## Structure d'un domaine

| nom |  description |
| ----- | ------------ |
| name| nom du domaine |
| parent|Le domaine parent|

* Le premier domaine est appelé racine
* La racine  possède un parent qui est lui même.
* On ne peut créer que des projects à partir de la racine.

Exemple
```
|
-racine domaine
    |
    - domaine 1
    |
    - domaine 2
            |
            - sous-domaine 1
    |
    - domaine 3
```