import { usePageMeta } from '../../hooks/usePageMeta';
export const BulletinsPage = () => {
  usePageMeta('Bulletins Scolaires');
  return <div className="p-8"><h1 className="text-2xl font-bold">Gestion des Bulletins</h1><p>Cette page permettra de générer et consulter les bulletins de notes.</p></div>;
};
