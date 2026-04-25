import { FileText } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Epreuves = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/epreuves',
        title: 'Épreuves',
        subtitle: 'Banque d\'épreuves et sujets d\'examens',
        icon: <FileText />,
        primaryKey: 'idEpreuve',
        columns: [
          { key: 'libelle', label: 'Libellé de l\'épreuve' },
          { key: 'Auteur', label: 'Auteur' },
          { key: 'idNature', label: 'Nature (ID)' }
        ],
        fields: [
          { name: 'libelle', label: 'Libellé / Titre', type: 'text', required: true },
          { name: 'urlDoc', label: 'Lien du document (Drive/URL)', type: 'text' },
          { name: 'Auteur', label: 'Auteur / Examinateur', type: 'text' },
          { name: 'idNature', label: 'ID Nature d\'épreuve', type: 'number' },
          { name: 'idPers', label: 'ID Personne/Créateur', type: 'number' }
        ]
      }}
    />
  );
};
