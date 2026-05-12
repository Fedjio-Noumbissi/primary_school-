import { Router } from 'express';
import { createCrudRouter } from '../utils/crudFactory';

const router = Router();

// Table Paiement: idPaie (PK), matricule, idAca, montant, url, comentaire, idMode, operation_ID, idPers, datePaie, dateEnregistrer
router.use('/paiements', createCrudRouter({
  tableName: 'Paiement',
  primaryKey: 'idPaie',
  searchFields: ['comentaire', 'operation_ID']
}));

// Table Scolarite: idScolarite (PK), inscription, pension, nbreTranche, description, idCycle, idFondateur, created_at
router.use('/scolarites', createCrudRouter({
  tableName: 'Scolarite',
  primaryKey: 'idScolarite',
  searchFields: ['description']
}));

// Table Tranches: idTranche (PK), libelle, montant, delai_mois, delai_jour, idScolarite, actif, idFondateur
router.use('/tranches', createCrudRouter({
  tableName: 'Tranches',
  primaryKey: 'idTranche',
  searchFields: ['libelle']
}));

// Table Mode: idMode (PK), libelle, information, actif, idFondateur, created_at
router.use('/modes', createCrudRouter({
  tableName: 'Mode',
  primaryKey: 'idMode',
  searchFields: ['libelle', 'information']
}));

export default router;
