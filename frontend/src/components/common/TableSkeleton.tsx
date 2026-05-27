

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export const TableSkeleton = ({ rows = 8, cols = 5 }: TableSkeletonProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-6 border-bottom border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="h-6 w-48 bg-gray-200 rounded-lg"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-100 border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="p-4 border-bottom border-gray-100">
                  <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-bottom border-gray-50">
                {Array.from({ length: cols }).map((_, colIndex) => (
                  <td key={colIndex} className="p-5">
                    <div className={`h-3 bg-gray-100 rounded-lg mx-auto ${colIndex === 0 ? 'w-40' : 'w-24'}`}></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
