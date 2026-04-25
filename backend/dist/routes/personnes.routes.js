"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crudFactory_1 = require("../utils/crudFactory");
const router = (0, express_1.Router)();
// Table Personne: idPers, nom, prenom...
router.use('/personnes', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Personne',
    primaryKey: 'idPers',
    searchFields: ['nom', 'prenom', 'username', 'mobile']
}));
// Table Enseignant: idEnseignant, idPers, idCours...
router.use('/enseignants', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Enseignant',
    primaryKey: 'idEnseignant',
    searchFields: []
}));
// Table Parents: idParent, idPers, matricule...
router.use('/parents', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Parents',
    primaryKey: 'idParent',
    searchFields: []
}));
// Table Residents: idResi, idQuartier, description...
router.use('/residents', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Residents',
    primaryKey: 'idResi',
    searchFields: ['description']
}));
// Table Admin: ID, nom, username...
router.use('/admins', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Admin',
    primaryKey: 'ID',
    searchFields: ['nom', 'username']
}));
exports.default = router;
