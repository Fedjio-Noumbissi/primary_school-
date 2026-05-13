import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table AnneeAcademique: idAnnee (PK), libelle, periode, created_at, idAdmin
router.use('/annees', createCrudRouter({
  tableName: 'AnneeAcademique',
  primaryKey: 'idAnnee',
  searchFields: ['libelle', 'periode'],
  defaultSort: 'idAnnee DESC'
}));

// Table Cycle: idCycle (PK), libelle, description, idAdmin
router.use('/cycles', createCrudRouter({
  tableName: 'Cycle',
  primaryKey: 'idCycle',
  searchFields: ['libelle', 'description'],
  defaultSort: 'idCycle ASC'
}));

// Table Discipline: ID (PK), libelle, points — PAS de created_at
router.use('/disciplines', createCrudRouter({
  tableName: 'Discipline',
  primaryKey: 'ID',
  searchFields: ['libelle'],
  defaultSort: 'ID ASC'
}));

// Table Salle: idSalle (PK), libelle, position, surface, idClasse, actif, idAdmin, created_at
router.use('/salles', createCrudRouter({
  tableName: 'Salle',
  primaryKey: 'idSalle',
  searchFields: ['libelle', 'position'],
  defaultSort: 'created_at DESC'
}));

// Table Livres: idLivre (PK), titre, auteurs, prix, idSpecialite, edition, annee_parution, totalCopie, idAdmin, created_at
router.use('/livres', createCrudRouter({
  tableName: 'Livres',
  primaryKey: 'idLivre',
  searchFields: ['titre', 'auteurs', 'edition'],
  defaultSort: 'created_at DESC'
}));

// Table Specialite: idSpecialite (PK), libelle, idAdmin — PAS de created_at
router.use('/specialites', createCrudRouter({
  tableName: 'Specialite',
  primaryKey: 'idSpecialite',
  searchFields: ['libelle'],
  defaultSort: 'idSpecialite ASC'
}));

// Table VilleNaissance: idVille (PK), libelle, actif — PAS de created_at
router.use('/villes', createCrudRouter({
  tableName: 'VilleNaissance',
  primaryKey: 'idVille',
  searchFields: ['libelle'],
  defaultSort: 'idVille ASC'
}));

// Table Quartier: idQuartier (PK), libelle, description — PAS de created_at
router.use('/quartiers', createCrudRouter({
  tableName: 'Quartier',
  primaryKey: 'idQuartier',
  searchFields: ['libelle', 'description'],
  defaultSort: 'idQuartier ASC'
}));

// Table JourSemaine: ID (PK), libelle — PAS de created_at
router.use('/jours', createCrudRouter({
  tableName: 'JourSemaine',
  primaryKey: 'ID',
  searchFields: ['libelle'],
  defaultSort: 'ID ASC'
}));

export default router;
