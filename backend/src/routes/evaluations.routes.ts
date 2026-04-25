import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Evaluation: idEval, note, appreciation...
router.use('/evaluations', createCrudRouter({
  tableName: 'Evaluation',
  primaryKey: 'idEval',
  searchFields: ['appreciation']
}));

// Table Epreuve: idEpreuve, libelle, Auteur...
router.use('/epreuves', createCrudRouter({
  tableName: 'Epreuve',
  primaryKey: 'idEpreuve',
  searchFields: ['libelle', 'Auteur']
}));

// Table Rapport: idRap, libelle, commentaire...
router.use('/rapports', createCrudRouter({
  tableName: 'Rapport',
  primaryKey: 'idRap',
  searchFields: ['libelle', 'commentaire']
}));

// Table Session: idSession, libelle, description...
router.use('/sessions', createCrudRouter({
  tableName: 'Session',
  primaryKey: 'idSession',
  searchFields: ['libelle', 'description']
}));

// Table Trimestre: idTrimes, libelle, periode...
router.use('/trimestres', createCrudRouter({
  tableName: 'Trimestre',
  primaryKey: 'idTrimes',
  searchFields: ['libelle', 'periode']
}));

export default router;
