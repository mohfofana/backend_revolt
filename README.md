# Revolte-TechOps - API Backend

[![NestJS](https://img.shields.io/badge/NestJS-9.0.0-e0234e.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3.12-ff69b4.svg?style=for-the-badge)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

API RESTful pour l'application Revolte-TechOps, développée avec NestJS, TypeORM et PostgreSQL.

## 🚀 Fonctionnalités

- 🔐 Authentification JWT
- 📝 Gestion complète des tickets (CRUD)
- 👥 Gestion des utilisateurs et rôles
- 💬 Système de commentaires
- 📎 Téléchargement de fichiers
- 📊 Endpoints pour les statistiques
- 🛡️ Validation des données
- 📚 Documentation Swagger/OpenAPI

## 🛠 Prérequis

- Node.js (v16+)
- npm ou yarn
- PostgreSQL (v13+)
- Git

## 🏗 Structure du Projet

Ce dépôt contient uniquement le backend de l'application Revolte-TechOps. Le frontend se trouve dans un dépôt séparé :

- **Backend** (ce dépôt) : https://github.com/mohfofana/backend_revolt
- **Frontend** : https://github.com/mohfofana/Revolte-TechOps

## 🏗 Structure du Projet

Ce dépôt contient le backend de l'application Revolte-TechOps. Pour une configuration complète, vous aurez également besoin du dépôt frontend.

Structure recommandée des dossiers :
```
Revolte-TechOps/
  ├── frontend/       # Dépôt frontend (https://github.com/mohfofana/Revolte-TechOps)
  └── backend_revolt/ # Ce dépôt
```

## 🚀 Installation

### 1. Configuration initiale

```bash
# Aller dans le dossier parent du frontend et cloner le backend
git clone https://github.com/mohfofana/backend_revolt.git
cd backend_revolt
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

1. Copier le fichier d'exemple d'environnement :
   ```bash
   cp .env.example .env
   ```
   
2. Éditer le fichier `.env` pour configurer votre base de données et autres paramètres.

3. Éditer le fichier `.env` avec vos paramètres :
   ```env
   # Configuration du serveur
   PORT=3001
   NODE_ENV=development
   
   # Base de données
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=votre_mot_de_passe
   DB_DATABASE=revolte_techops


### 4. Configuration de la Base de Données

1. Créer une base de données PostgreSQL
2. Mettre à jour les informations de connexion dans le fichier `.env`

## 🚀 Démarrage

### Développement

```bash
# Démarrage avec rechargement automatique
npm run start:dev
```

## 📚 Documentation API

La documentation complète de l'API est disponible via Swagger UI après le démarrage du serveur :

- URL : `http://localhost:3001/api/docs`
- Description détaillée des endpoints
- Test interactif des requêtes
- Schémas des requêtes/réponses

## 🔌 Configuration du Frontend

Pour faire fonctionner l'application complète, vous devez également configurer le frontend :

1. Suivez les instructions du dépôt frontend : [https://github.com/mohfofana/Revolte-TechOps](https://github.com/mohfofana/Revolte-TechOps)
2. Le frontend s'attend à ce que le backend soit accessible sur `http://localhost:3001`

## 📂 Structure du Projet

```
backend/
├── src/
│   ├── config/            # Configuration de l'application
│   │   ├── database/      # Configuration de la base de données
│   │   └── swagger/       # Configuration Swagger
│   │
│   ├── modules/           # Modules métier
│   │   ├── auth/          # Authentification
│   │   ├── tickets/       # Gestion des tickets
│   │   ├── comments/      # Commentaires sur les tickets
│   │   ├── attachments/   # Pièces jointes
│   │   ├── users/         # Gestion des utilisateurs
│   │   └── stats/         # Statistiques
│   │
│   ├── app.module.ts      # Module racine
│   └── main.ts            # Point d'entrée
│
├── test/                  # Tests
├── uploads/               # Fichiers uploadés
└── ...
```


## 🛠 Technologies Utilisées

- [NestJS](https://nestjs.com/) - Framework Node.js
- [TypeORM](https://typeorm.io/) - ORM pour TypeScript/JavaScript
- [PostgreSQL](https://www.postgresql.org/) - Base de données relationnelle
- [JWT](https://jwt.io/) - Authentification
- [Class-validator](https://github.com/typestack/class-validator) - Validation des données
- [Swagger](https://swagger.io/) - Documentation d'API
- [TypeScript](https://www.typescriptlang.org/) - JavaScript typé

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter à [mohamedaboubakar.fofana@gmail.com](mailto:mohamedaboubakar.fofana@gmail.com).
