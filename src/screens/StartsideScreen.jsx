import React from 'react';
import { useApp } from '../AppContext';
import cirkelLilla from '../assets/cirkel-lilla.png';
import stjerneBaggrund from '../assets/stjerne-baggrund.png';
import { CharacterEmoji } from '../components/shared';

export default function StartsideScreen() {
  const { navigate, state, openCharacterSelect, updateState } = useApp();

  return (
    <div
      className="w-full h-full relative"
      style={{
        backgroundImage: `url(${stjerneBaggrund})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div className="flex-1 flex flex-col items-center justify-between px-8 py-12 relative">
        {/* Brand */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-white text-[13px] font-opensans font-semibold tracking-[2px] opacity-80 mt-16">GYLDENDAL</p>
          <div className="flex flex-col items-center leading-tight">
            <span className="text-5xl font-black text-brand-sub tracking-[2px] font-fredoka">SOFIES</span>
            <span className="text-5xl font-black text-brand-accent tracking-[2px] font-fredoka">VERDEN</span>
          </div>
        </div>

  
  {/* Character circle */}
  <div className="relative inline-flex items-center justify-center my-24">
  
    {/* Baggrundscirkel med blyant — klikker åbner character select */}
    <button
      onClick={() => openCharacterSelect('startside')}
      className="bg-transparent border-none p-0"
    >
    <img 
      src={cirkelLilla} 
      alt="Skift avatar"
    />
    </button>

    {/* Hund */}
    <div className="absolute">
      <CharacterEmoji id={state.selectedCharacter} size={130} />
    </div>
  </div>

        {/* Play knap */}
        <button
          onClick={() => { updateState({ girlLarge: true }); navigate('chapters'); }}
          className="w-full py-[18px] rounded-full text-lg font-black font-opensans text-brand-dark tracking-wide"
          style={{ background: '#F5C842', boxShadow: '0 6px 20px rgba(245,200,66,0.45)' }}
        >
          Play ▶
        </button>

      </div>
    </div>

  );
}
