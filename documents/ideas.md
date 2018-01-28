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

Rajouter une liste de domaines dans un project pour les classer