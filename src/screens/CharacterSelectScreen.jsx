import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, C } from '../components/shared';
import { CHARACTERS } from '../data';

export default function CharacterSelectScreen() {
  const { state, navigate, updateState } = useApp();
  const [selected, setSelected] = useState(state.selectedCharacter);

  const handleVaelg = () => {
    updateState({ selectedCharacter: selected, characterSelected: true });
    navigate(state.characterSelectOrigin || 'startside');
  };

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col items-center px-5 py-6 gap-5">
        <h1 className="text-brand-accent flex justify-center text-4xl font-semibold font-fredoka mb-5">Vælg din karakter</h1>

        <div className="grid grid-cols-2 gap-3 w-full flex-1">
          {CHARACTERS.map((ch) => {
            const isSelected = selected === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelected(ch.id)}
                className="flex flex-col items-center justify-center gap-2 rounded-[18px] px-3 py-5 transition-all"
                style={{
                  background: '#1E1B4A',
                  border: `2.5px solid ${isSelected ? C.accent : 'rgba(255,255,255,0.12)'}`,
                  boxShadow: isSelected ? `0 0 0 1px ${C.accent}` : 'none',
                }}
              >
                <img src={ch.image} alt={ch.id} style={{ objectFit: 'contain' }} />
              </button>
            );
          })}
        </div>

        <button
          onClick={handleVaelg}
          className="w-full py-[18px] rounded-full text-lg font-black font-opensans text-brand-dark"
          style={{ background: C.accent, boxShadow: '0 4px 16px rgba(245,200,66,0.4)' }}
        >
          Vælg
        </button>
      </div>
    </StarsWrapper>
  );
}
