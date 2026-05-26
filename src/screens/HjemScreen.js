import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, CharacterEmoji, C } from '../components/shared';

export default function HjemScreen() {
  const { state, navigate, openCharacterSelect } = useApp();

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar rightIcon="gear" onRight={() => navigate('settings')} />

        <div className="flex-1 flex flex-col items-center justify-between px-6 pt-4 pb-3">
          {/* Points */}
          <div className="text-center">
            <p className="text-brand-accent font-black leading-none"
               style={{ fontSize: 80, textShadow: '0 4px 20px rgba(245,200,66,0.4)' }}>
              {state.points}
            </p>
            <p className="text-white text-lg font-bold mt-1">Point</p>
          </div>

          {/* Stat cards */}
          <div className="flex gap-4 w-full">
            <button
              onClick={() => navigate('badges')}
              className="flex-1 bg-brand-navy rounded-2xl px-3 py-3 text-center"
              style={{ border: `2px solid ${C.accent}` }}
            >
              <p className="text-brand-sub text-xs font-bold mb-1">Badges</p>
              <p className="text-brand-accent text-3xl font-black">{state.badges}</p>
            </button>
            <button
              onClick={() => navigate('requests')}
              className="flex-1 bg-brand-navy rounded-2xl px-3 py-3 text-center"
              style={{ border: `2px solid ${C.accent}` }}
            >
              <p className="text-brand-sub text-xs font-bold mb-1">Anmodninger</p>
              <p className="text-brand-accent text-3xl font-black">{state.friendRequests}</p>
            </button>
          </div>

          {/* Character circle — tap to open character select */}
          <button
            onClick={() => openCharacterSelect('hjem')}
            className="relative rounded-full flex items-center justify-center overflow-hidden"
            style={{
              width: 190, height: 190,
              background: 'radial-gradient(circle at 40% 30%, #1A1660, #080520)',
              border: '2px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            {[[20,15],[60,25],[140,18],[155,45],[25,55],[100,10]].map(([x,y],i) => (
              <div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-white opacity-50"
                   style={{ left: x, top: y }} />
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-[55px]"
                 style={{
                   background: 'linear-gradient(135deg, #1A0808 0%, #2A0C0C 40%, #150605 100%)',
                   clipPath: 'polygon(0% 100%, 0% 60%, 15% 30%, 30% 55%, 45% 25%, 60% 50%, 75% 20%, 90% 45%, 100% 30%, 100% 100%)',
                 }} />
            <div className="absolute top-[18px] right-[22px] w-7 h-7 rounded-full bg-[#E8DFC5]" />
            <div className="absolute top-[14px] right-[18px] w-6 h-6 rounded-full bg-[#080520]" />
            <CharacterEmoji id={state.selectedCharacter} size={105} />
          </button>
        </div>

        <BottomNav active="hjem" />
      </div>
    </StarsWrapper>
  );
}
