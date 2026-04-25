import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Personne: idPers, nom, prenom...
router.use('/personnes', createCrudRouter({
  tableName: 'Personne',
  primaryKey: 'idPers',
  searchFields: ['nom', 'prenom', 'username', 'mobile']
}));

// Table Enseignant: idEnseignant, idPers, idCours...
router.use('/enseignants', createCrudRouter({
  tableName: 'Enseignant',
  primaryKey: 'idEnseignant',
  searchFields: []
}));

// Table Parents: idParent, idPers, matricule...
router.use('/parents', createCrudRouter({
  tableName: 'Parents',
  primaryKey: 'idParent',
  searchFields: []
}));

// Table Residents: idResi, idQuartier, description...
router.use('/residents', createCrudRouter({
  tableName: 'Residents',
  primaryKey: 'idResi',
  searchFields: ['description']
}));

// Table Admin: ID, nom, username...
router.use('/admins', createCrudRouter({
  tableName: 'Admin',
  primaryKey: 'ID',
  searchFields: ['nom', 'username']
}));

export default router;
