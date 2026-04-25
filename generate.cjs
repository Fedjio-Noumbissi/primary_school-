const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'scolarite/Classes.tsx', name: 'Classes', title: "Gestion des Classes" },
  { path: 'scolarite/Cours.tsx', name: 'Cours', title: "Gestion des Cours" },
  { path: 'scolarite/Emplois.tsx', name: 'Emplois', title: "Emplois du temps" },
  { path: 'scolarite/Titulaires.tsx', name: 'Titulaires', title: "Professeurs Titulaires" },
  { path: 'personnes/Enseignants.tsx', name: 'Enseignants', title: "Gestion des Enseignants" },
  { path: 'personnes/Parents.tsx', name: 'Parents', title: "Gestion des Parents" },
  { path: 'personnes/Admins.tsx', name: 'Admins', title: "Gestion des Administrateurs" },
  { path: 'personnes/Residents.tsx', name: 'Residents', title: "Gestion des Résidents" },
  { path: 'finance/Paiements.tsx', name: 'Paiements', title: "Gestion des Paiements" },
  { path: 'finance/Scolarites.tsx', name: 'Scolarites', title: "Gestion des Scolarités" },
  { path: 'finance/Tranches.tsx', name: 'Tranches', title: "Gestion des Tranches" },
  { path: 'finance/ModesPaiement.tsx', name: 'ModesPaiement', title: "Modes de Paiement" },
  { path: 'evaluations/EvaluationsList.tsx', name: 'Evaluations', title: "Gestion des Évaluations" },
  { path: 'evaluations/Epreuves.tsx', name: 'Epreuves', title: "Gestion des Épreuves" },
  { path: 'evaluations/Rapports.tsx', name: 'Rapports', title: "Rapports d'Évaluation" },
  { path: 'evaluations/Sessions.tsx', name: 'Sessions', title: "Sessions d'Examen" },
  { path: 'evaluations/Trimestres.tsx', name: 'Trimestres', title: "Gestion des Trimestres" },
  { path: 'parametres/Annees.tsx', name: 'Annees', title: "Années Académiques" },
  { path: 'parametres/Cycles.tsx', name: 'Cycles', title: "Gestion des Cycles" },
  { path: 'parametres/Disciplines.tsx', name: 'Disciplines', title: "Gestion des Disciplines" },
  { path: 'parametres/Salles.tsx', name: 'Salles', title: "Gestion des Salles" },
  { path: 'parametres/Livres.tsx', name: 'Livres', title: "Gestion des Livres" },
  { path: 'parametres/Specialites.tsx', name: 'Specialites', title: "Gestion des Spécialités" },
];

const template = (name, title) => `import { Plus, Search } from 'lucide-react';

export const ${name} = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">${title}</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Ajouter</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="p-8 text-center text-gray-500">
          Aucun enregistrement trouvé. Cliquez sur "Ajouter" pour commencer.
        </div>
      </div>
    </div>
  );
};
`;

const baseDir = '/home/fedjio/.gemini/antigravity/scratch/school-erp/frontend/src/pages';
pages.forEach(p => {
  const fullPath = path.join(baseDir, p.path);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, template(p.name, p.title));
  }
});
console.log('Pages generated!');
