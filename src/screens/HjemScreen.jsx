import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, CharacterEmoji, C } from '../components/shared';
import profilBaggrund from '../assets/profil-baggrund.webp';

export default function HjemScreen() {
  const { state, navigate, openCharacterSelect } = useApp();

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar rightIcon="gear" onRight={() => navigate('settings')} />

        <div className="flex-1 flex flex-col items-center justify-around px-6 pt-4 pb-3">
          {/* Point */}
          <div className="text-center">
            <p className="text-brand-accent font-fredoka font-black leading-none mt-4"
               style={{ fontSize: 120, textShadow: '0 4px 20px rgba(245,200,66,0.4)' }}>
              {state.points}
            </p>
            <p className="text-brand-sub text-3xl font-fredoka font-semibold mt-1">Point</p>
          </div>

          {/* Små stats kort */}
          <div className="flex gap-10 justify-center w-full z-10 relative">
            <button
              onClick={() => navigate('badges')}
              className="w-[90px] bg-brand-navy rounded-xl text-center relative"
              style={{ border: `2px solid ${C.accent}`, padding: '8px 12px' }}
            >
              <p className="absolute -top-7 left-0 right-0 text-center text-base font-opensans text-[#F0EAFF]">
                Badges
              </p>
              <p className="text-brand-accent text-2xl font-black font-fredoka">
                {state.badges}
              </p>
            </button>
            <button
              onClick={() => navigate('requests')}
              className="w-[90px] bg-brand-navy rounded-xl text-center relative"
              style={{ border: `2px solid ${C.accent}`, padding: '8px 12px' }}
            >
              <p className="absolute -top-7 text-center text-base font-opensans text-[#F0EAFF]"
                style={{ left: '-30px', right: '-30px' }}>
                Anmodninger
              </p>
              <p className="text-brand-accent text-2xl font-black font-fredoka">
                {state.friendRequests}
              </p>
            </button>
          </div>

          {/* Character cirkel */}
          <button
            onClick={() => openCharacterSelect('hjem')}
            className="relative flex items-center justify-center mb-12 -mt-10 bg-transparent border-none p-0"
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
