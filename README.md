# Revolte TechOps Backend

Ce dossier contiendra l'API backend du projet, basée sur NestJS + TypeORM + PostgreSQL.

## Structure prévue
- `/src`: code source principal
- `/src/modules`: modules métier (tickets, users, auth...)
- `/src/common`: utilitaires, DTOs, guards, etc.
- `/src/config`: configuration base de données, .env, etc.

## Démarrage rapide (après installation)
```bash
cd backend
npm install
npm run start:dev
```

## À venir
- Endpoints RESTful pour tickets, utilisateurs, authentification, statistiques
- Sécurité JWT
- Intégration PostgreSQL
