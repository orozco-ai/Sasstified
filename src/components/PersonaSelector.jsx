import React, { useState, useEffect } from 'react';

const PersonaSelector = ({ onSelect }) => {
  const [personas, setPersonas] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Fetch all persona filenames from Netlify Functions folder
    const fetchPersonas = async () => {
      try {
        const res = await fetch('/.netlify/functions/listPersonas');
        const data = await res.json();
        setPersonas(data);
      } catch (err) {
        console.error('Error fetching persona list:', err);
      }
    };

    fetchPersonas();
  }, []);

  const handleSelect = async (personaFile) => {
    try {
      const res = await fetch(`/.netlify/functions/getPersona/${personaFile}`);
      const persona = await res.json();
      setSelected(persona.name);
      onSelect(persona); // Pass full persona data to parent
    } catch (err) {
      console.error('Failed to load persona:', err);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-6">
      <h2 className="text-xl font-bold text-center text-pink-600 mb-4">Choose Your Seduction Guide</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {personas.map((filename, idx) => {
          const name = filename.replace('.json', '');
          return (
            <button
              key={idx}
              className={`border-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                selected === name
                  ? 'border-pink-500 bg-pink-100 text-pink-700'
                  : 'border-gray-300 hover:border-pink-400'
              }`}
              onClick={() => handleSelect(name)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PersonaSelector;
