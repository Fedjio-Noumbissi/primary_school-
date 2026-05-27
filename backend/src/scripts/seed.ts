import { pool } from '../config/db';

async function seed() {
  try {
    console.log('Disabling foreign key checks...');
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');

    // Clear existing data
    const tablesToClear = ['Frequente', 'Paiement', 'Enseignant', 'Cours', 'Discipline', 'Mode', 'Eleve', 'Personne', 'Salle', 'Classe', 'Cycle', 'AnneeAcademique', 'VilleNaissance'];
    for (const table of tablesToClear) {
        console.log(`Clearing ${table}...`);
        await pool.query(`TRUNCATE TABLE ${table}`);
    }

    console.log('Seeding VilleNaissance...');
    const villes = ['Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua'];
    for (let i = 0; i < villes.length; i++) {
      await pool.query('INSERT INTO VilleNaissance (libelle) VALUES (?)', [villes[i]]);
    }
    const [villesDb]: any = await pool.query('SELECT idVille FROM VilleNaissance');

    console.log('Seeding AnneeAcademique...');
    for (let i = 1; i <= 10; i++) {
      await pool.query(
        'INSERT INTO AnneeAcademique (libelle, periode, created_at, idAdmin) VALUES (?, ?, ?, ?)',
        [`202${i-1}-202${i}`, 'Trimestre 1', new Date(), 1]
      );
    }
    const [annees]: any = await pool.query('SELECT idAnnee FROM AnneeAcademique');

    console.log('Seeding Cycle...');
    for (let i = 1; i <= 10; i++) {
      await pool.query(
        'INSERT INTO Cycle (libelle, description, idAdmin, created) VALUES (?, ?, ?, ?)',
        [`Cycle ${i}`, `Description du cycle ${i}`, 1, new Date()]
      );
    }
    const [cycles]: any = await pool.query('SELECT idCycle FROM Cycle');

    console.log('Seeding Classe...');
    for (let i = 1; i <= 10; i++) {
      await pool.query(
        'INSERT INTO Classe (libelle, idCycle, idAdmin) VALUES (?, ?, ?)',
        [`Classe ${i}`, cycles[i % cycles.length].idCycle, 1]
      );
    }
    const [classes]: any = await pool.query('SELECT idClasse FROM Classe');

    console.log('Seeding Salle...');
    for (let i = 1; i <= 10; i++) {
      await pool.query(
        'INSERT INTO Salle (libelle, position, surface, idClasse, idAdmin) VALUES (?, ?, ?, ?, ?)',
        [`Salle ${i}`, 'Batiment A', '50m2', classes[i % classes.length].idClasse, 1]
      );
    }
    const [salles]: any = await pool.query('SELECT idSalle FROM Salle');

    console.log('Seeding Personne...');
    for (let i = 1; i <= 20; i++) { // 10 eleves + 10 enseignants
      await pool.query(
        'INSERT INTO Personne (nom, prenom, dateNaissance, lieuNaissance, mobile, phone, email, typePersonne, username, password, idAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [`Nom${i}`, `Prenom${i}`, '2000-01-01', 'Douala', `6900000${i.toString().padStart(2, '0')}`, `6900000${i.toString().padStart(2, '0')}`, `personne${i}@example.com`, i <= 10 ? 4 : 1, `user${i}`, 'password123', 1]
      );
    }
    const [personnes]: any = await pool.query('SELECT idPers FROM Personne');

    console.log('Seeding Eleve...');
    for (let i = 0; i < 10; i++) {
      await pool.query(
        'INSERT INTO Eleve (nom, prenom, dateNaissance, lieuNaissance, sexe, idVilleNaissance, idAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [`NomEleve${i+1}`, `PrenomEleve${i+1}`, '2015-01-01', 'Douala', i % 2, villesDb[0].idVille, 1]
      );
    }
    const [eleves]: any = await pool.query('SELECT matricule FROM Eleve');

    console.log('Seeding Frequente...');
    for (let i = 0; i < 10; i++) {
      await pool.query(
        'INSERT INTO Frequente (idSalle, idAcademi, matricule, idAdmin) VALUES (?, ?, ?, ?)',
        [salles[i].idSalle, annees[annees.length - 1].idAnnee, eleves[i].matricule, 1]
      );
    }

    console.log('Seeding Mode...');
    const modes = ['Espèces', 'Mobile Money', 'Orange Money', 'Virement Bancaire', 'Chèque', 'Carte Bancaire', 'MTN MoMo', 'PayPal', 'Western Union', 'Express Union'];
    for (let i = 0; i < 10; i++) {
      await pool.query(
        'INSERT INTO Mode (libelle, information, idFondateur) VALUES (?, ?, ?)',
        [modes[i], `Information pour ${modes[i]}`, 1]
      );
    }
    const [modesDb]: any = await pool.query('SELECT idMode FROM Mode');

    console.log('Seeding Paiement...');
    for (let i = 0; i < 10; i++) {
      await pool.query(
        'INSERT INTO Paiement (matricule, idAca, montant, idMode, idPers, datePaie, dateEnregistrer) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [eleves[i].matricule, annees[annees.length - 1].idAnnee, 50000, modesDb[i].idMode, 1, new Date(), new Date()]
      );
    }

    console.log('Seeding Discipline...');
    for (let i = 1; i <= 10; i++) {
      await pool.query(
        'INSERT INTO Discipline (libelle, points) VALUES (?, ?)',
        [`Discipline ${i}`, i * 10]
      );
    }

    console.log('Seeding Cours...');
    for (let i = 1; i <= 10; i++) {
      await pool.query(
        'INSERT INTO Cours (libelle, note, coefficient, description, idClasse, idAdmin) VALUES (?, ?, ?, ?, ?, ?)',
        [`Cours ${i}`, 20, 2, `Description du cours ${i}`, classes[i % classes.length].idClasse, 1]
      );
    }
    const [cours]: any = await pool.query('SELECT idCours FROM Cours');

    console.log('Seeding Enseignant...');
    for (let i = 0; i < 10; i++) {
      await pool.query(
        'INSERT INTO Enseignant (idPers, idCours, Actif, idAdmin) VALUES (?, ?, ?, ?)',
        [personnes[i + 10].idPers, cours[i].idCours, 1, 1]
      );
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');
    process.exit(0);
  }
}

seed();
