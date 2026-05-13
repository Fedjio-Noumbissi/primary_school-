import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { usePageMeta } from '../../hooks/usePageMeta';

export const PaiementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  usePageMeta(`Détail Paiement - ${id}`);

  return (
    <div className="p-6 lg:p-8 font-sora">
      <Breadcrumb items={[
        { label: 'Finance', path: '/finance' },
        { label: 'Paiements', path: '/finance/paiements' },
        { label: `Reçu ${id}` },
      ]} />

      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/finance/paiements')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Détails du Paiement</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CreditCard size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Chargement du paiement...</h2>
        <p className="text-gray-500 max-w-sm mx-auto">
          Cette page affichera le montant, la date, le mode de paiement et les informations sur l'élève concerné.
        </p>
      </div>
    </div>
  );
};
