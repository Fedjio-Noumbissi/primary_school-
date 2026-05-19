import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, GraduationCap, CreditCard, Users, Calendar, MapPin, Activity, Type } from 'lucide-react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const EleveDetail = () => {
  const { matricule } = useParams();
  const navigate = useNavigate();
  usePageMeta(`Détail Élève - ${matricule}`);

  const { data: eleve, isLoading, isError } = useQuery({
    queryKey: ['eleve', matricule],
    queryFn: async () => {
      const res = await api.get(`/eleves/${matricule}`);
      return res.data.data;
    },
    enabled: !!matricule
  });

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 font-sora flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">Chargement des informations de l'élève...</p>
      </div>
    );
  }

  if (isError || !eleve) {
    return (
      <div className="p-6 lg:p-8 font-sora flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <User size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Élève introuvable</h2>
        <p className="text-gray-500 mb-6">Impossible de charger les informations pour le matricule {String(matricule).padStart(4, '0')}</p>
        <button 
          onClick={() => navigate('/scolarite/eleves')}
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  const fullName = `${eleve.nom || ''} ${eleve.prenom || ''}`.trim();

  return (
    <div className="p-6 lg:p-8 font-sora">
      <Breadcrumb items={[
        { label: 'Scolarité', path: '/scolarite' },
        { label: 'Élèves', path: '/scolarite/eleves' },
        { label: `Détail ${String(matricule).padStart(4, '0')}` },
      ]} />

      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/scolarite/eleves')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Fiche élève {String(matricule).padStart(4, '0')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne de gauche: Infos principales */}
        <div className="lg:col-span-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-emerald-50 mb-4 overflow-hidden bg-gray-50 flex items-center justify-center">
            {eleve.photoURL && eleve.photoURL !== 'INDEFINI' ? (
              <img src={eleve.photoURL} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <img src={`https://ui-avatars.com/api/?name=${fullName.replace(/ /g, '+')}&background=059669&color=fff&size=128`} alt={fullName} />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{fullName}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">#{String(matricule).padStart(4, '0')}</span>
            <span>•</span>
            <span className={`px-2 py-1 rounded text-xs font-bold ${eleve.actif ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {eleve.actif ? 'Actif' : 'Inactif'}
            </span>
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-gray-50 rounded-2xl flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 uppercase font-semibold">Sexe</span>
              <span className="font-medium text-gray-900 flex items-center gap-2">
                <User size={14} className="text-emerald-500"/>
                {eleve.sexe === 1 ? 'Masculin' : eleve.sexe === 2 ? 'Féminin' : 'N/A'}
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 uppercase font-semibold">Langue</span>
              <span className="font-medium text-gray-900 flex items-center gap-2">
                <Type size={14} className="text-blue-500"/>
                {eleve.langue || 'N/A'}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 text-left">
            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="mt-0.5 p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Calendar size={18} />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold mb-0.5">Date de Naissance</div>
                <div className="text-sm font-medium text-gray-900">
                  {eleve.dateNaissance ? new Date(eleve.dateNaissance).toLocaleDateString('fr-FR') : 'Non renseignée'}
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="mt-0.5 p-2 bg-orange-50 text-orange-600 rounded-lg">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold mb-0.5">Lieu de Naissance</div>
                <div className="text-sm font-medium text-gray-900">
                  {eleve.lieuNaissance?.trim() ? eleve.lieuNaissance : (eleve.nomVilleNaissance || `Ville ID: ${eleve.idVilleNaissance || 'N/A'}`)}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="mt-0.5 p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Activity size={18} />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold mb-0.5">Date d'inscription</div>
                <div className="text-sm font-medium text-gray-900">
                  {eleve.created_at ? new Date(eleve.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne de droite: Onglets/Contenu */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <GraduationCap className="text-emerald-500" />
              Scolarité & Notes
            </h3>
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-sm">
                L'historique des classes, les notes et les bulletins de cet élève apparaîtront ici.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CreditCard className="text-blue-500" />
              Finances & Paiements
            </h3>
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-sm">
                Le statut des paiements (scolarité, cantine, bus) et l'historique des transactions apparaîtront ici.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="text-orange-500" />
              Contacts Parents
            </h3>
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-sm">
                Les informations des parents/tuteurs associés à cet élève apparaîtront ici.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
