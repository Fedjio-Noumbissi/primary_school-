import { User } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Personnes = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/personnes/personnes',
        title: 'Personnes',
        subtitle: 'Répertoire général des personnes (enseignants, parents, staff)',
        icon: <User />,
        primaryKey: 'idPers',
        searchPlaceholder: "Rechercher par nom, email, mobile...",
        columns: [
          { key: 'nom', label: 'Nom Complet', render: (_, row) => {
            const fullName = `${row.nom || ''} ${row.prenom || ''}`.trim();
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={`https://ui-avatars.com/api/?name=${fullName.replace(/ /g, '+')}&background=random&color=fff`} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                <span style={{ fontWeight: 600, color: '#111827' }}>{fullName || 'N/A'}</span>
              </div>
            );
          }},
          { key: 'mobile', label: 'Mobile', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'email', label: 'Email', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'typePersonne', label: 'Type', render: (val) => {
            const types: Record<number, string> = { 1: 'Directeur', 2: 'Enseignant', 3: 'Parent', 4: 'Staff' };
            return <span style={{ color: '#374151', fontWeight: 500 }}>{types[val] || `Type ${val}`}</span>;
          }},
          { key: 'username', label: 'Username', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>{val || '-'}</span> }
        ],
        fields: [
          { name: 'nom', label: 'Nom', type: 'text', required: true },
          { name: 'prenom', label: 'Prénom', type: 'text' },
          { name: 'dateNaissance', label: 'Date de naissance', type: 'date' },
          { name: 'lieuNaissance', label: 'Lieu de naissance', type: 'text' },
          { name: 'mobile', label: 'Téléphone Mobile', type: 'text' },
          { name: 'phone', label: 'Téléphone fixe', type: 'text' },
          { name: 'email', label: 'Adresse email', type: 'text' },
          { 
            name: 'typePersonne', 
            label: 'Type de personne', 
            type: 'select',
            options: [
              { value: 1, label: 'Directeur / Staff direction' },
              { value: 2, label: 'Enseignant' },
              { value: 3, label: 'Parent / Tuteur' },
              { value: 4, label: 'Personnel administratif' }
            ]
          },
          { name: 'username', label: 'Nom d\'utilisateur', type: 'text' },
          { name: 'password', label: 'Mot de passe', type: 'text' },
          { name: 'alanyaID', label: 'Alanya ID', type: 'text' },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
