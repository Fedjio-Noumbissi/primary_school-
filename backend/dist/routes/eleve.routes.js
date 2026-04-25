"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eleve_controller_1 = require("../controllers/eleve.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Apply auth middleware to all routes
router.use(authMiddleware_1.protect);
router.get('/', eleve_controller_1.getEleves);
router.get('/:id', eleve_controller_1.getEleveById);
router.post('/', eleve_controller_1.createEleve);
router.put('/:id', eleve_controller_1.updateEleve);
router.delete('/:id', eleve_controller_1.deleteEleve);
exports.default = router;
