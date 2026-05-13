import React from 'react';
import { FileSearch } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({ 
  icon = <FileSearch size={40} />, 
  title, 
  description, 
  action 
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
      <div className="w-20 h-20 bg-white text-gray-400 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 font-sora">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-8 font-medium leading-relaxed">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
