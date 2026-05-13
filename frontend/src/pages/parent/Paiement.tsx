import { usePageMeta } from '../../hooks/usePageMeta';
export const ParentPaiement = () => {
  usePageMeta('Paiement en ligne');
  return <div className="p-8"><h1 className="text-2xl font-bold">Effectuer un paiement</h1></div>;
};
