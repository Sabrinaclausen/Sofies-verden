import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, C } from '../components/shared';
import badge from '../assets/grotte-badges.png';

export default function BadgesScreen() {
  const { state } = useApp();

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-1 pb-3">
          <h1 className="text-brand-accent text-4xl font-black mb-5">Badges</h1>

          {/* Stats */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-brand-navy rounded-2xl px-3 py-4 text-center"
                 style={{ border: `2px solid ${C.accent}` }}>
              <p className="text-brand-sub text-xs font-bold mb-1">Badges</p>
              <p className="text-brand-accent text-4xl font-black">{state.badges}</p>
            </div>
            <div className="flex-1 bg-brand-navy rounded-2xl px-3 py-4 text-center"
                 style={{ border: `2px solid ${C.accent}` }}>
              <p className="text-brand-sub text-xs font-bold mb-1">Point</p>
              <p className="text-brand-accent text-4xl font-black">{state.points}</p>
            </div>
          </div>

          {/* Badge card — only show after quiz completed */}
          {state.quizCompleted ? (
            <div className="w-full bg-brand-navy rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/[0.08]">
            <img src={badge} alt="Badge" className="w-10 h-10 object-contain" />
            <div className="flex-1">
              <p className="text-[#AA85FF] text-base font-opensans font-extrabold">Hulelignelsen</p>
              <p className="text-[#6C3FD4] text-sm font-opensans font-semibold">Nyt badge optjent!</p>
            </div>
            <div className="bg-[#6C3FD4] rounded-full px-3 py-1 text-xs font-fredoka text-[#AA85FF]">NY</div>
          </div>
          ) : (
            <div className="bg-brand-navy rounded-2xl px-4 py-4 flex items-center gap-3 border border-white/[0.08] opacity-50">
              <span className="text-4xl">🔒</span>
              <div className="flex-1">
                <p className="text-white text-base font-extrabold">Hulelignelsen</p>
                <p className="text-brand-sub text-xs font-semibold">Gennemfør quizzen for at låse op</p>
              </div>
            </div>
          )}
        </div>

        <BottomNav active="hjem" />
      </div>
    </StarsWrapper>
  );
}
