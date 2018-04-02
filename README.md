Road to ninja !
==

## Présentation 
Road to ninja, est un projet qui visant à améliorer les compétences techniques de l'utilisateur. Il a été pensé pour les domaines de la programmation/coding, mais aussi dans les domaines de l'infrastucture (réseaux/systèmes), la sécurité informatique, l'IA et le design graphique.

Le but du projet est de créer une application web, qui va répertorier tous les projets que l'utilisateur souhaite réaliser. 
Road to Ninja n'est pas un gestionnaire de projet à proprement parler, mais plutôt un outil permettant de se concentrer sur 1 seul projet à la fois. La particularité : pour passer au projet suivant, l'utilisateur doit finir celui en cours.

Pour le moment, il n'y a pas de délai (temps) pour terminer un projet.

## Pourquoi ?

L'application vise à résoudre un problème de procrastination, d'organisation et de focus. 

Bien qu'il s'agisse plutôt d'un problème personnel, je vais utiliser le pronom 'on' dans les exemples ci-dessous. 

- Quand on a plusieurs idées de projets, on ne sait pas toujours par où commencer, et une fois qu'un projet est terrminé, on abondonne les prochains par lassitude. 

- On perd la motivation et on procrastine par manque de motivation et par manque d'orientation.

- On n'arrive pas à garder un focus, sur un objectif précis.

En extension, le projet permettra aussi de garder une trace pour voir l'évolution des compétences. 

## Comment ?
### ce projet va-t-il améliorer mes compétences ?

Grâce à cette liste: 

- Projets type exercices (*)
- Projets solo
- Projets groupe
- Tutoriels/Explications/Documentation
- Utilisation d'outils collaboratifs

Le but des exercices est de comprendre une techno de manière rapide avant de passer aux projects.

Les tutoriels et documentations servent à synthétiser le savoir et les acquis : si l'on est incapable d'expliquer ce que l'on apprend, c'est peut-être que le sujet a été mal compris. Ils servent aussi à garder une trace de ce que l'on a pu faire, les erreurs et problèmes rencontrés pour y revenir plus tard et gagner du temps.

Les projets en groupe vont nous permettre d'apprendre à travailler avec d'autres personnes, ainsi qu'a apprendre à utiliser des outils collaboratifs du moment (git, trello, etc...).

:::info
Projects type exercice (*)
On pourra se donner comme project, 1 semaine maximum pour terminer 30 exercices sur un thème, comme javascript, POO etc... A nous de trouver les exercices avec les corrections. (C'est un exemple).
:::

### va-t-il résoudre le problème de focus et procrastination ? 

Le fait d'avoir une interface bloquant les futurs projets et demandant de terminer 1 ET 1 seul projet, va obliger l'utilisateur à se concentrer uniquement sur ce projet pour évoluer. La finalisation des projets et leur avancée vont nous donner envie de continuer... (en tout cas j'espère :+1:)

Structure 
==

- Le site web permet à l'utilisateur de créer des projets. 
- Chaque utilisateur a un ou plusieurs projects à finir avant de pouvoir débuter le suivant.
- Les projets ont des rendus : documentations, tutos, ou simples explications.
- Tous les documents du projet se trouvent sur le lien git.

## Model project
Un projet est composé des attributs suivants :

| Attribut | Description | 
| ------ | ---- | 
| requires | Liste des projets requis pour commencer ce projet | 
| data | Liens vers les documents (rendus, app, description) |
| title | Titre du projet |
| description | Brève description du projet |
| status | Statut (started) (non started) (finished) |

## Model User
Un utilisateur est composé des attributs suivants :

| Attribut | Description |
| ------- | ---------- |
| username | Nom d'utlisateur utilisé pour se connecter |
| name | Nom (complet ou surnom) affiché dans la page de profil |
| password | Mot de passe |
| projects | Liste de tous les projets |

Maquettes
===
## Liste projets
![](https://i.imgur.com/wrHqPSD.png)

Architecture technique
===

## Technos 
- Backend
  * Node.js
  * ExpressJS
  * MongoDB
- Frontend
  * Angular 4
  * HTML / CSS

- Coding Style
  * Airbnb style https://github.com/nmussy/javascript-style-guide
  * ES6 

Git
===
## Utilisation de git

Lien : https://github.com/Coyla/road-to-ninja

- La branche principale est master.
- Chaque personne travaille sur une "feature" (fonctionnalité), pour cela il faut créer une nouvelle branche. 
- Chaque changement pendant le développement de la feature doit être commit et push sur le serveur Github
- Une fois le développement de la feature terminé, une pull request sur la branche stable (master) est demandée, et la validation est effectuée par un admin.
- Les bugs/corrections doivent aussi être faits sur une branche differente.

## Nommage des branches

### Features
Pour le développement des TODO et fonctionnalités

ft/[feature-name]

```
ft/add-project-admin/
ft/start-project-user
```

### HotFix
Pour les corrections, la maintenance, les petits changements, le refactoring ...

hf/[hotfix-name]


```
hf/change-project/
hf/d123-hf/
```

### BugFix
Pour les bugs, un bug n'est pas forcement à traiter immédiatement, il sera mis dans un patch de correction.

bf/[bugfix-name]
```
bf/setup-database
```

Trello
==

Lien du board : https://trello.com/b/UPrATOhl/road-to-ninja
- Une carte = une tâche.
- Si possible, ajouter un élément de "checklist" dans une carte pour décrire les étapes pour compléter la carte. Si la carte a besoin d'être coupée, on peut en créer une nouvelle, mais il faut préciser dans le titre qu'elle appartient à une autre carte.
- Les éléments d'une checklist sont arbitraires : cela peut-être de toutes petites taches (ex : initialiser une variable... ) ou des plus importantes  (ex : créer un service web).
- Pour rajouter une checklist : cliquer sur la carte --> à droite dans Add, cliquer sur Checklist --> rajouter les elements.
- Toujours ajouter un label (feature, bug, etc).
- Si besoin, ajouter un commentaire dans le "card" pour rajouter des informations.
- Le backlog regroupe toutes les fonctionnalités. Chaque semaine, certaines cartes doivent être déplacées vers le TODO. Aucune carte ne doit être ajoutée dans TODO en milieu de semaine.

Exemple de checklist pour une US (User Story)
[] Installer Express
[] Appeler l'API blabla
[] Rajouter les données dans le template Angular...


