import { z } from 'zod';

export const eleveSchema = z.object({
  nom: z.string().min(2, 'Nom is required').max(60),
  prenom: z.string().max(60).optional().nullable(),
  dateNaissance: z.string().optional().nullable(),
  lieuNaissance: z.string().max(30).optional().nullable(),
  sexe: z.coerce.number().int().optional().nullable(),
  langue: z.string().max(30).optional().nullable(),
  photoURL: z.string().max(255).optional().nullable(),
  actif: z.coerce.number().int().min(0).max(1).optional().default(1),
  idVilleNaissance: z.coerce.number().int().optional().nullable(),
});

export const eleveUpdateSchema = eleveSchema.partial();
