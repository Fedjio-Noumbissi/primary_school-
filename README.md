# EduPrime - Système de Gestion Scolaire

Une plateforme web de gestion (ERP) pour établissements scolaires construite avec Node.js (Express), React 18, et MySQL.

## Technologie
- **Frontend** : React 18, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query, React Hook Form + Zod, Recharts, Lucide Icons.
- **Backend** : Node.js, Express, TypeScript, Zod, JWT, mysql2/promise.
- **Base de données** : MySQL.

## Prérequis
- [Node.js](https://nodejs.org) (v18+)
- Serveur MySQL fonctionnel

## Installation

### 1. Cloner ou initialiser
L'application se divise en deux dossiers distincts : `backend` et `frontend`.

### 2. Configuration du Backend
```bash
cd backend
npm install
```

Créez le fichier de configuration `.env` à la racine de `/backend` (modèle fourni dans `.env.example`) :
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=le_nom_de_votre_bdd

JWT_SECRET=super_secret_key_123
JWT_EXPIRES_IN=1d
```
Puis démarrez le serveur :
```bash
npm run dev
```

### 3. Configuration du Frontend
```bash
cd frontend
npm install
```
Puis lancez le serveur React :
```bash
npm run dev
```

## Structure commentée

```
school-erp/
├── backend/                  
│   ├── src/
│   │   ├── config/db.ts          # Pool de connexions MySQL paramétrées
│   │   ├── controllers/          # Logique des requêtes (ex. getEleves, login)
│   │   ├── middleware/           # Gestionnaires (auth, errors)
│   │   ├── routes/               # API endpoints
│   │   └── validators/           # Zod schemas (validation backend & DB)
│   └── .env                      # Variables serveur
└── frontend/                 
    ├── src/
    │   ├── api/axios.ts          # Intercepteurs (injection du token JWT)
    │   ├── components/layout/    # UI de fondation (Sidebar, BaseLayout)
    │   ├── pages/                # Pages du domaine métier (Login, Dashboard, ElevesList)
    │   ├── store/authStore.ts    # Zustand : Persistance user/token
    │   ├── App.tsx               # Routeur & Layout guards
    │   └── index.css             # Tailwind Root    
```

## Endpoints Principaux (API)

| Method | Endpoint         | Description                   | Sécurité |
|--------|------------------|-------------------------------|----------|
| POST   | `/api/auth/login`| Authentifier administrateur   | Ouvert   |
| GET    | `/api/auth/me`   | Check du token actuel         | JWT (`protect`) |
| GET    | `/api/eleves`    | Lister avec `?page=&search=`  | JWT (`protect`) |
| POST   | `/api/eleves`    | Enregistrer un élève          | JWT (`protect`) |
| PUT    | `/api/eleves/:id`| Mettre à jour un élève        | JWT (`protect`) |
| DELETE | `/api/eleves/:id`| Supprimer un élève            | JWT (`protect`) |

 *(Répétez la même nomenclature de routes pour les autres entités telles que `/api/enseignants`, `/api/paiements`)*
# primary_school-
