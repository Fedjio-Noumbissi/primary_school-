"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crudFactory_1 = require("../utils/crudFactory");
const router = (0, express_1.Router)();
// Table Classe: idClasse, libelle, idCycle, idAdmin...
router.use('/classes', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Classe',
    primaryKey: 'idClasse',
    searchFields: ['libelle']
}));
// Table Cours: idCours, libelle, note, coefficient, description...
router.use('/cours', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Cours',
    primaryKey: 'idCours',
    searchFields: ['libelle', 'description']
}));
// Table EmploiDuTemps: idTemps, jour, heure, idClasse, idCours...
router.use('/emplois', (0, crudFactory_1.createCrudRouter)({
    tableName: 'EmploiDuTemps',
    primaryKey: 'idTemps',
    searchFields: ['jour', 'heure']
}));
// Table Titulaire: idTitulaire, idPers, idSalle...
router.use('/titulaires', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Titulaire',
    primaryKey: 'idTitulaire',
    searchFields: []
}));
exports.default = router;
