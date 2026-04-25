import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table AnneeAcademique: idAnnee, libelle, periode...
router.use('/annees', createCrudRouter({
  tableName: 'AnneeAcademique',
  primaryKey: 'idAnnee',
  searchFields: ['libelle', 'periode']
}));

// Table Cycle: idCycle, libelle, description...
router.use('/cycles', createCrudRouter({
  tableName: 'Cycle',
  primaryKey: 'idCycle',
  searchFields: ['libelle', 'description']
}));

// Table Discipline: ID, libelle, points...
router.use('/disciplines', createCrudRouter({
  tableName: 'Discipline',
  primaryKey: 'ID',
  searchFields: ['libelle']
}));

// Table Salle: idSalle, libelle, position...
router.use('/salles', createCrudRouter({
  tableName: 'Salle',
  primaryKey: 'idSalle',
  searchFields: ['libelle', 'position']
}));

// Table Livres: idLivre, titre, auteurs...
router.use('/livres', createCrudRouter({
  tableName: 'Livres',
  primaryKey: 'idLivre',
  searchFields: ['titre', 'auteurs', 'edition']
}));

// Table Specialite: idSpecialite, libelle...
router.use('/specialites', createCrudRouter({
  tableName: 'Specialite',
  primaryKey: 'idSpecialite',
  searchFields: ['libelle']
}));

export default router;
