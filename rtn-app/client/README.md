Road to ninja !
==

## Demo

Login with: 

username: demo
password: demo

https://roadtoninja-f5ad8.firebaseapp.com/login


## Current Release

This project is a project management tool like. Inspired by trello.

- You list all of your projects 
- Start a project and all the others are blocked until you finished this one
- Project edition
- Project creation
- This project has basic search engine (search projects)


![](https://i.imgur.com/uKbiQNg.png)

![](https://i.imgur.com/oeZoVex.png)



## Testing

- I use ava for some modules tests: [github](https://github.com/avajs/ava)
- Linter based on airbnb linter: [airbnb/linter](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
- Code format: Prettier [prettier](https://github.com/prettier/prettier)
- Home made logger

## Release 2.0

- [x] Allow responsive for mobiles
- [x] Improve design UI 
- [ ] Add CI + Docker
- [ ] Frontend (e2e test) with headless chrome
- [ ] Use RXJS

Mockups
===
## Liste projets
![](https://i.imgur.com/wrHqPSD.png)

Technical Arch.
===

## Stack
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

- Hosting
  * Front: Firebase
  * Back: Heroku
  * DB: Atlas MongoDB

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
