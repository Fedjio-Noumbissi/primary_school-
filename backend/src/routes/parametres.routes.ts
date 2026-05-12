import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table AnneeAcademique: idAnnee (PK), libelle, periode, created_at, idAdmin, isDelete
router.use('/annees', createCrudRouter({
  tableName: 'AnneeAcademique',
  primaryKey: 'idAnnee',
  searchFields: ['libelle', 'periode']
}));

// Table Cycle: idCycle (PK), libelle, description, idAdmin, created, isDelete
router.use('/cycles', createCrudRouter({
  tableName: 'Cycle',
  primaryKey: 'idCycle',
  searchFields: ['libelle', 'description']
}));

// Table Discipline: ID (PK), libelle, points
router.use('/disciplines', createCrudRouter({
  tableName: 'Discipline',
  primaryKey: 'ID',
  searchFields: ['libelle']
}));

// Table Salle: idSalle (PK), libelle, position, surface, idClasse, actif, idAdmin, created_at
router.use('/salles', createCrudRouter({
  tableName: 'Salle',
  primaryKey: 'idSalle',
  searchFields: ['libelle', 'position']
}));

// Table Livres: idLivre (PK), titre, auteurs, prix, idSpecialite, edition, annee_parution, totalCopie, idAdmin, created_at
router.use('/livres', createCrudRouter({
  tableName: 'Livres',
  primaryKey: 'idLivre',
  searchFields: ['titre', 'auteurs', 'edition']
}));

// Table Specialite: idSpecialite (PK), libelle, idAdmin
router.use('/specialites', createCrudRouter({
  tableName: 'Specialite',
  primaryKey: 'idSpecialite',
  searchFields: ['libelle']
}));

// Table VilleNaissance: idVille (PK), libelle, actif
router.use('/villes', createCrudRouter({
  tableName: 'VilleNaissance',
  primaryKey: 'idVille',
  searchFields: ['libelle']
}));

// Table Quartier: idQuartier (PK), libelle, description
router.use('/quartiers', createCrudRouter({
  tableName: 'Quartier',
  primaryKey: 'idQuartier',
  searchFields: ['libelle', 'description']
}));

// Table JourSemaine: ID (PK), libelle
router.use('/jours', createCrudRouter({
  tableName: 'JourSemaine',
  primaryKey: 'ID',
  searchFields: ['libelle']
}));

export default router;
