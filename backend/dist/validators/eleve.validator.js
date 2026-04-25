"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eleveUpdateSchema = exports.eleveSchema = void 0;
const zod_1 = require("zod");
exports.eleveSchema = zod_1.z.object({
    nom: zod_1.z.string().min(2, 'Nom is required').max(60),
    prenom: zod_1.z.string().max(60).optional().nullable(),
    dateNaissance: zod_1.z.string().optional().nullable(),
    lieuNaissance: zod_1.z.string().max(30).optional().nullable(),
    sexe: zod_1.z.number().int().optional().nullable(),
    langue: zod_1.z.string().max(30).optional().nullable(),
    photoURL: zod_1.z.string().url().max(255).optional().nullable().or(zod_1.z.literal('')),
    actif: zod_1.z.number().int().min(0).max(1).optional().default(1),
    idVilleNaissance: zod_1.z.number().int().optional().nullable(),
});
exports.eleveUpdateSchema = exports.eleveSchema.partial();
