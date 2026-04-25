import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Paiement: idPai, matricule, montant...
router.use('/paiements', createCrudRouter({
  tableName: 'Paiement',
  primaryKey: 'idPai',
  searchFields: ['comentaire', 'operation_ID']
}));

// Table Scolarite: idScolarite, inscription, pension...
router.use('/scolarites', createCrudRouter({
  tableName: 'Scolarite',
  primaryKey: 'idScolarite',
  searchFields: ['description']
}));

// Table Tranches: idTranche, libelle, montant...
router.use('/tranches', createCrudRouter({
  tableName: 'Tranches',
  primaryKey: 'idTranche',
  searchFields: ['libelle']
}));

// Table Mode: idMode, libelle, information...
router.use('/modes', createCrudRouter({
  tableName: 'Mode',
  primaryKey: 'idMode',
  searchFields: ['libelle', 'information']
}));

export default router;
