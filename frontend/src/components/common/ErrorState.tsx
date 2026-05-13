import { AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  backPath?: string;
}

export const ErrorState = ({ 
  message = "Une erreur est survenue lors du chargement des données.", 
  onRetry, 
  backPath 
}: ErrorStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
        <AlertCircle size={32} />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 font-sora">Oups ! Quelque chose a mal tourné</h3>
      <p className="text-gray-500 max-w-md mb-8 font-medium">
        {message}
      </p>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200"
          >
            <RotateCcw size={18} />
            Réessayer
          </button>
        )}
        
        {backPath && (
          <button
            onClick={() => navigate(backPath)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
            Retourner au Dashboard
          </button>
        )}
      </div>
    </div>
  );
};
