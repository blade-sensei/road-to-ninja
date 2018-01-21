Road to ninja !
==

## Présentation 
Road to ninja, est un projet qui permettra d'améliorer les compétences techniques, plus particulièrement dans le domaine de la programmation/coding. Mais aussi dans les domaines de l'infrastucture (réseaux/systèmes), sécurité informatique, IA et design graphique.

Le but du project est de créer une app web, qui va répertorier tous nos projects qu'on souhaite réaliser. 
Ce n'est pas outils de gestion de projet. Mais plutot un outils pour se concentrer sur 1 projet à la fois. La particularité : Pour passer à un autre projet, nous devons finir celui en cours.

Pour le moment, il n'y a pas de délai (temps) pour terminer un projet.

## Pourquoi ?

Résoudre un problème de procastination, d'organisation et focus. 

Ici c'est plus un problème personnelle, mais je vais utiliser le pronom 'on'. 

- Quand on a plusieurs idées de projets, on ne sait pas par où commencer, et une fois qu'on a terminé un projet, on abondonne les prochains par lassitude. 
- On perds la motivation et on procrastine par manque de motivation et par un manque d'orientation.

- On n'arrive pas à garder un focus, sur un objectif précis.

En extension, le projet permettra aussi de garder une trace pour voir l'évolution des compétences. 


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
- Les projects ont des rendues : soit des documentation, des tutos, ou des explications tout simplement.
- Tous les documents du projet se trouvent sur le lien git.

## Model project
Un projet est composé des attributs suivants

| attribut | description | 
| -------- | -------- | 
| requires | Liste des projects requis pour commencer ce projet | 
| data |Liens vers les documents (rendus, app, description)|
|title|Titre du projet|
|description | Une petite description du projet|
|status| type de status (en cours) (non started) (finished) |

## Model User
Un utilisateur possède des projets
| attributs | description |
| ------- | ---------- |
| username | pour se logger |
| name | nom ou nickname |
| password | mdp |
| projects | Liste de tous les projets |

Maquettes
===
## Liste projets
![](https://i.imgur.com/wrHqPSD.png)

Architecture technique
===

## Technos 
- Backend
  * Node js
  * Express
  * MongoDB
- Frontend
  * Vanilla JS
  * Html / CSS

- Coding Style
  * Airbnb style https://github.com/nmussy/javascript-style-guide
  * ES6 

Git
===
## Utilisation de git

Lien : https://github.com/Coyla/road-to-ninja

- La branche principal est master
- Chaque personne travaille sur une "feature" (fonctionnalité), pour cela il faut créer une nouvelle branche. 
- chaque changement pendant le développement de la feature droit être commit et push sur le github
- a la fin de la feature, une validation sera faite et devra être pull request sur la branche stable (master)
- Les bugs/corrections doivent aussi être fais sur une branche differente

## Nommage des branches

### Features
Pour le développement des TODO et fonctionnalités

ft/[feature-name]

```
ft/add-project-admin/
ft/start-project-user
```

### HotFix
Pour les corrections, la maintenance, les petites changements:, le refactoring ...

hf/[hotfix-name]


```
hf/change-project/
hf/d123-hf/
```

### BugFix
Pour les bugs, un bug n'est pas forcement à traiter de suite, il sera mis dans un patch de correction

bf/[bugfix-name]
```
bf/setup-database
```

Trello
==

Lien du board : https://trello.com/b/UPrATOhl/road-to-ninja
- Rajouter toujours un label (feature, bug, etc)
- Si besoin rajouter un commentaire dans le "card" pour rajouter des informations
- Backlog c'est toute les fonctionnalités. Chaque semaine on doit prendre des cartes et les mettre dans le TODO. On ne peut pas rajouter des
cartes dans le TODO en milieu de semaine.


