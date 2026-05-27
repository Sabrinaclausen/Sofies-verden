import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, CharacterEmoji, C } from '../components/shared';
import profilBaggrund from '../assets/profil-baggrund.png';

export default function HjemScreen() {
  const { state, navigate, openCharacterSelect } = useApp();

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar rightIcon="gear" onRight={() => navigate('settings')} />

        <div className="flex-1 flex flex-col items-center justify-between px-6 pt-4 pb-3">
          {/* Points */}
          <div className="text-center">
            <p className="text-brand-accent font-fredoka font-black leading-none mt-8"
               style={{ fontSize: 120, textShadow: '0 4px 20px rgba(245,200,66,0.4)' }}>
              {state.points}
            </p>
            <p className="text-white text-xl font-fredoka mt-1">Point</p>
          </div>

          {/* Stat cards */}
          <div className="flex gap-10 justify-center w-full">
            <button
              onClick={() => navigate('badges')}
              className="w-[90px] bg-brand-navy rounded-xl text-center relative"
              style={{ border: `2px solid ${C.accent}`, padding: '8px 12px' }}
            >
              <p className="absolute -top-7 left-0 right-0 text-center text-base" 
                style={{ color: '#F0EAFF', fontFamily: 'Open Sans, sans-serif' }}>
                Badges
              </p>
              <p className="text-brand-accent text-2xl font-black" 
                style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {state.badges}
              </p>
            </button>
            <button
              onClick={() => navigate('requests')}
              className="w-[90px] bg-brand-navy rounded-xl text-center relative"
              style={{ border: `2px solid ${C.accent}`, padding: '8px 12px' }}
            >
              <p className="absolute -top-7 left-0 right-0 text-center text-base" 
                style={{ color: '#F0EAFF', fontFamily: 'Open Sans, sans-serif', left: '-30px', right: '-30px' }}>
                Anmodninger
              </p>
              <p className="text-brand-accent text-2xl font-black" 
                style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {state.friendRequests}
              </p>
            </button>
          </div>

          {/* Character circle — tap to open character select */}
          <button
            onClick={() => openCharacterSelect('hjem')}
            className="relative flex items-center justify-center mb-12"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <img src={profilBaggrund} alt="Baggrund" className="w-[160px] h-[160px] object-contain" />
            <div className="absolute" style={{ bottom: '-100px' }}>
              <CharacterEmoji id={state.selectedCharacter} size={260} />
            </div>
          </button>
        </div>

        <BottomNav active="hjem" />
      </div>
    </StarsWrapper>
  );
}
