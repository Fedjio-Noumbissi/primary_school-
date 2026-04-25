import { z } from 'zod';

export const eleveSchema = z.object({
  nom: z.string().min(2, 'Nom is required').max(60),
  prenom: z.string().max(60).optional().nullable(),
  dateNaissance: z.string().optional().nullable(),
  lieuNaissance: z.string().max(30).optional().nullable(),
  sexe: z.number().int().optional().nullable(),
  langue: z.string().max(30).optional().nullable(),
  photoURL: z.string().url().max(255).optional().nullable().or(z.literal('')),
  actif: z.number().int().min(0).max(1).optional().default(1),
  idVilleNaissance: z.number().int().optional().nullable(),
});

export const eleveUpdateSchema = eleveSchema.partial();
