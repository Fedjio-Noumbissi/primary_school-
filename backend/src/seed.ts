import { pool } from './config/db';

async function seed() {
  try {
    console.log('Seeding data for 31 tables...');

    // We disable FK checks to ensure safe insertion even if some tables are randomly out of order though we ordered them.
    await pool.query('SET FOREIGN_KEY_CHECKS = 0;');
    
    // We try to make sure Admin ID=1 exists before inserting dependent records.
    await pool.query(`INSERT IGNORE INTO Admin (ID, nom, username, password, typeAdmin, actif) VALUES (1, 'Admin Seed', 'admin_seed@ecole.fr', 'password', 1, 1);`);

    // The other tables:
    const queries = [
      "INSERT IGNORE INTO Personne (idPers, nom, prenom, typePersonne, idAdmin) VALUES (1, 'Directeur', 'Ecole', 1, 1);",
      "INSERT IGNORE INTO Cycle (idCycle, libelle) VALUES (1, 'Primaire');",
      "INSERT IGNORE INTO Classe (idClasse, libelle, idCycle, idAdmin) VALUES (1, 'SIL', 1, 1);",
      "INSERT IGNORE INTO Salle (idSalle, libelle, idClasse, idAdmin) VALUES (1, 'Salle 1', 1, 1);",
      "INSERT IGNORE INTO AnneeAcademique (idAnnee, libelle, idAdmin) VALUES (1, '2023-2024', 1);",
      "INSERT IGNORE INTO Trimestre (idTrimes, libelle, idAca, idAdmin) VALUES (1, '1er Trimestre', 1, 1);",
      "INSERT IGNORE INTO VilleNaissance (idVille, libelle) VALUES (1, 'Yaoundé');",
      "INSERT IGNORE INTO Eleve (matricule, nom, prenom, idVilleNaissance, idAdmin) VALUES (1, 'Atangana', 'Paul', 1, 1);",
      "INSERT IGNORE INTO Frequente (idFrequente, idSalle, idAcademi, matricule, idAdmin) VALUES (1, 1, 1, 1, 1);",
      "INSERT IGNORE INTO Cours (idCours, libelle, note, coefficient, idClasse, idAdmin) VALUES (1, 'Mathématiques', 20, 2, 1, 1);",
      "INSERT IGNORE INTO Enseignant (idEnseignant, idPers, idCours, idAdmin) VALUES (1, 1, 1, 1);",
      "INSERT IGNORE INTO Parents (idParent, idPers, matricule, idAdmin) VALUES (1, 1, 1, 1);",
      "INSERT IGNORE INTO Session (idSession, libelle, idTrimestre, idPers) VALUES (1, 'Examen Sequentiel 1', 1, 1);",
      "INSERT IGNORE INTO Evaluation (idEval, note, matricule, idCours, idSession, idPers) VALUES (1, 16.5, 1, 1, 1, 1);",
      "INSERT IGNORE INTO Mode (idMode, libelle, idFondateur) VALUES (1, 'Orange Money', 1);",
      "INSERT IGNORE INTO Paiement (idPai, matricule, idAca, montant, idMode) VALUES (1, 1, 25000, 1);",
      "INSERT IGNORE INTO Quartier (idQuartier, libelle) VALUES (1, 'Bastos');",
      "INSERT IGNORE INTO Residents (idResi, idQuartier, idAdmin) VALUES (1, 1, 1);",
      "INSERT IGNORE INTO NatureEpreuve (idNature, libelle) VALUES (1, 'Contrôle de connaissances');",
      "INSERT IGNORE INTO Epreuve (idEpreuve, libelle, idNature, idPers) VALUES (1, 'Epreuve de Maths', 1, 1);",
      "INSERT IGNORE INTO Discipline (ID, libelle, points) VALUES (1, 'Conduite', 10);",
      "INSERT IGNORE INTO Rapport (idRap, libelle, points, matricule, idAca, idPers) VALUES (1, 'Bon élève', 2, 1, 1, 1);",
      "INSERT IGNORE INTO Titulaire (idTitulaire, idPers, idSalle, idAdmin) VALUES (1, 1, 1, 1);",
      "INSERT IGNORE INTO JourSemaine (ID, libelle) VALUES (1, 'Lundi');",
      "INSERT IGNORE INTO EmploiDuTemps (idTemps, jour, heure, idClasse, idCours, idAdmin) VALUES (1, 'Lundi', '08:00', 1, 1, 1);",
      "INSERT IGNORE INTO Specialite (idSpecialite, libelle, idAdmin) VALUES (1, 'Enseignement Primaire Général', 1);",
      "INSERT IGNORE INTO Livres (idLivre, titre, idSpecialite, idAdmin) VALUES (1, 'Mathématiques au Primaire', 1, 1);",
      "INSERT IGNORE INTO Scolarite (idScolarite, inscription, pension, nbreTranche, idCycle) VALUES (1, 10000, 50000, 2, 1);",
      "INSERT IGNORE INTO Tranches (idTranche, libelle, montant, idScolarite) VALUES (1, 'Tranche 1', 25000, 1);",
      "INSERT IGNORE INTO Messages (idMessages, idExp_Pers, idParent, objet, type_message) VALUES (1, 1, 1, 'Convocation', 1);"
    ];

    for (const q of queries) {
      await pool.query(q);
    }
    
    await pool.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('Seed executed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed:', error);
    process.exit(1);
  }
}

seed();
