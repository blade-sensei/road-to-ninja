MVP User Stories
===
Ici c'est les fonctionnalités principales, pour une version 0.1

:::info
ETQA = En tant que admin
ETQU = En tant que utilisateur
:::

### ETQU j'ai accés à la liste des projets afin d'avoir un aperçu global des informations de chaque projet
- Description des project avec 100 premiers caractères.
- Un voyant pour le status
- Project requis en vert ce qui sont terminés et ce qui ne sont pas en rouge.
- Les projects requis doivent être clickables, le code est renvoyé vers la barre de recherche et une recherche automatique est effectué. Plus tard il suffit de survoler avec la souris pour avoir un pré aperçu, mais il restera toujours clickable.

### ETQU je peux voir la liste des projets requis pour un projet afin d'avoir un apercu sur l'état des prerequis
- Avec une droplist, on déroule les projects requis
- V02 permettre de mettre le curseur et afficher un apercu du project. Aussi un click pour filtrer les projet et aller dans le project voulu.

### ETQU je peux filtrer les projets par statut/nom afin de cibler une partie des projets
- Par status ou/et par code de project

### ETQA je peux modifier un project afin de changer/enlever des informations 
- la description, lien, titre d'un projet et projets requis.

### ETQU je peux accéder au lien de la data d'un projet afin de voir le code et documents
- Le lien renvoie vers un lien git 

### ETQU je peux commencer un project afin de travailler dessus
- Avec un button 'démarrer', je pourrai commencer un project
- Dans une v2 du site, on pourra ajouter une date de démarrage, pour faire un tracking

### ETQU je peux terminer un project afin de pouvoir débuter un autre
- Avec un bouton 'finished', je peux terminer un project, ce qui me débloque les projects qui ont comme requis celui-ci.
- La date de fin de project sera ajouté.
- Les projects sont débloqués une fois que les (ou le) projects requis sont marqués comme 'terminés'
