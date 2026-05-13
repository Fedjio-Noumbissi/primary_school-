import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { usePageMeta } from '../../hooks/usePageMeta';

export const ClasseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  usePageMeta(`Détail Classe - ${id}`);

  return (
    <div className="p-6 lg:p-8 font-sora">
      <Breadcrumb items={[
        { label: 'Scolarité', path: '/scolarite' },
        { label: 'Classes', path: '/scolarite/classes' },
        { label: `Classe ${id}` },
      ]} />

      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/scolarite/classes')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Détail de la classe</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BookOpen size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Chargement de la classe...</h2>
        <p className="text-gray-500 max-w-sm mx-auto">
          Cette page affichera la liste des élèves, l'enseignant titulaire et l'emploi du temps de la classe.
        </p>
      </div>
    </div>
  );
};
