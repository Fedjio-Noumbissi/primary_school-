"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crudFactory_1 = require("../utils/crudFactory");
const router = (0, express_1.Router)();
// Table AnneeAcademique: idAnnee, libelle, periode...
router.use('/annees', (0, crudFactory_1.createCrudRouter)({
    tableName: 'AnneeAcademique',
    primaryKey: 'idAnnee',
    searchFields: ['libelle', 'periode']
}));
// Table Cycle: idCycle, libelle, description...
router.use('/cycles', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Cycle',
    primaryKey: 'idCycle',
    searchFields: ['libelle', 'description']
}));
// Table Discipline: ID, libelle, points...
router.use('/disciplines', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Discipline',
    primaryKey: 'ID',
    searchFields: ['libelle']
}));
// Table Salle: idSalle, libelle, position...
router.use('/salles', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Salle',
    primaryKey: 'idSalle',
    searchFields: ['libelle', 'position']
}));
// Table Livres: idLivre, titre, auteurs...
router.use('/livres', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Livres',
    primaryKey: 'idLivre',
    searchFields: ['titre', 'auteurs', 'edition']
}));
// Table Specialite: idSpecialite, libelle...
router.use('/specialites', (0, crudFactory_1.createCrudRouter)({
    tableName: 'Specialite',
    primaryKey: 'idSpecialite',
    searchFields: ['libelle']
}));
exports.default = router;
