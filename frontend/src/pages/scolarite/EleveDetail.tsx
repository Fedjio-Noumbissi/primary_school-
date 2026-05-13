import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, GraduationCap, CreditCard, Users } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { usePageMeta } from '../../hooks/usePageMeta';

export const EleveDetail = () => {
  const { matricule } = useParams();
  const navigate = useNavigate();
  usePageMeta(`Détail Élève - ${matricule}`);

  return (
    <div className="p-6 lg:p-8 font-sora">
      <Breadcrumb items={[
        { label: 'Scolarité', path: '/scolarite' },
        { label: 'Élèves', path: '/scolarite/eleves' },
        { label: `Détail ${matricule}` },
      ]} />

      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/scolarite/eleves')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Fiche de l'élève #{matricule}</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <User size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Chargement du profil...</h2>
        <p className="text-gray-500 max-w-sm mx-auto mb-8">
          Cette page affichera les informations personnelles, les notes, les paiements et les contacts parents de l'élève.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-2">
            <User size={20} className="text-blue-500" />
            <span className="text-xs font-bold">Infos</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-2">
            <GraduationCap size={20} className="text-purple-500" />
            <span className="text-xs font-bold">Notes</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-2">
            <CreditCard size={20} className="text-emerald-500" />
            <span className="text-xs font-bold">Paiements</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-2">
            <Users size={20} className="text-orange-500" />
            <span className="text-xs font-bold">Parents</span>
          </div>
        </div>
      </div>
    </div>
  );
};
