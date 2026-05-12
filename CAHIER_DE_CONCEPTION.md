# Cahier de Conception : CogniSchool (ERP de Gestion Scolaire)

## 1. Introduction
**CogniSchool** est un système de gestion scolaire complet (Enterprise Resource Planning - ERP) conçu pour automatiser et centraliser les opérations administratives, pédagogiques et financières des établissements scolaires.

### 1.1 Objectifs du Projet
- **Centralisation** : Regrouper toutes les données (élèves, personnel, finances) dans une base de données unique.
- **Accessibilité** : Offrir une interface web moderne et réactive accessible sur divers appareils.
- **Sécurité** : Garantir l'intégrité et la confidentialité des données scolaires et financières.
- **Efficacité** : Réduire la charge administrative grâce à des processus automatisés (paiements, bulletins, emploi du temps).

---

## 2. Architecture Technique

### 2.1 Stack Technologique
| Couche | Technologie | Rôle |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | Interface utilisateur dynamique et performante. |
| **Styling** | Tailwind CSS | Design moderne, responsive et facile à maintenir. |
| **State Management** | Zustand | Gestion légère de l'état global (auth, sessions). |
| **Data Fetching** | React Query | Mise en cache et synchronisation des données API. |
| **Backend** | Node.js + Express | Serveur d'API REST robuste et scalable. |
| **Langage** | TypeScript | Sécurité du code et typage strict bout-en-bout. |
| **Base de Données** | MySQL | Système de gestion de base de données relationnelle. |
| **Sécurité** | JWT + Bcrypt + Zod | Authentification, hachage et validation de données. |

### 2.2 Schéma d'Architecture
L'application suit un modèle **Client-Serveur** découplé :
1. **Le Client (Frontend)** consomme les ressources via des requêtes HTTP (REST).
2. **Le Serveur (Backend)** valide les requêtes, traite la logique métier et interagit avec la base de données.
3. **La Base de Données (MySQL)** stocke de manière persistante toutes les entités du système.

---

## 3. Modèle de Données (Conception BD)

La base de données est structurée autour de plusieurs piliers fonctionnels.

### 3.1 Noyau Utilisateurs et Personnel
- **utilisateurs** : Gère les comptes d'accès avec rôles (Fondateur, Directeur, Parent, etc.).
- **Personne** : Table générique pour stocker les informations civiles (nom, naissance, contact).
- **Admin** : Table historique pour la gestion administrative de haut niveau.

### 3.2 Structure Pédagogique
- **Cycle** : Primaire, Collège, Lycée.
- **Classe** : Regroupement logique par niveau (ex: SIL, CP, 6ème).
- **Salle** : L'entité physique où se déroulent les cours.
- **Cours** : Les matières enseignées avec leurs coefficients.
- **AnneeAcademique** & **Trimestre** : Découpage temporel de la scolarité.

### 3.3 Gestion des Élèves
- **Eleve** : Informations spécifiques aux apprenants (matricule, photo, lieu de naissance).
- **Frequente** : Table de liaison associant un élève à une salle pour une année donnée.
- **Parents** : Liaison entre les élèves et leurs tuteurs légaux.

### 3.4 Évaluations et Résultats
- **Session** : Définit les périodes d'examens (ex: Séquence 1).
- **Evaluation** : Stocke les notes obtenues par les élèves pour un cours et une session donnés.
- **Epreuve** : Archive les sujets et documents d'examen.

### 3.5 Finance et Scolarité
- **Scolarite** : Définit les tarifs par cycle (inscription, pension).
- **Tranches** : Découpage des paiements attendus.
- **Paiement** : Registre des transactions financières effectuées par les parents.

---

## 4. Conception Fonctionnelle

### 4.1 Rôles et Permissions (RBAC)
Le système utilise un contrôle d'accès basé sur les rôles (Role-Based Access Control) :
- **Fondateur** : Accès total, vue d'ensemble sur les finances.
- **Directeur** : Gestion pédagogique et administrative.
- **Admin Scolarité** : Gestion des inscriptions et des frais.
- **Enseignant** : Saisie des notes et gestion des cours.
- **Parent** : Consultation des notes et suivi des paiements de leurs enfants.

### 4.2 Modules Clés
1. **Authentification** : Connexion sécurisée avec génération de jeton JWT.
2. **Tableau de Bord (Dashboard)** : Statistiques en temps réel (nombre d'élèves, taux de recouvrement, alertes).
3. **Gestion des Personnes** : CRUD complet pour les élèves, enseignants et personnels.
4. **Gestion Académique** : Configuration des classes, matières et emplois du temps.
5. **Portail Financier** : Suivi des paiements, relances automatiques et historique des transactions.
6. **Communication** : Système de messagerie interne entre l'administration et les parents.

---

## 5. Conception de l'Interface (UI/UX)

### 5.1 Principes de Design
- **Dashboard-first** : Les informations critiques sont visibles dès la connexion.
- **Navigation Latérale** : Sidebar escamotable regroupant les fonctionnalités par catégorie.
- **Feedback Immédiat** : Utilisation de notifications (Toasts) et de squelettes de chargement (Skeletons).
- **Responsive Design** : L'interface s'adapte parfaitement aux tablettes et ordinatueurs de bureau.

### 5.2 Structure de l'Interface
- **Layout Principal** : Barre latérale de navigation + Barre d'outils supérieure (profil, recherche).
- **Vues Listes** : Tableaux avec filtrage, recherche et pagination.
- **Vues Formulaires** : Modales ou pages dédiées avec validation Zod en temps réel.

---

## 6. Sécurité et Flux de Données

### 6.1 Sécurité des Communications
- **JWT (JSON Web Token)** : Chaque requête vers l'API doit inclure un jeton valide dans l'en-tête `Authorization`.
- **Intercepteurs Axios** : Gestion automatique de l'injection du token et traitement des erreurs 401/403.
- **CORS** : Restrictions sur les domaines autorisés à interroger l'API.

### 6.2 Intégrité des Données
- **Validation Zod** : Les schémas de données sont validés côté Frontend (UX) et Backend (Sécurité).
- **Prepared Statements** : Toutes les requêtes SQL utilisent des paramètres pour prévenir les injections SQL.
- **Hachage** : Les mots de passe sont hachés avec `bcrypt` avant stockage.

---

## 7. Plan de Déploiement

### 7.1 Pré-requis
- Serveur Linux avec Node.js 18+.
- Serveur MySQL 8.0+.
- Certificat SSL (HTTPS obligatoire pour le JWT).

### 7.2 Processus
1. Build du frontend (`npm run build`) générant des fichiers statiques.
2. Déploiement du backend via un gestionnaire de processus (PM2).
3. Configuration d'un proxy inverse (Nginx) pour servir le frontend et rediriger les appels `/api` vers le backend.
