# Documentation Complète du Projet CogniSchool (Système de Gestion Scolaire)

## 1. Présentation Générale
**CogniSchool** est une plateforme web complète (ERP) conçue pour la gestion d'établissements scolaires (écoles primaires, collèges, lycées). Elle permet d'administrer de manière centralisée les élèves, les enseignants, les paiements, les classes et bien d'autres entités de la vie scolaire. L'application repose sur une architecture moderne, fluide, sécurisée et performante.

---

## 2. Architecture Technique
Le projet adopte une architecture **Full-Stack** divisée en deux espaces bien distincts, permettant une séparation claire des responsabilités (séparation Client-Serveur).

### 2.1 Backend (Serveur et API REST)
Le backend traite la logique métier, la validation stricte des données entrantes, la sécurisation des échanges et l'interrogation de la base de données.
- **Langage & Environnement** : Node.js (v18+) utilisé avec le framework ultra-populaire [Express.js](https://expressjs.com/).
- **Langage Typé** : TypeScript (permet d'anticiper les bugs de structure de données et sécurise le fonctionnement continu de l'API).
- **Base de données** : Le SGBD choisi est **MySQL**, interrogé via le connecteur de bas-niveau `mysql2/promise` qui exploite massivement les requêtes préparées (pour pallier aux attaques par Injection SQL) et les comportements asynchrones.
- **Organisation Structurée (MVC API Modifiée)** :
  - **Routes** (`/routes`) : Elles déclarent les "points de contact" de l'application. 
  - **Controllers** (`/controllers`)  : Assurent le rôle de chef d'orchestre pour une requête spécifique (ex: récupération d'étudiants).
  - **Middlewares** (`/middleware`) : Opèrent silencieusement en amont d'une route pour contrôler les accès ou traiter les erreurs globalement.
- **Sécurité Mécanique et Validation** :
  - `bcrypt` : Exécute des algorithmes de hachage sur les mots de passe avant l'insertion en base, pour qu'ils soient méconnaissables (Salting/Hashing).
  - `jsonwebtoken` (JWT) : Création de clés temporaires signées (`JSON Web Tokens`) pour identifier l'utilisateur durant la durée de sa session, sans saturer le serveur (approche "stateless").
  - `zod` : Fait office de filtre incorruptible ; si une information ne respecte pas le bon format ou le bon type (ex: un âge négatif ou un email falsifié), la requête est purement et simplement abandonnée.
  - `helmet` et `cors` : Équipent le serveur de boucliers en positionnant des en-têtes HTTP de sécurité limitant la visibilité à des domaines tiers.
  - `express-rate-limit` : Protège le serveur de l'asphyxie et des attaques de type Bruteforce sur les formulaires d'authentification.

