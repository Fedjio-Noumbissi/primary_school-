import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Evaluation: idEval (PK), note, appreciation, matricule, idEpreuve, idCours, idSession, idPers, created_at
router.use('/evaluations', createCrudRouter({
  tableName: 'Evaluation',
  primaryKey: 'idEval',
  searchFields: ['appreciation'],
  defaultSort: 'created_at DESC'
}));

// Table Epreuve: idEpreuve (PK), libelle, urlDoc, Auteur, idNature, idPers, created_at
router.use('/epreuves', createCrudRouter({
  tableName: 'Epreuve',
  primaryKey: 'idEpreuve',
  searchFields: ['libelle', 'Auteur'],
  defaultSort: 'created_at DESC'
}));

// Table Rapport: idRap (PK), libelle, points, matricule, idAca, commentaire, event_date, idPers, created_at
router.use('/rapports', createCrudRouter({
  tableName: 'Rapport',
  primaryKey: 'idRap',
  searchFields: ['libelle', 'commentaire'],
  defaultSort: 'created_at DESC'
}));

// Table Session: idSession (PK), libelle, description, idTrimestre, idPers, created_at
router.use('/sessions', createCrudRouter({
  tableName: 'Session',
  primaryKey: 'idSession',
  searchFields: ['libelle', 'description'],
  defaultSort: 'created_at DESC'
}));

// Table Trimestre: idTrimes (PK), libelle, periode, idAca, idAdmin — PAS de created_at
router.use('/trimestres', createCrudRouter({
  tableName: 'Trimestre',
  primaryKey: 'idTrimes',
  searchFields: ['libelle', 'periode'],
  defaultSort: 'idTrimes ASC'
}));

// Table NatureEpreuve: idNature (PK), libelle, description — PAS de created_at
router.use('/natures', createCrudRouter({
  tableName: 'NatureEpreuve',
  primaryKey: 'idNature',
  searchFields: ['libelle', 'description'],
  defaultSort: 'idNature ASC'
}));

export default router;
