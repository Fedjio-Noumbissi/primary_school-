import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Classe: idClasse (PK), libelle, idCycle, idAdmin, created_at, isDelete
router.use('/classes', createCrudRouter({
  tableName: 'Classe',
  primaryKey: 'idClasse',
  searchFields: ['libelle']
}));

// Table Cours: idCours (PK), libelle, note, coefficient, description, idClasse, actif, idAdmin, created_at, isDelete
router.use('/cours', createCrudRouter({
  tableName: 'Cours',
  primaryKey: 'idCours',
  searchFields: ['libelle', 'description']
}));

// Table EmploiDuTemps: idTemps (PK), jour, heure, idClasse, idCours, idAdmin, created_at
router.use('/emplois', createCrudRouter({
  tableName: 'EmploiDuTemps',
  primaryKey: 'idTemps',
  searchFields: ['jour', 'heure']
}));

// Table Titulaire: idTitulaire (PK), idPers, idSalle, actif, idAdmin, created_at
router.use('/titulaires', createCrudRouter({
  tableName: 'Titulaire',
  primaryKey: 'idTitulaire',
  searchFields: []
}));

// Table Frequente: idFrequente (PK), idSalle, idAcademi, matricule, commentaire, idAdmin, created_at
router.use('/frequentes', createCrudRouter({
  tableName: 'Frequente',
  primaryKey: 'idFrequente',
  searchFields: ['commentaire']
}));

export default router;
