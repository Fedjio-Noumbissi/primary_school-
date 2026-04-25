import { PieChart } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Trimestres = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/trimestres',
        title: 'Trimestres',
        subtitle: 'Découpage de l\'année en trimestres/semestres',
        icon: <PieChart />,
        primaryKey: 'idTrimes',
        columns: [
          { key: 'idAca', label: 'ID Année' },
          { key: 'libelle', label: 'Libellé' },
          { key: 'periode', label: 'Période' }
        ],
        fields: [
          { name: 'idAca', label: 'Identifiant Année Académique', type: 'number', required: true },
          { name: 'libelle', label: 'Nom du trimestre (ex: Premier Trimestre)', type: 'text', required: true },
          { name: 'periode', label: 'Période couverte', type: 'text' }
        ]
      }}
    />
  );
};
