SET FOREIGN_KEY_CHECKS = 0;

-- 1. Admin
CREATE TABLE IF NOT EXISTS Admin (
  ID int AUTO_INCREMENT PRIMARY KEY,
  nom varchar(100) NOT NULL,
  username varchar(50) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  actif tinyint(1) DEFAULT 1,
  typeAdmin smallint DEFAULT 1,
  mobile varchar(15),
  alanyaID varchar(15),
  created_at datetime DEFAULT CURRENT_TIMESTAMP
);

-- 2. Personne
CREATE TABLE IF NOT EXISTS Personne (
  idPers int AUTO_INCREMENT PRIMARY KEY,
  nom varchar(255) NOT NULL,
  prenom varchar(255),
  dateNaissance date,
  lieuNaissance varchar(100),
  mobile varchar(15),
  phone varchar(15),
  typePersonne smallint,
  username varchar(100),
  password varchar(100),
  alanyaID varchar(15),
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 3. Cycle
CREATE TABLE IF NOT EXISTS Cycle (
  idCycle int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(255) NOT NULL,
  description tinytext,
  created_at datetime DEFAULT CURRENT_TIMESTAMP
);

-- 4. Classe
CREATE TABLE IF NOT EXISTS Classe (
  idClasse int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(100) NOT NULL,
  idCycle int,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idCycle) REFERENCES Cycle(idCycle),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 5. Salle
CREATE TABLE IF NOT EXISTS Salle (
  idSalle int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(30) NOT NULL,
  position varchar(100),
  surface varchar(30),
  idClasse int,
  actif tinyint(1) DEFAULT 1,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idClasse) REFERENCES Classe(idClasse),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 6. AnneeAcademique
CREATE TABLE IF NOT EXISTS AnneeAcademique (
  idAnnee int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(200) NOT NULL,
  periode varchar(255),
  idAdmin int,
  created_at date,
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 7. Trimestre
CREATE TABLE IF NOT EXISTS Trimestre (
  idTrimes int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(255) NOT NULL,
  periode varchar(255),
  idAca int,
  idAdmin int,
  FOREIGN KEY (idAca) REFERENCES AnneeAcademique(idAnnee),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 8. VilleNaissance
CREATE TABLE IF NOT EXISTS VilleNaissance (
  idVille int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(100) NOT NULL,
  actif tinyint(1) DEFAULT 1
);

-- 9. Eleve
CREATE TABLE IF NOT EXISTS Eleve (
  matricule int AUTO_INCREMENT PRIMARY KEY,
  nom varchar(60) NOT NULL,
  prenom varchar(60),
  dateNaissance date,
  lieuNaissance varchar(30),
  sexe smallint,
  langue varchar(30),
  photoURL varchar(255),
  actif tinyint(1) DEFAULT 1,
  idVilleNaissance int,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idVilleNaissance) REFERENCES VilleNaissance(idVille),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 10. Frequente
CREATE TABLE IF NOT EXISTS Frequente (
  idFrequente int AUTO_INCREMENT PRIMARY KEY,
  idSalle int,
  idAcademi int,
  matricule int,
  commentaire varchar(255),
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idSalle) REFERENCES Salle(idSalle),
  FOREIGN KEY (idAcademi) REFERENCES AnneeAcademique(idAnnee),
  FOREIGN KEY (matricule) REFERENCES Eleve(matricule),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 11. Cours
CREATE TABLE IF NOT EXISTS Cours (
  idCours int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(255) NOT NULL,
  note float,
  coefficient float,
  description text,
  idClasse int,
  actif tinyint(1) DEFAULT 1,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idClasse) REFERENCES Classe(idClasse),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 12. Enseignant
CREATE TABLE IF NOT EXISTS Enseignant (
  idEnseignant int AUTO_INCREMENT PRIMARY KEY,
  idPers int,
  idCours int,
  Actif tinyint(1) DEFAULT 1,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idPers) REFERENCES Personne(idPers),
  FOREIGN KEY (idCours) REFERENCES Cours(idCours),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 13. Parents
CREATE TABLE IF NOT EXISTS Parents (
  idParent int AUTO_INCREMENT PRIMARY KEY,
  idPers int,
  matricule int,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idPers) REFERENCES Personne(idPers),
  FOREIGN KEY (matricule) REFERENCES Eleve(matricule),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 14. Session
CREATE TABLE IF NOT EXISTS Session (
  idSession int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(255) NOT NULL,
  description tinytext,
  idTrimestre int,
  idPers int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idTrimestre) REFERENCES Trimestre(idTrimes),
  FOREIGN KEY (idPers) REFERENCES Personne(idPers)
);

-- 15. Evaluation
CREATE TABLE IF NOT EXISTS Evaluation (
  idEval int AUTO_INCREMENT PRIMARY KEY,
  note float,
  appreciation varchar(255),
  matricule int,
  idEpreuve int,
  idCours int,
  idSession int,
  idPers int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (matricule) REFERENCES Eleve(matricule),
  FOREIGN KEY (idCours) REFERENCES Cours(idCours),
  FOREIGN KEY (idSession) REFERENCES Session(idSession),
  FOREIGN KEY (idPers) REFERENCES Personne(idPers)
);

-- 16. Mode
CREATE TABLE IF NOT EXISTS Mode (
  idMode int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(100) NOT NULL,
  information tinytext,
  actif tinyint(1) DEFAULT 1,
  idFondateur int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP
);

-- 17. Paiement
CREATE TABLE IF NOT EXISTS Paiement (
  idPai int AUTO_INCREMENT PRIMARY KEY,
  matricule int,
  idAca int,
  montant float NOT NULL,
  url varchar(255),
  comentaire varchar(255),
  idMode int,
  operation_ID varchar(30),
  actif tinyint(1) DEFAULT 1,
  datePaie date,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (matricule) REFERENCES Eleve(matricule),
  FOREIGN KEY (idAca) REFERENCES AnneeAcademique(idAnnee),
  FOREIGN KEY (idMode) REFERENCES Mode(idMode)
);

-- 18. Quartier
CREATE TABLE IF NOT EXISTS Quartier (
  idQuartier int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(100) NOT NULL,
  description tinytext
);

-- 19. Residents
CREATE TABLE IF NOT EXISTS Residents (
  idResi int AUTO_INCREMENT PRIMARY KEY,
  idQuartier int,
  description tinytext,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idQuartier) REFERENCES Quartier(idQuartier),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 20. NatureEpreuve
CREATE TABLE IF NOT EXISTS NatureEpreuve (
  idNature int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(255) NOT NULL,
  description tinytext
);

-- 21. Epreuve
CREATE TABLE IF NOT EXISTS Epreuve (
  idEpreuve int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(255) NOT NULL,
  urlDoc varchar(255),
  Auteur varchar(255),
  idNature int,
  idPers int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idNature) REFERENCES NatureEpreuve(idNature),
  FOREIGN KEY (idPers) REFERENCES Personne(idPers)
);

-- 22. Discipline
CREATE TABLE IF NOT EXISTS Discipline (
  ID int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(255) NOT NULL,
  points int
);

-- 23. Rapport
CREATE TABLE IF NOT EXISTS Rapport (
  idRap int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(100) NOT NULL,
  points int,
  matricule int,
  idAca int,
  commentaire text,
  event_date date,
  idPers int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (matricule) REFERENCES Eleve(matricule),
  FOREIGN KEY (idAca) REFERENCES AnneeAcademique(idAnnee),
  FOREIGN KEY (idPers) REFERENCES Personne(idPers)
);

-- 24. Titulaire
CREATE TABLE IF NOT EXISTS Titulaire (
  idTitulaire int AUTO_INCREMENT PRIMARY KEY,
  idPers int,
  idSalle int,
  actif tinyint(1) DEFAULT 1,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idPers) REFERENCES Personne(idPers),
  FOREIGN KEY (idSalle) REFERENCES Salle(idSalle),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 25. JourSemaine
CREATE TABLE IF NOT EXISTS JourSemaine (
  ID int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(15) NOT NULL
);

-- 26. EmploiDuTemps
CREATE TABLE IF NOT EXISTS EmploiDuTemps (
  idTemps int AUTO_INCREMENT PRIMARY KEY,
  jour varchar(30),
  heure varchar(6),
  idClasse int,
  idCours int,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idClasse) REFERENCES Classe(idClasse),
  FOREIGN KEY (idCours) REFERENCES Cours(idCours),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 27. Specialite
CREATE TABLE IF NOT EXISTS Specialite (
  idSpecialite int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(255) NOT NULL,
  idAdmin int,
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 28. Livres
CREATE TABLE IF NOT EXISTS Livres (
  idLivre int AUTO_INCREMENT PRIMARY KEY,
  titre varchar(255) NOT NULL,
  auteurs varchar(255),
  prix float,
  idSpecialite int,
  edition varchar(255),
  annee_parution date,
  totalCopie smallint,
  idAdmin int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idSpecialite) REFERENCES Specialite(idSpecialite),
  FOREIGN KEY (idAdmin) REFERENCES Admin(ID)
);

-- 29. Scolarite
CREATE TABLE IF NOT EXISTS Scolarite (
  idScolarite int AUTO_INCREMENT PRIMARY KEY,
  inscription float,
  pension float,
  nbreTranche smallint,
  description tinytext,
  idCycle int,
  idFondateur int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idCycle) REFERENCES Cycle(idCycle)
);

