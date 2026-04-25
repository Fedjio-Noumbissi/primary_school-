import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Classe: idClasse, libelle, idCycle, idAdmin...
router.use('/classes', createCrudRouter({
  tableName: 'Classe',
  primaryKey: 'idClasse',
  searchFields: ['libelle']
}));

// Table Cours: idCours, libelle, note, coefficient, description...
router.use('/cours', createCrudRouter({
  tableName: 'Cours',
  primaryKey: 'idCours',
  searchFields: ['libelle', 'description']
}));

// Table EmploiDuTemps: idTemps, jour, heure, idClasse, idCours...
router.use('/emplois', createCrudRouter({
  tableName: 'EmploiDuTemps',
  primaryKey: 'idTemps',
  searchFields: ['jour', 'heure']
}));

// Table Titulaire: idTitulaire, idPers, idSalle...
router.use('/titulaires', createCrudRouter({
  tableName: 'Titulaire',
  primaryKey: 'idTitulaire',
  searchFields: []
}));

export default router;
