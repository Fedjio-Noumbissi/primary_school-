import { usePageMeta } from '../../hooks/usePageMeta';
export const ParametresPage = () => {
  usePageMeta('Paramètres Système');
  return <div className="p-8"><h1 className="text-2xl font-bold">Paramètres du Système</h1></div>;
};
