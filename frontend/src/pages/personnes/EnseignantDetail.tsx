import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { usePageMeta } from '../../hooks/usePageMeta';

export const EnseignantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  usePageMeta(`Détail Enseignant - ${id}`);

  return (
    <div className="p-6 lg:p-8 font-sora">
      <Breadcrumb items={[
        { label: 'Personnes', path: '/personnes' },
        { label: 'Enseignants', path: '/personnes/enseignants' },
        { label: `Enseignant ${id}` },
      ]} />

      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/personnes/enseignants')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Fiche Enseignant</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <UserCheck size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Chargement de l'enseignant...</h2>
        <p className="text-gray-500 max-w-sm mx-auto">
          Cette page affichera les cours assignés, les classes enseignées et l'emploi du temps de l'enseignant.
        </p>
      </div>
    </div>
  );
};
