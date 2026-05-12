import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Evaluation: idEval (PK), note, appreciation, matricule, idEpreuve, idCours, idSession, idPers, created_at
router.use('/evaluations', createCrudRouter({
  tableName: 'Evaluation',
  primaryKey: 'idEval',
  searchFields: ['appreciation']
}));

// Table Epreuve: idEpreuve (PK), libelle, urlDoc, auteur, idNature, idPers, created_at
router.use('/epreuves', createCrudRouter({
  tableName: 'Epreuve',
  primaryKey: 'idEpreuve',
  searchFields: ['libelle', 'auteur']
}));

// Table Rapport: idRap (PK), libelle, points, matricule, idAca, commentaire, event_date, idPers, created_at
router.use('/rapports', createCrudRouter({
  tableName: 'Rapport',
  primaryKey: 'idRap',
  searchFields: ['libelle', 'commentaire']
}));

// Table Session: idSession (PK), libelle, description, idTrimestre, idPers, date_passage, created_at
router.use('/sessions', createCrudRouter({
  tableName: 'Session',
  primaryKey: 'idSession',
  searchFields: ['libelle', 'description']
}));

// Table Trimestre: idTrimes (PK), libelle, periode, idAca, idAdmin
router.use('/trimestres', createCrudRouter({
  tableName: 'Trimestre',
  primaryKey: 'idTrimes',
  searchFields: ['libelle', 'periode']
}));

// Table NatureEpreuve: idNature (PK), libelle, description
router.use('/natures', createCrudRouter({
  tableName: 'NatureEpreuve',
  primaryKey: 'idNature',
  searchFields: ['libelle', 'description']
}));

export default router;
