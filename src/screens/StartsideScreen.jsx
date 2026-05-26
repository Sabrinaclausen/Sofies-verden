import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, CharacterEmoji, PencilIcon } from '../components/shared';

export default function StartsideScreen() {
  const { navigate, state, openCharacterSelect } = useApp();

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col items-center justify-between px-8 py-12 relative">
        {/* Brand */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-white text-[13px] font-semibold tracking-[2px] opacity-80">GYLDENDAL</p>
          <div className="flex flex-col items-center leading-tight">
            <span className="text-5xl font-black text-white tracking-[2px]">SOFIES</span>
            <span className="text-5xl font-black text-brand-accent tracking-[2px]">VERDEN</span>
          </div>
        </div>

        {/* Character circle — only pencil opens character select */}
        <div className="relative inline-flex">
          <div className="w-[170px] h-[170px] rounded-full flex items-center justify-center"
               style={{
                 background: 'radial-gradient(circle at 38% 32%, #2D2A7E, #0D0B2B)',
                 border: '3px solid rgba(255,255,255,0.12)',
                 boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
               }}>
            <CharacterEmoji id={state.selectedCharacter} size={95} />
          </div>
          <button
            onClick={() => openCharacterSelect('startside')}
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          >
            <PencilIcon size={14} color="#333" />
          </button>
        </div>

        {/* Play always goes to chapters */}
        <button
          onClick={() => navigate('chapters')}
          className="w-full py-[18px] rounded-full text-xl font-black text-brand-dark tracking-wide"
          style={{ background: '#F5C842', boxShadow: '0 6px 20px rgba(245,200,66,0.45)' }}
        >
          Play ▶
        </button>

      </div>
    </StarsWrapper>
  );
}
