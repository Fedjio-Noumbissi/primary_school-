"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crudFactory_1 = require("../utils/crudFactory");
const router = (0, express_1.Router)();
// Table Paiement: idPai, matricule, montant...
router.use('/paiements', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Paiement',
    primaryKey: 'idPai',
    searchFields: ['comentaire', 'operation_ID']
}));
// Table Scolarite: idScolarite, inscription, pension...
router.use('/scolarites', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Scolarite',
    primaryKey: 'idScolarite',
    searchFields: ['description']
}));
// Table Tranches: idTranche, libelle, montant...
router.use('/tranches', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Tranches',
    primaryKey: 'idTranche',
    searchFields: ['libelle']
}));
// Table Mode: idMode, libelle, information...
router.use('/modes', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Mode',
    primaryKey: 'idMode',
    searchFields: ['libelle', 'information']
}));
exports.default = router;