### 2.2 Frontend (Interface Utilisateur)
Le frontend est une "Single Page Application" (SPA) c'est-à-dire qu'une fois chargée, il n’y a plus de rafraîchissements blancs d’écran. Tout transite par API de façon invisible.
- **Cœur React** : React 18, géré et empaqueté par [Vite](https://vitejs.dev/) qui permet des temps de compilation (builds) foudroyants en mode serveur de développement.
- **Typage** : Tout comme le backend, il évolue sous TypeScript.
- **L'Interface Graphique (UI) et le Design System** :
  - `tailwindcss` (v3/v4) : Ce module se charge de l'identité visuelle de l'app. Il octroie la capacité d'écrire des classes CSS directement sur les éléments React sans polluer l'espace de fichiers dédiés.
  - `lucide-react` : Fournit toutes les icônes de navigation, optimisées tout-support (vectoriel).
- **Le Moteur de Gestion des États de Données** :
  - `zustand` : Manipule avec légèreté les données critiques de session (savoir en tout point si l'utilisateur est connecté et qui il est).
  - `@tanstack/react-query` : C'est le garant des performances ressenti par l'utilisateur. Cet outil s'occupe de faire les requêtes de données, de stocker une version fraîche de ces données localement en mémoire tampon et gère tout l'aspect de rafraichissement d'arrère-plan.
- **Gestion Avancée des Formulaires** :
  - `react-hook-form` couplé au validateur `zod`. Cette alliance permet des formulaires d'une robustesse exceptionnelle avec retour immédiat des erreurs aux utilisateurs sans avoir de complexité de "re-rendu" pour React.
- **Composants d'Analyses** : 
  - L'intégration de la librairie `recharts` insère des graphiques fluides et animés en pleine interface.
- **Routage et Protection** :
  - `react-router-dom` donne l'illusion de changement de page tout en garantissant des murs de sécurités entre les vues, obligeant l’utilisateur de passage à être refoulé vers l’écran "Login" s'il n'est pas autorisé.

---

## 3. Structure Fonctionnelle Détaillée de l'Arborescence

```text
school-erp/
│
├── backend/                  # Le Code de l'API REST
│   ├── src/
│   │   ├── config/           # Contient notamment `db.ts` où l'on gère la pool de sessions MySQL.
│   │   ├── controllers/      # Définition des réactions API (Création compte, suppression parent, etc).
│   │   ├── middleware/       # Gardes du serveur (ex: auth.ts inspecte si on tente de forcer une porte).
│   │   ├── routes/           # Mappe les URL (ex /api/eleves) aux fonctions du controller.
│   │   └── validators/       # Là où résident les schémas Zod du Backend. 
│   ├── .env                  # C'est ici que sont enfermés les secrets capitaux (Mots de passe Base de données).
│   ├── tsconfig.json         # Paramètres TS du compilateur.
│   └── package.json          # Le manifeste de tous les paquets Node de dépendance du serveur.
│
└── frontend/                 # Le Code de l'Interface Web Utilisateur
    ├── src/
    │   ├── api/              # Regroupe la connexion à l'API via Axios. Il injecte le JWT de l'utilisateur.
    │   ├── components/       # Découpage du visuel (Boutons, Champs de textes, Popups).
    │   │   └── layout/       # Les fondations graphiques (Le menu latéral Sidebar, la barre du haut).
    │   ├── pages/            # Les gros morceaux fonctionnels de navigation (Le Dashboard, l'Annuaire Élèves).
    │   ├── store/            # L'état persistant Zustand qui traverse toute l'interface.
    │   ├── App.tsx           # Le chef d'orchestre React (Routes globales).
    │   └── index.css         # Importation socle de Tailwind CSS.
    ├── tailwind.config.ts    # Personnalisation des chartes couleurs, des espacements du design.
    └── package.json          # Registre des dépendances du côté Interface.
```

---

## 4. Parcours Utilisateur & Systèmes Techniques Clés

### 4.1. Circulation des informations et Authentification sécurisée
Si un système d'information n'est pas sécurisé sur le client et sur le serveur, il devient vulnérable. L'ERP a été pensé de bout en bout pour empêcher ça.
1. **Écran de connexion (Frontend)** : Le Frontend (`pages/Login.tsx`) attend les frappes clavier d'un administrateur. Le bouton devient actif et autorise l'envoi uniquement si "zod" approuve les champs (ex. pas de mots de passe de 2 lettres).
2. **Soumission et Serveur (Backend)** : La requête atteint le `/api/auth/login`. Le backend récupère l'identifiant, interroge la base de données. S'il y a correspondance, on sort le hachage encrypté `bcrypt` pour comparaison.
3. **Passeport Temporel (Le JWT)** : Le backend n'inscrit rien en base de données pour la session. Il forge mathématiquement un jeton infalsifiable `JWT` et le donne comme un "Pass Vip" au frontend.
4. **Conservation de l'état (Frontend)** : Le store Zustand (`store/authStore.ts`) attrape ce JWT et le grave dans la mémoire de l'utilisateur.
5. **Le Passe-partout Automatique** : Lors du prochain clic de l'utilisateur dans l'interface (exemple: Visualiser le registre des étudiants), un intercepteur automatisé sur le Frontend (`api/axios.ts`) observe le clic, prend le "Pass Vip" JWT et le glisse en-tête HTTP. Sans cela, le Backend refuserait (Error 401: Non Autorisé) avec fermeté.

### 4.2. Logiques Globales des Actions "REST" (Exemple : "Les Élèves")
CogniSchool standardise toutes les actions des listes récurrentes selon un protocole strict.
- **Récupération des élèves** : `GET /api/eleves`. Gère une masse infinie de data avec par défaut des renvois filtrés, via pagination de la DB (`?page=`) et systèmes de recherches (`?search=`). 
- **Insertion d'élèves** : `POST /api/eleves`. Traverse tout le processus Zod backend pour empêcher un nom ou prénom compromis.
- **Mises à jours granulaires** : `PUT /api/eleves/:id`. Permet avec une agilité fine de mettre à jour le solde financier de l'étudiant, ou le changement urgent de son numéro d'urgence.
- **Purge de l'enregistrement** : `DELETE /api/eleves/:id`.  

### 4.3. Double-Validation avec Zod
Le point d'ancrage le plus puissant du projet réside dans sa résilience aux erreurs, gérée via **Zod** sur les deux flancs.
- **Le Frontend** bloque l'action et propose l'explication sous le champ fautif en temps réel (évitant des appels API d'échec superflus).
- **Le Backend**, faisant abstraction du fait que le Frontend a eu un soucis ou ait été piraté, applique pour sa part ses règles stricts avant de toucher à MySQL. L'intégrité de la base de données ne peut s'être fait polluer par inadvertance.

---

## 5. Déploiement et Initialisation pour le Développeur

Pour tester l'application sur une machine neuve :
1. Installer mondialement Node.js (v18+) et disposer d'un service MySQL propre.
2. Pour le **Backend** : 
   - Exécuter la commande `npm install` au sein du dossier `school-erp/backend`.
   - Créer le fichier `.env` sur le moule de `.env.example` en renseignant les références exactes (Identifiants locaux de test) vers la base MySQL.
   - Initialiser avec le lanceur en développement permanent `npm run dev`.
3. Pour le **Frontend** : 
   - Idem, installer le monde avec `npm install` dans le répertoire d'UI (`school-erp/frontend`).
   - Lancer le lanceur "Vite" très véloce avec `npm run dev`.

À l'issue de cela, l'interface Web ouvre gracieusement la porte à l'utilisateur, tout en échangeant silencieusement avec l'API située de façon isolée derrière !
