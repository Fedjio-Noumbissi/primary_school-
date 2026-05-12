import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Personne: idPers (PK), nom, prenom, dateNaissance, lieuNaissance, mobile, phone, email, typePersonne, username, password, alanyaID, idAdmin, created_at, isDelete
router.use('/personnes', createCrudRouter({
  tableName: 'Personne',
  primaryKey: 'idPers',
  searchFields: ['nom', 'prenom', 'username', 'mobile', 'email']
}));

// Table Enseignant: idEnseignant (PK), idPers, idCours, Actif, idAdmin, created_at, isDelete
router.use('/enseignants', createCrudRouter({
  tableName: 'Enseignant',
  primaryKey: 'idEnseignant',
  searchFields: []
}));

// Table Parents: idParent (PK), idPers, matricule, idAdmin, created_at, isDelete
router.use('/parents', createCrudRouter({
  tableName: 'Parents',
  primaryKey: 'idParent',
  searchFields: []
}));

// Table Residents: idResi (PK), idPers, idQuartier, description, idAdmin, created_at, isDelete
router.use('/residents', createCrudRouter({
  tableName: 'Residents',
  primaryKey: 'idResi',
  searchFields: ['description']
}));

// Table Admin: ID (PK), nom, username, password, actif, typeAdmin, mobile, alanyaID, created_at, isDelete
router.use('/admins', createCrudRouter({
  tableName: 'Admin',
  primaryKey: 'ID',
  searchFields: ['nom', 'username']
}));

// Table Messages: idMessages (PK), idExp_Pers, idParent, objet, information, type_message, AnneeAcade, created_at, valider
router.use('/messages', createCrudRouter({
  tableName: 'Messages',
  primaryKey: 'idMessages',
  searchFields: ['objet', 'information']
}));

export default router;
