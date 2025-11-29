import { useState, useEffect } from 'react';

/**
 * ProblemTypeSelector Component
 * Checkbox list for selecting problem types
 */
export function ProblemTypeSelector({ problemTypes, selectedTypes, onChange }) {
  const [selectAllText, setSelectAllText] = useState('Deselect All');

  useEffect(() => {
    const allSelected = problemTypes.every(pt => selectedTypes.includes(pt.id));
    setSelectAllText(allSelected ? 'Deselect All' : 'Select All');
  }, [selectedTypes, problemTypes]);

  const handleToggleAll = () => {
    if (selectAllText === 'Select All') {
      onChange(problemTypes.map(pt => pt.id));
    } else {
      onChange([]);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedTypes.includes(id)) {
      onChange(selectedTypes.filter(typeId => typeId !== id));
    } else {
      onChange([...selectedTypes, id]);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-700">Problem Types</h3>
        <button
          onClick={handleToggleAll}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          {selectAllText}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 p-4 border-2 border-gray-200 rounded-lg">
        {problemTypes.map(pt => (
          <div key={pt.id} className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id={pt.id}
                type="checkbox"
                checked={selectedTypes.includes(pt.id)}
                onChange={() => handleCheckboxChange(pt.id)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={pt.id} className="font-medium text-gray-700">
                {pt.label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