-- 30. Tranches
CREATE TABLE IF NOT EXISTS Tranches (
  idTranche int AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(255) NOT NULL,
  montant float,
  delai_mois char(2),
  delai_jour char(2),
  idScolarite int,
  actif tinyint(1) DEFAULT 1,
  idFondateur int,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idScolarite) REFERENCES Scolarite(idScolarite)
);

-- 31. Messages
CREATE TABLE IF NOT EXISTS Messages (
  idMessages int AUTO_INCREMENT PRIMARY KEY,
  idExp_Pers int,
  idParent int,
  objet varchar(255),
  information text,
  type_message smallint,
  AnneeAcade varchar(15),
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  valider tinyint(1) DEFAULT 0,
  FOREIGN KEY (idExp_Pers) REFERENCES Personne(idPers),
  FOREIGN KEY (idParent) REFERENCES Parents(idParent)
);

-- Seed Initial User to fix "Identifiants incorrects" login error
INSERT IGNORE INTO Admin (nom, username, password, typeAdmin) 
VALUES ('Administrateur Principal', 'admin@ecole.fr', 'password123', 1);
-- Seed initial data for primary school demo
INSERT IGNORE INTO Personne (idPers, nom, prenom, typePersonne, idAdmin) VALUES (1, 'Directeur', 'Ecole', 1, 1);
INSERT IGNORE INTO Cycle (idCycle, libelle) VALUES (1, 'Primaire');
INSERT IGNORE INTO Classe (idClasse, libelle, idCycle, idAdmin) VALUES (1, 'SIL', 1, 1);
INSERT IGNORE INTO Salle (idSalle, libelle, idClasse, idAdmin) VALUES (1, 'Salle 1', 1, 1);
INSERT IGNORE INTO AnneeAcademique (idAnnee, libelle, idAdmin) VALUES (1, '2023-2024', 1);
INSERT IGNORE INTO Trimestre (idTrimes, libelle, idAca, idAdmin) VALUES (1, '1er Trimestre', 1, 1);
INSERT IGNORE INTO VilleNaissance (idVille, libelle) VALUES (1, 'Yaoundé');
INSERT IGNORE INTO Eleve (matricule, nom, prenom, idVilleNaissance, idAdmin) VALUES (1, 'Atangana', 'Paul', 1, 1);
INSERT IGNORE INTO Frequente (idFrequente, idSalle, idAcademi, matricule, idAdmin) VALUES (1, 1, 1, 1, 1);
INSERT IGNORE INTO Cours (idCours, libelle, note, coefficient, idClasse, idAdmin) VALUES (1, 'Mathématiques', 20, 2, 1, 1);
INSERT IGNORE INTO Enseignant (idEnseignant, idPers, idCours, idAdmin) VALUES (1, 1, 1, 1);
INSERT IGNORE INTO Parents (idParent, idPers, matricule, idAdmin) VALUES (1, 1, 1, 1);
INSERT IGNORE INTO Session (idSession, libelle, idTrimestre, idPers) VALUES (1, 'Examen Sequentiel 1', 1, 1);
INSERT IGNORE INTO Evaluation (idEval, note, matricule, idCours, idSession, idPers) VALUES (1, 16.5, 1, 1, 1, 1);
INSERT IGNORE INTO Mode (idMode, libelle, idFondateur) VALUES (1, 'Orange Money', 1);
INSERT IGNORE INTO Paiement (idPai, matricule, idAca, montant, idMode) VALUES (1, 1, 25000, 1);
INSERT IGNORE INTO Quartier (idQuartier, libelle) VALUES (1, 'Bastos');
INSERT IGNORE INTO Residents (idResi, idQuartier, idAdmin) VALUES (1, 1, 1);
INSERT IGNORE INTO NatureEpreuve (idNature, libelle) VALUES (1, 'Contrôle de connaissances');
INSERT IGNORE INTO Epreuve (idEpreuve, libelle, idNature, idPers) VALUES (1, 'Epreuve de Maths', 1, 1);
INSERT IGNORE INTO Discipline (ID, libelle, points) VALUES (1, 'Conduite', 10);
INSERT IGNORE INTO Rapport (idRap, libelle, points, matricule, idAca, idPers) VALUES (1, 'Bon élève', 2, 1, 1, 1);
INSERT IGNORE INTO Titulaire (idTitulaire, idPers, idSalle, idAdmin) VALUES (1, 1, 1, 1);
INSERT IGNORE INTO JourSemaine (ID, libelle) VALUES (1, 'Lundi');
INSERT IGNORE INTO EmploiDuTemps (idTemps, jour, heure, idClasse, idCours, idAdmin) VALUES (1, 'Lundi', '08:00', 1, 1, 1);
INSERT IGNORE INTO Specialite (idSpecialite, libelle, idAdmin) VALUES (1, 'Enseignement Primaire Général', 1);
INSERT IGNORE INTO Livres (idLivre, titre, idSpecialite, idAdmin) VALUES (1, 'Mathématiques au Primaire', 1, 1);
INSERT IGNORE INTO Scolarite (idScolarite, inscription, pension, nbreTranche, idCycle) VALUES (1, 10000, 50000, 2, 1);
INSERT IGNORE INTO Tranches (idTranche, libelle, montant, idScolarite) VALUES (1, 'Tranche 1', 25000, 1);
INSERT IGNORE INTO Messages (idMessages, idExp_Pers, idParent, objet, type_message) VALUES (1, 1, 1, 'Convocation', 1);

SET FOREIGN_KEY_CHECKS = 1;
