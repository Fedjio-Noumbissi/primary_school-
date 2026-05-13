import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Personne: idPers (PK), nom, prenom, dateNaissance, lieuNaissance, mobile, phone, typePersonne, username, password, alanyaID, idAdmin, created_at
router.use('/personnes', createCrudRouter({
  tableName: 'Personne',
  primaryKey: 'idPers',
  searchFields: ['nom', 'prenom', 'username', 'mobile'],
  defaultSort: 'created_at DESC'
}));

// Table Enseignant: idEnseignant (PK), idPers, idCours, Actif, idAdmin, created_at
router.use('/enseignants', createCrudRouter({
  tableName: 'Enseignant',
  primaryKey: 'idEnseignant',
  searchFields: [],
  defaultSort: 'created_at DESC'
}));

// Table Parents: idParent (PK), idPers, matricule, idAdmin, created_at
router.use('/parents', createCrudRouter({
  tableName: 'Parents',
  primaryKey: 'idParent',
  searchFields: [],
  defaultSort: 'created_at DESC'
}));

// Table Residents: idResi (PK), idQuartier, description, idAdmin, created_at
router.use('/residents', createCrudRouter({
  tableName: 'Residents',
  primaryKey: 'idResi',
  searchFields: ['description'],
  defaultSort: 'created_at DESC'
}));

// Table Admin: ID (PK), nom, username, password, actif, typeAdmin, mobile, alanyaID, created_at
router.use('/admins', createCrudRouter({
  tableName: 'Admin',
  primaryKey: 'ID',
  searchFields: ['nom', 'username'],
  defaultSort: 'created_at DESC'
}));

// Table Messages: idMessages (PK), idExp_Pers, idParent, objet, information, type_message, AnneeAcade, created_at, valider
router.use('/messages', createCrudRouter({
  tableName: 'Messages',
  primaryKey: 'idMessages',
  searchFields: ['objet', 'information'],
  defaultSort: 'created_at DESC'
}));

export default router;
