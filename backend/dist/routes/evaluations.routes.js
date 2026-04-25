"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crudFactory_1 = require("../utils/crudFactory");
const router = (0, express_1.Router)();
// Table Evaluation: idEval, note, appreciation...
router.use('/evaluations', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Evaluation',
    primaryKey: 'idEval',
    searchFields: ['appreciation']
}));
// Table Epreuve: idEpreuve, libelle, Auteur...
router.use('/epreuves', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Epreuve',
    primaryKey: 'idEpreuve',
    searchFields: ['libelle', 'Auteur']
}));
// Table Rapport: idRap, libelle, commentaire...
router.use('/rapports', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Rapport',
    primaryKey: 'idRap',
    searchFields: ['libelle', 'commentaire']
}));
// Table Session: idSession, libelle, description...
router.use('/sessions', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Session',
    primaryKey: 'idSession',
    searchFields: ['libelle', 'description']
}));
// Table Trimestre: idTrimes, libelle, periode...
router.use('/trimestres', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Trimestre',
    primaryKey: 'idTrimes',
    searchFields: ['libelle', 'periode']
}));
exports.default = router;
